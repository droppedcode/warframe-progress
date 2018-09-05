import * as express from "express";
import { Application, Request, Response, NextFunction, Router } from "express";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as path from "path";
import * as cors from "cors";

import fs = require("fs");
import http = require("http");
import https = require("https");

import { IncomingMessage } from "http";

import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

import { ServerContext } from "./server/server.context";
import { User, Role } from "./server/user";
import { IConfig } from "./server/config";
import { Collector } from "./server/collector";

import * as rewrite from "express-urlrewrite";

const cookieSecret = "ecf3537f4b144e0f8b477c3c6a49dc3c";

const config = <IConfig>(
  JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "data", "config.json")).toString()
  )
);

/**
 * The server.
 *
 * @class Server
 */
export class Server {
  private server = this;

  public context: ServerContext;

  public app: Application;

  /*
  private callsPerSeconds = {};
  private warnings = {};
  */

  private logFile = fs.createWriteStream(path.join(__dirname, "log.txt"), {
    flags: "a"
  });

  private marketArchive: { time: number; value: number }[] = [];

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    this.context = new ServerContext();

    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add api
    this.api();

    if (config.port) {
      let httpPort = config.useEnvPort
        ? process.env.PORT || config.port
        : config.port;

      let httpServer = http.createServer();

      httpServer.on("request", this.app);

      httpServer.listen(httpPort);

      console.log("Server started on port http://+:" + httpPort + ".");
    }

    if (config.securePort) {
      let httpsPort = config.useEnvPort
        ? process.env.PORT || config.securePort
        : config.securePort;

      let privateKey = fs.readFileSync("sslcert/host.key", "utf8");
      let certificate = fs.readFileSync("sslcert/host.crt", "utf8");

      let credentials = { key: privateKey, cert: certificate };

      let httpsServer = https.createServer(credentials);

      httpsServer.on("request", this.app);

      httpsServer.listen(httpsPort);

      console.log("Server started on port https://+:" + httpsPort + ".");
    }

    let collector = new Collector(this.context);
    collector.collect();
    setInterval(() => {
      collector.collect();
    }, 1000 * 60 * 60 * 24);
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    this.app.use(errorHandler({ log: false }));

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next();
    });

    //use logger middlware
    this.app.use(logger("dev"));

    this.app.use(cors());

    if (config.urlRewrite) {
      this.app.use(rewrite(config.urlRewrite.from, config.urlRewrite.to));
    }

    //use json form parser middlware
    this.app.use(bodyParser.json());

    //use query string parser middlware
    this.app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    //use cookie parker middleware middlware
    this.app.use(cookieParser(cookieSecret));

    //use override middlware
    this.app.use(methodOverride());

    //catch 404 and forward to error handler
    this.app.use(function(
      err: any,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      err.status = 404;
      next(err);
    });

    //error handling
    this.app.use(errorHandler());

    //add static paths
    this.app.use(express.static(path.join(__dirname, config.wwwroot)));

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next();
    });

    /*
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      this.callsPerSeconds[req.ip] = (this.callsPerSeconds[req.ip] || 0) + 1;

      if (this.warnings[req.ip] > 3) {
        delete this.warnings[req.ip];
        this.callsPerSeconds[req.ip] = 5 * 5 * 60;
        console.log('Ban "' + req.ip + '" for 5 mins');
      }

      if (this.callsPerSeconds[req.ip] > 5) {
        res.status(429).end();
        return;
      }

      next();
    })
    */
  }

  private getSessionUser(req: Request): User {
    if (req["user"]) {
      return req["user"];
    }

    let session = req.cookies["session"];
    return session ? (req["user"] = this.context.getLogin(session)) : null;
  }

  private isAdministrator(req: Request) {
    let appUser = this.getSessionUser(req);
    return appUser && appUser.role === Role.Administrator;
  }

  private isElevated(req: Request) {
    let appUser = this.getSessionUser(req);
    return (
      appUser &&
      (appUser.role === Role.Administrator || appUser.role === Role.Elevated)
    );
  }

  private isLoggedIn(req: Request) {
    return !!this.getSessionUser(req);
  }

  private log(req: Request, message: string, logBody: boolean) {
    let msg = "";

    msg += Date();
    msg += "\t";
    msg += req.path;
    msg += "\t";
    msg += this.isLoggedIn(req) ? this.getSessionUser(req).id : "[NOTLOGGEDIN]";
    msg += "\t";
    msg += message || "[NOMESSAGE]";
    if (logBody) {
      msg += "\t";
      msg += JSON.stringify(req.body);
    }

    this.logFile.write(msg + "\n");
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    let router = Router();

    router.route("/users").post((req, res) => {
      if (!this.isAdministrator) {
        this.log(req, "Not an administrator.", true);
        res.status(401).end();
        return;
      }

      let user = new User(req.body.user);
      let pass = <string>req.body.pass;

      try {
        this.context.addUser(user.id, user.name, pass, Role.User);

        this.log(req, "Added user: " + user.id, true);

        res.json(user.id);
      } catch (err) {
        this.log(req, "Error: " + JSON.stringify(err.message || err), true);
        res.status(400);
        res.json(err);
      }
    });

    router.route("/users").put((req, res) => {
      if (!this.isLoggedIn(req)) {
        this.log(req, "Not logged in.", true);
        res.status(401).end();
        return;
      }

      let userId = req.body.userId;
      let action = req.body.action;
      let value = req.body.value;

      let user = this.context.getUser(userId);

      switch (action) {
        case "pass":
          if (!this.isAdministrator(req)) {
            this.log(req, "Not an administrator.", false);
            res.status(401).end();
            return;
          }

          this.context.setPassword(user.id, value);

          this.log(req, "Changed password.", false);

          res.json(true);
          return;
        case "role":
          if (!this.isAdministrator(req)) {
            this.log(req, "Not an administrator.", true);
            res.status(401).end();
            return;
          }

          this.context.updateUserRole(user.id, value);

          this.log(req, "Changed role.", true);

          res.json(this.context.getUser(user.id));
          return;
      }
    });

    router.route("/users").get((req, res) => {
      if (!this.isElevated(req)) {
        this.log(req, "Not an elevated user.", true);
        res.status(401).end();
        return;
      }

      if (!req.query.search) {
        res.status(400).end();
        return;
      }

      res.json(this.context.search(req.query.search));
    });

    router.route("/users/:id").get((req, res) => {
      if (!this.isLoggedIn(req)) {
        res.status(401).end();
        return;
      }

      let user = this.context.getUser(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).end();
      }
    });

    router.route("/login").put((req, res) => {
      let session = this.context.login(req.body.id, req.body.pass);
      if (session) {
        this.log(
          req,
          "Successful login: " + req.body.id + " " + session,
          false
        );

        res.cookie("session", session);
        res.json(this.context.getUserByUserName(req.body.id));
      } else {
        this.log(req, "Failed login: " + req.body.id, false);

        //this.warnings[req.ip] = (this.warnings[req.ip] || 0) + 1;
        res.clearCookie("session");
        res.status(404).end();
      }
    });

    router.route("/relogin").put((req, res) => {
      let user = this.context.getLogin(req.body.id);
      if (user) {
        res.json(user);

        this.log(
          req,
          "Successful relogin: " + user.id + " " + req.body.id,
          false
        );
      } else {
        this.log(req, "Failed relogin: " + req.body.id, false);

        res.clearCookie("session");
        res.status(404).end();
      }
    });

    router.route("/key/:key").get((req, res) => {
      let session = this.context.loginWithKey(req.params.key);
      if (session) {
        this.log(
          req,
          "Successful key login: " + req.params.key + " " + session,
          false
        );

        res.cookie("session", session);
        res.redirect("/");
      } else {
        this.log(req, "Failed login: " + req.body.id, false);

        //this.warnings[req.ip] = (this.warnings[req.ip] || 0) + 1;
        res.clearCookie("session");
        res.status(404).end();
      }
    });

    router.route("/item").get((req, res) => {
      if (!this.isLoggedIn(req)) {
        res.status(401).end();
        return;
      }

      res.json(this.context.getUserItems(this.getSessionUser(req).id));
    });

    router.route("/item/progress").put((req, res) => {
      if (!this.isLoggedIn(req)) {
        res.status(401).end();
        return;
      }

      try {
        this.context.setProgress(
          this.getSessionUser(req).id,
          req.body.id,
          req.body.value
        );
        res.status(200).end();
      } catch (ex) {
        res.statusMessage = ex.message || ex;
        res.status(400).end();
      }
    });

    router.route("/item/note").put((req, res) => {
      if (!this.isLoggedIn(req)) {
        res.status(401).end();
        return;
      }

      try {
        this.context.setNote(
          this.getSessionUser(req).id,
          req.body.id,
          req.body.value
        );
        res.status(200).end();
      } catch (ex) {
        res.status(400).end();
      }
    });

    router.route("/item/description").put((req, res) => {
      if (!this.isElevated(req)) {
        res.status(401).end();
        return;
      }

      this.context.setDescription(req.body.id, req.body.value);

      res.status(200).end();
    });

    this.app.use("/api", router);
  }
}
