
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/lib/rng.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.

var rb = __webpack_require__(/*! crypto */ "crypto").randomBytes;

function rng() {
  return rb(16);
}

module.exports = rng;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
process.on('uncaughtException', function (exception) {
    console.log(exception); // to see your exception details in the console
    // if you are on production, maybe you can send the exception details to your
    // email as well ?
});
//console.log('Installing packages...');
//execSync('npm install --only=production', { stdio: 'inherit' });
const server_1 = __webpack_require__(/*! ./server */ "./src/server.ts");
console.log('Starting server...');
server_1.Server.bootstrap();


/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(/*! express */ "express");
const express_1 = __webpack_require__(/*! express */ "express");
const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
const logger = __webpack_require__(/*! morgan */ "morgan");
const path = __webpack_require__(/*! path */ "path");
const cors = __webpack_require__(/*! cors */ "cors");
const fs = __webpack_require__(/*! fs */ "fs");
const http = __webpack_require__(/*! http */ "http");
const https = __webpack_require__(/*! https */ "https");
const errorHandler = __webpack_require__(/*! errorhandler */ "errorhandler");
const methodOverride = __webpack_require__(/*! method-override */ "method-override");
const server_context_1 = __webpack_require__(/*! ./server/server.context */ "./src/server/server.context.ts");
const user_1 = __webpack_require__(/*! ./server/user */ "./src/server/user.ts");
const collector_1 = __webpack_require__(/*! ./server/collector */ "./src/server/collector.ts");
const rewrite = __webpack_require__(/*! express-urlrewrite */ "express-urlrewrite");
const cookieSecret = "ecf3537f4b144e0f8b477c3c6a49dc3c";
const config = (JSON.parse(fs.readFileSync(path.resolve(__dirname, "data", "config.json")).toString()));
/**
 * The server.
 *
 * @class Server
 */
class Server {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        this.server = this;
        /*
        private callsPerSeconds = {};
        private warnings = {};
        */
        this.logFile = fs.createWriteStream(path.join(__dirname, "log.txt"), {
            flags: "a"
        });
        this.marketArchive = [];
        this.context = new server_context_1.ServerContext();
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
        this.collector = new collector_1.Collector(this.context);
        this.collector.collect();
        setInterval(() => {
            this.collector.collect();
        }, 1000 * 60 * 60 * 24);
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    static bootstrap() {
        return new Server();
    }
    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    config() {
        this.app.use(errorHandler({ log: false }));
        this.app.use((req, res, next) => {
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
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        //use cookie parker middleware middlware
        this.app.use(cookieParser(cookieSecret));
        //use override middlware
        this.app.use(methodOverride());
        //catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.app.use(errorHandler());
        //add static paths
        this.app.use(express.static(path.join(__dirname, config.wwwroot)));
        this.app.use((req, res, next) => {
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
    getSessionUser(req) {
        if (req["user"]) {
            return req["user"];
        }
        let session = req.cookies["session"];
        return session ? (req["user"] = this.context.getLogin(session)) : null;
    }
    isAdministrator(req) {
        let appUser = this.getSessionUser(req);
        return appUser && appUser.role === user_1.Role.Administrator;
    }
    isElevated(req) {
        let appUser = this.getSessionUser(req);
        return (appUser &&
            (appUser.role === user_1.Role.Administrator || appUser.role === user_1.Role.Elevated));
    }
    isLoggedIn(req) {
        return !!this.getSessionUser(req);
    }
    log(req, message, logBody) {
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
    api() {
        let router = express_1.Router();
        router.route("/users").post((req, res) => {
            if (!this.isAdministrator) {
                this.log(req, "Not an administrator.", true);
                res.status(401).end();
                return;
            }
            let user = new user_1.User(req.body.user);
            let pass = req.body.pass;
            try {
                this.context.addUser(user.id, user.name, pass, user_1.Role.User);
                this.log(req, "Added user: " + user.id, true);
                res.json(user.id);
            }
            catch (err) {
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
            }
            else {
                res.status(404).end();
            }
        });
        router.route("/login").put((req, res) => {
            let session = this.context.login(req.body.id, req.body.pass);
            if (session) {
                this.log(req, "Successful login: " + req.body.id + " " + session, false);
                res.cookie("session", session);
                res.json(this.context.getUserByUserName(req.body.id));
            }
            else {
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
                this.log(req, "Successful relogin: " + user.id + " " + req.body.id, false);
            }
            else {
                this.log(req, "Failed relogin: " + req.body.id, false);
                res.clearCookie("session");
                res.status(404).end();
            }
        });
        router.route("/key/:key").get((req, res) => {
            let session = this.context.loginWithKey(req.params.key);
            if (session) {
                this.log(req, "Successful key login: " + req.params.key + " " + session, false);
                res.cookie("session", session);
                res.redirect("/");
            }
            else {
                this.log(req, "Failed login: " + req.body.id, false);
                //this.warnings[req.ip] = (this.warnings[req.ip] || 0) + 1;
                res.clearCookie("session");
                res.status(404).end();
            }
        });
        router.route("/item/progress").get((req, res) => {
            if (!this.isLoggedIn(req)) {
                res.status(401).end();
                return;
            }
            res.json(this.context.getUserItems(this.getSessionUser(req).id));
        });
        router.route("/item").get((req, res) => {
            // if (!this.isLoggedIn(req)) {
            //   res.status(401).end();
            //   return;
            // }
            res.json({
                data: this.collector.clientItems,
                hash: this.collector.clientItemsHash
            });
        });
        router.route("/item/:hash").get((req, res) => {
            if (!this.isLoggedIn(req)) {
                res.status(401).end();
                return;
            }
            if (req.params.hash === this.collector.clientItemsHash) {
                res.json(true);
            }
            else {
                res.json({
                    data: this.collector.clientItems,
                    hash: this.collector.clientItemsHash
                });
            }
        });
        router.route("/item/image/:image").get((req, res) => {
            if (!this.isLoggedIn(req)) {
                res.status(401).end();
                return;
            }
            let img = path.join(__dirname, 'warframe-items', 'data', 'img', req.params.image);
            if (fs.existsSync(img)) {
                res.sendFile(path.join(__dirname, 'warframe-items', 'data', 'img', req.params.image));
            }
            else {
                res.status(404).end();
            }
        });
        router.route("/item/progress").put((req, res) => {
            if (!this.isLoggedIn(req)) {
                res.status(401).end();
                return;
            }
            try {
                this.context.setProgress(this.getSessionUser(req).id, req.body.id, req.body.value);
                res.status(200).end();
            }
            catch (ex) {
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
                this.context.setNote(this.getSessionUser(req).id, req.body.id, req.body.value);
                res.status(200).end();
            }
            catch (ex) {
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
exports.Server = Server;


/***/ }),

/***/ "./src/server/collector.ts":
/*!*********************************!*\
  !*** ./src/server/collector.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(/*! path */ "path");
const fs = __webpack_require__(/*! fs */ "fs");
const Hash = __webpack_require__(/*! node-object-hash */ "node-object-hash");
const lodash_1 = __webpack_require__(/*! lodash */ "lodash");
const util = __webpack_require__(/*! util */ "util");
const exec = util.promisify(__webpack_require__(/*! child_process */ "child_process").exec);
class Collector {
    constructor(context) {
        this.context = context;
        this.clientItemKeys = [
            "uniqueName",
            "name",
            "type",
            "components",
            "imageName",
            "category",
            "wikiaUrl"
        ];
        this.componentItemKeys = [
            "uniqueName",
            "name",
            "itemCount",
            "imageName",
            "drops"
        ];
    }
    async updateWarframeItems() {
        const { stdout, stderr } = await exec("npm update warframe-items");
    }
    async collect() {
        await this.updateWarframeItems();
        this.items = JSON.parse(fs
            .readFileSync(path.resolve(__dirname, "warframe-items", "data", "json", "All.json"))
            .toString());
        this.itemsHash = Hash().hash(this.items);
        this.clientItems = lodash_1.cloneDeep(this.items /*.filter(f => {
          switch (f.category) {
            case "Mods":
            case "Primary":
            case "Secondary":
            case "Melee":
            case "Warframes":
            case "Archwing":
            case "Pets":
            case "Sentinels":
            case "Skins":
            case "Resources":
            case "Relics":
              return true;
            case "Fish":
            case "Gear":
            case "Glyphs":
            case "Sigils":
            case "Misc":
            case "Quests":
            default:
              return false;
          }
        })*/);
        this.clientItems.forEach(item => this.filterClientItem(item));
        this.clientItemsHash = Hash().hash(this.clientItems);
        console.log("Collector finished.");
    }
    filterClientItem(item) {
        for (let key in item) {
            if (this.clientItemKeys.indexOf(key) !== -1) {
                if (key === "components") {
                    for (let i = 0; i < item[key].length; i++) {
                        this.filterComponent(item[key][i]);
                    }
                }
            }
            else {
                delete item[key];
            }
        }
    }
    filterComponent(item) {
        for (let key in item) {
            if (this.componentItemKeys.indexOf(key) === -1) {
                delete item[key];
            }
        }
    }
}
exports.Collector = Collector;


/***/ }),

/***/ "./src/server/server.context.ts":
/*!**************************************!*\
  !*** ./src/server/server.context.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(/*! fs */ "fs");
const Database = __webpack_require__(/*! better-sqlite3 */ "better-sqlite3");
const user_1 = __webpack_require__(/*! ./user */ "./src/server/user.ts");
const uuid = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
const sha256 = __webpack_require__(/*! sha256 */ "sha256");
const path = __webpack_require__(/*! path */ "path");
class ServerContext {
    constructor() {
        let create = !fs.existsSync(path.resolve(__dirname, 'data', 'data.db'));
        let db = new Database(path.resolve(__dirname, 'data', 'data.db'));
        if (create) {
            console.log('Create database.');
            db.prepare('CREATE TABLE IF NOT EXISTS Version (id INTEGER PRIMARY KEY);').run();
            this.statementAddVersion = db.prepare('INSERT INTO Version VALUES(?)');
            this.statementAddVersion.run(0);
            db.prepare('CREATE TABLE IF NOT EXISTS User (id TEXT PRIMARY KEY, userName TEXT UNIQUE NOT NULL collate nocase, name TEXT, role INTEGER, password TEXT, key TEXT UNIQUE);').run();
            this.statementAddUser = db.prepare('INSERT INTO User VALUES(?, ?, ?, ?, ?, ?)');
            db.prepare('CREATE TABLE IF NOT EXISTS Session (id TEXT PRIMARY KEY, userId TEXT, validity INTEGER, FOREIGN KEY(userId) REFERENCES User(id));').run();
            db.prepare('CREATE TABLE IF NOT EXISTS Progress (userId TEXT, itemId TEXT, progress INTEGER, note TEXT, PRIMARY KEY (userId, itemId), FOREIGN KEY(userId) REFERENCES User(id));').run();
            this.statementAddUser.run(uuid(), 'B', 'Balázs', user_1.Role.Administrator, sha256(''), null);
            this.statementAddUser.run(uuid(), 'J', 'Judit', user_1.Role.User, sha256(''), null);
            this.statementAddUser.run(uuid(), 'T', 'Tim', user_1.Role.User, sha256(''), null);
            this.statementAddUser.run(uuid(), 'G', 'Gergő', user_1.Role.User, sha256(''), null);
        }
        else {
            this.statementAddVersion = db.prepare('INSERT INTO Version VALUES(?)');
            this.statementAddUser = db.prepare('INSERT INTO User VALUES(?, ?, ?, ?, ?, ?)');
        }
        this.statementGetVersion = db.prepare('SELECT max(id) as id FROM Version;');
        //Version update
        this.statementGetUser = db.prepare('SELECT * FROM User where id = ?;');
        this.statementGetUserByUserName = db.prepare('SELECT * FROM User where userName = ?;');
        this.statementGetUserByKey = db.prepare('SELECT * FROM User where key = ?;');
        this.statementUpdUserRole = db.prepare('UPDATE User SET role = ? WHERE id = ?');
        this.statementAddSession = db.prepare('INSERT INTO Session VALUES(?, ?, ?)');
        this.statementGetSession = db.prepare('SELECT * FROM Session WHERE id = ?');
        this.statementSetPassword = db.prepare('UPDATE User SET password = ? WHERE id = ?');
        this.statementSearch = db.prepare('SELECT * FROM User WHERE name LIKE ?');
        this.statementAddProgress = db.prepare('INSERT INTO Progress VALUES(?, ?, ?, ?)');
        this.statementSetProgress = db.prepare('UPDATE Progress SET progress = ? WHERE userId = ? AND itemId = ?');
        this.statementSetNote = db.prepare('UPDATE Progress SET note = ? WHERE userId = ? AND itemId = ?');
        this.statementGetUserItem = db.prepare('SELECT * FROM Progress WHERE userId = ? AND itemId = ?');
        this.statementGetUserItems = db.prepare('SELECT * FROM Progress WHERE userId = ?');
    }
    get version() {
        return this.statementGetVersion.get().id;
    }
    getUser(id) {
        let row = this.statementGetUser.get(id);
        return row ? new user_1.User(row) : null;
    }
    getUserByUserName(id) {
        let row = this.statementGetUserByUserName.get(id);
        return row ? new user_1.User(row) : null;
    }
    getLogin(session) {
        let sessionRow = this.statementGetSession.get(session);
        if (sessionRow && sessionRow.validity >= Date.now()) {
            return this.getUser(sessionRow.userId);
        }
        return null;
    }
    login(userName, pass) {
        let row = this.statementGetUserByUserName.get(userName);
        if (row && row.password === sha256(pass)) {
            let session = uuid();
            this.statementAddSession.run(session, row.id, Date.now() + 5 * 3600 * 1000);
            return session;
        }
        return null;
    }
    loginWithKey(key) {
        let row = this.statementGetUserByKey.get(key);
        if (row) {
            let session = uuid();
            this.statementAddSession.run(session, row.id, Date.now() + 5 * 3600 * 1000);
            return session;
        }
        return null;
    }
    addUser(userName, name, pass, role) {
        this.statementAddUser.run(uuid(), userName, name, role, sha256(pass));
    }
    updateUserRole(id, role) {
        this.statementUpdUserRole.run(role, id);
    }
    setPassword(id, pass) {
        this.statementSetPassword.run(sha256(pass), id);
    }
    search(name) {
        return this.statementSearch.all('%' + name + '%').map(m => {
            return {
                id: m.id,
                name: m.name
            };
        });
    }
    addProgress(userId, itemId, progress, note) {
        this.statementAddProgress.run(userId, itemId, progress, note);
    }
    setProgress(userId, itemId, progress) {
        if (this.getUser(userId) == null)
            throw 'User does not exist';
        if (this.getUserItem(userId, itemId)) {
            this.statementSetProgress.run(progress, userId, itemId);
        }
        else {
            this.addProgress(userId, itemId, progress, null);
        }
    }
    setNote(userId, itemId, value) {
        if (this.getUser(userId) == null)
            throw 'User does not exist';
        if (this.getUserItem(userId, itemId)) {
            this.statementSetNote.run(value, userId, itemId);
        }
        else {
            this.addProgress(userId, itemId, null, value);
        }
    }
    getUserItem(userId, itemId) {
        return this.statementGetUserItem.get(userId, itemId);
    }
    getUserItems(userId) {
        return this.statementGetUserItems.all(userId);
    }
    setDescription(itemId, value) {
        this.statementSetDescription.run(value, itemId);
    }
}
exports.ServerContext = ServerContext;


/***/ }),

/***/ "./src/server/user.ts":
/*!****************************!*\
  !*** ./src/server/user.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Role;
(function (Role) {
    Role[Role["User"] = 0] = "User";
    Role[Role["Elevated"] = 512] = "Elevated";
    Role[Role["Administrator"] = 1024] = "Administrator";
})(Role = exports.Role || (exports.Role = {}));
class User {
    constructor(base) {
        if (base) {
            this.id = base.id;
            this.userName = base.userName;
            this.name = base.name;
            this.role = base.role;
        }
    }
}
exports.User = User;


/***/ }),

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("better-sqlite3");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "errorhandler":
/*!*******************************!*\
  !*** external "errorhandler" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("errorhandler");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-urlrewrite":
/*!*************************************!*\
  !*** external "express-urlrewrite" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-urlrewrite");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "method-override":
/*!**********************************!*\
  !*** external "method-override" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "node-object-hash":
/*!***********************************!*\
  !*** external "node-object-hash" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-object-hash");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "sha256":
/*!*************************!*\
  !*** external "sha256" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sha256");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9zZXJ2ZXIuY29udGV4dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3VzZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmV0dGVyLXNxbGl0ZTNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29yc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNyeXB0b1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImVycm9yaGFuZGxlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLXVybHJld3JpdGVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1ldGhvZC1vdmVycmlkZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vcmdhblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGUtb2JqZWN0LWhhc2hcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2hhMjU2XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXRpbFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQzVCQSxPQUFPLENBQUMsRUFBRSxDQUFDLG1C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dC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgd2FzbSBtb2R1bGVzXG4gXHR2YXIgaW5zdGFsbGVkV2FzbU1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9iamVjdCB3aXRoIGFsbCBjb21waWxlZCBXZWJBc3NlbWJseS5Nb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLncgPSB7fTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cbnZhciBieXRlVG9IZXggPSBbXTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbn1cblxuZnVuY3Rpb24gYnl0ZXNUb1V1aWQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMDtcbiAgdmFyIGJ0aCA9IGJ5dGVUb0hleDtcbiAgcmV0dXJuIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcbiIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiBub2RlLmpzXG4vLyB0aGlzIGlzIHByZXR0eSBzdHJhaWdodC1mb3J3YXJkIC0gd2UgdXNlIHRoZSBjcnlwdG8gQVBJLlxuXG52YXIgcmIgPSByZXF1aXJlKCdjcnlwdG8nKS5yYW5kb21CeXRlcztcblxuZnVuY3Rpb24gcm5nKCkge1xuICByZXR1cm4gcmIoMTYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJuZztcbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDtcbiIsInByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgZnVuY3Rpb24gKGV4Y2VwdGlvbikge1xyXG4gIGNvbnNvbGUubG9nKGV4Y2VwdGlvbik7IC8vIHRvIHNlZSB5b3VyIGV4Y2VwdGlvbiBkZXRhaWxzIGluIHRoZSBjb25zb2xlXHJcbiAgLy8gaWYgeW91IGFyZSBvbiBwcm9kdWN0aW9uLCBtYXliZSB5b3UgY2FuIHNlbmQgdGhlIGV4Y2VwdGlvbiBkZXRhaWxzIHRvIHlvdXJcclxuICAvLyBlbWFpbCBhcyB3ZWxsID9cclxufSk7XHJcblxyXG5pbXBvcnQgeyBleGVjU3luYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xyXG5cclxuLy9jb25zb2xlLmxvZygnSW5zdGFsbGluZyBwYWNrYWdlcy4uLicpO1xyXG5cclxuLy9leGVjU3luYygnbnBtIGluc3RhbGwgLS1vbmx5PXByb2R1Y3Rpb24nLCB7IHN0ZGlvOiAnaW5oZXJpdCcgfSk7XHJcblxyXG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tICcuL3NlcnZlcic7XHJcblxyXG5jb25zb2xlLmxvZygnU3RhcnRpbmcgc2VydmVyLi4uJyk7XHJcblxyXG5TZXJ2ZXIuYm9vdHN0cmFwKCk7IiwiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiwgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuXHJcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XHJcbmltcG9ydCAqIGFzIGNvb2tpZVBhcnNlciBmcm9tIFwiY29va2llLXBhcnNlclwiO1xyXG5pbXBvcnQgKiBhcyBsb2dnZXIgZnJvbSBcIm1vcmdhblwiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCAqIGFzIGNvcnMgZnJvbSBcImNvcnNcIjtcclxuXHJcbmltcG9ydCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcclxuaW1wb3J0IGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuaW1wb3J0IGh0dHBzID0gcmVxdWlyZShcImh0dHBzXCIpO1xyXG5cclxuaW1wb3J0IHsgSW5jb21pbmdNZXNzYWdlIH0gZnJvbSBcImh0dHBcIjtcclxuXHJcbmltcG9ydCBlcnJvckhhbmRsZXIgPSByZXF1aXJlKFwiZXJyb3JoYW5kbGVyXCIpO1xyXG5pbXBvcnQgbWV0aG9kT3ZlcnJpZGUgPSByZXF1aXJlKFwibWV0aG9kLW92ZXJyaWRlXCIpO1xyXG5cclxuaW1wb3J0IHsgU2VydmVyQ29udGV4dCB9IGZyb20gXCIuL3NlcnZlci9zZXJ2ZXIuY29udGV4dFwiO1xyXG5pbXBvcnQgeyBVc2VyLCBSb2xlIH0gZnJvbSBcIi4vc2VydmVyL3VzZXJcIjtcclxuaW1wb3J0IHsgSUNvbmZpZyB9IGZyb20gXCIuL3NlcnZlci9jb25maWdcIjtcclxuaW1wb3J0IHsgQ29sbGVjdG9yIH0gZnJvbSBcIi4vc2VydmVyL2NvbGxlY3RvclwiO1xyXG5cclxuaW1wb3J0ICogYXMgcmV3cml0ZSBmcm9tIFwiZXhwcmVzcy11cmxyZXdyaXRlXCI7XHJcblxyXG5jb25zdCBjb29raWVTZWNyZXQgPSBcImVjZjM1MzdmNGIxNDRlMGY4YjQ3N2MzYzZhNDlkYzNjXCI7XHJcblxyXG5jb25zdCBjb25maWcgPSA8SUNvbmZpZz4oXHJcbiAgSlNPTi5wYXJzZShcclxuICAgIGZzLnJlYWRGaWxlU3luYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcImRhdGFcIiwgXCJjb25maWcuanNvblwiKSkudG9TdHJpbmcoKVxyXG4gIClcclxuKTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgc2VydmVyLlxyXG4gKlxyXG4gKiBAY2xhc3MgU2VydmVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VydmVyIHtcclxuICBwcml2YXRlIHNlcnZlciA9IHRoaXM7XHJcblxyXG4gIHB1YmxpYyBjb250ZXh0OiBTZXJ2ZXJDb250ZXh0O1xyXG4gIHB1YmxpYyBjb2xsZWN0b3I6IENvbGxlY3RvcjtcclxuXHJcbiAgcHVibGljIGFwcDogQXBwbGljYXRpb247XHJcblxyXG4gIC8qXHJcbiAgcHJpdmF0ZSBjYWxsc1BlclNlY29uZHMgPSB7fTtcclxuICBwcml2YXRlIHdhcm5pbmdzID0ge307XHJcbiAgKi9cclxuXHJcbiAgcHJpdmF0ZSBsb2dGaWxlID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0ocGF0aC5qb2luKF9fZGlybmFtZSwgXCJsb2cudHh0XCIpLCB7XHJcbiAgICBmbGFnczogXCJhXCJcclxuICB9KTtcclxuXHJcbiAgcHJpdmF0ZSBtYXJrZXRBcmNoaXZlOiB7IHRpbWU6IG51bWJlcjsgdmFsdWU6IG51bWJlciB9W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQm9vdHN0cmFwIHRoZSBhcHBsaWNhdGlvbi5cclxuICAgKlxyXG4gICAqIEBjbGFzcyBTZXJ2ZXJcclxuICAgKiBAbWV0aG9kIGJvb3RzdHJhcFxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcmV0dXJuIHtuZy5hdXRvLklJbmplY3RvclNlcnZpY2V9IFJldHVybnMgdGhlIG5ld2x5IGNyZWF0ZWQgaW5qZWN0b3IgZm9yIHRoaXMgYXBwLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgYm9vdHN0cmFwKCk6IFNlcnZlciB7XHJcbiAgICByZXR1cm4gbmV3IFNlcnZlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3IuXHJcbiAgICpcclxuICAgKiBAY2xhc3MgU2VydmVyXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBuZXcgU2VydmVyQ29udGV4dCgpO1xyXG5cclxuICAgIC8vY3JlYXRlIGV4cHJlc3NqcyBhcHBsaWNhdGlvblxyXG4gICAgdGhpcy5hcHAgPSBleHByZXNzKCk7XHJcblxyXG4gICAgLy9jb25maWd1cmUgYXBwbGljYXRpb25cclxuICAgIHRoaXMuY29uZmlnKCk7XHJcblxyXG4gICAgLy9hZGQgYXBpXHJcbiAgICB0aGlzLmFwaSgpO1xyXG5cclxuICAgIGlmIChjb25maWcucG9ydCkge1xyXG4gICAgICBsZXQgaHR0cFBvcnQgPSBjb25maWcudXNlRW52UG9ydFxyXG4gICAgICAgID8gcHJvY2Vzcy5lbnYuUE9SVCB8fCBjb25maWcucG9ydFxyXG4gICAgICAgIDogY29uZmlnLnBvcnQ7XHJcblxyXG4gICAgICBsZXQgaHR0cFNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKCk7XHJcblxyXG4gICAgICBodHRwU2VydmVyLm9uKFwicmVxdWVzdFwiLCB0aGlzLmFwcCk7XHJcblxyXG4gICAgICBodHRwU2VydmVyLmxpc3RlbihodHRwUG9ydCk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcIlNlcnZlciBzdGFydGVkIG9uIHBvcnQgaHR0cDovLys6XCIgKyBodHRwUG9ydCArIFwiLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29uZmlnLnNlY3VyZVBvcnQpIHtcclxuICAgICAgbGV0IGh0dHBzUG9ydCA9IGNvbmZpZy51c2VFbnZQb3J0XHJcbiAgICAgICAgPyBwcm9jZXNzLmVudi5QT1JUIHx8IGNvbmZpZy5zZWN1cmVQb3J0XHJcbiAgICAgICAgOiBjb25maWcuc2VjdXJlUG9ydDtcclxuXHJcbiAgICAgIGxldCBwcml2YXRlS2V5ID0gZnMucmVhZEZpbGVTeW5jKFwic3NsY2VydC9ob3N0LmtleVwiLCBcInV0ZjhcIik7XHJcbiAgICAgIGxldCBjZXJ0aWZpY2F0ZSA9IGZzLnJlYWRGaWxlU3luYyhcInNzbGNlcnQvaG9zdC5jcnRcIiwgXCJ1dGY4XCIpO1xyXG5cclxuICAgICAgbGV0IGNyZWRlbnRpYWxzID0geyBrZXk6IHByaXZhdGVLZXksIGNlcnQ6IGNlcnRpZmljYXRlIH07XHJcblxyXG4gICAgICBsZXQgaHR0cHNTZXJ2ZXIgPSBodHRwcy5jcmVhdGVTZXJ2ZXIoY3JlZGVudGlhbHMpO1xyXG5cclxuICAgICAgaHR0cHNTZXJ2ZXIub24oXCJyZXF1ZXN0XCIsIHRoaXMuYXBwKTtcclxuXHJcbiAgICAgIGh0dHBzU2VydmVyLmxpc3RlbihodHRwc1BvcnQpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJTZXJ2ZXIgc3RhcnRlZCBvbiBwb3J0IGh0dHBzOi8vKzpcIiArIGh0dHBzUG9ydCArIFwiLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbGxlY3RvciA9IG5ldyBDb2xsZWN0b3IodGhpcy5jb250ZXh0KTtcclxuICAgIHRoaXMuY29sbGVjdG9yLmNvbGxlY3QoKTtcclxuICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgdGhpcy5jb2xsZWN0b3IuY29sbGVjdCgpO1xyXG4gICAgfSwgMTAwMCAqIDYwICogNjAgKiAyNCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb25maWd1cmUgYXBwbGljYXRpb25cclxuICAgKlxyXG4gICAqIEBjbGFzcyBTZXJ2ZXJcclxuICAgKiBAbWV0aG9kIGNvbmZpZ1xyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25maWcoKSB7XHJcbiAgICB0aGlzLmFwcC51c2UoZXJyb3JIYW5kbGVyKHsgbG9nOiBmYWxzZSB9KSk7XHJcblxyXG4gICAgdGhpcy5hcHAudXNlKChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgICBuZXh0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL3VzZSBsb2dnZXIgbWlkZGx3YXJlXHJcbiAgICB0aGlzLmFwcC51c2UobG9nZ2VyKFwiZGV2XCIpKTtcclxuXHJcbiAgICB0aGlzLmFwcC51c2UoY29ycygpKTtcclxuXHJcbiAgICBpZiAoY29uZmlnLnVybFJld3JpdGUpIHtcclxuICAgICAgdGhpcy5hcHAudXNlKHJld3JpdGUoY29uZmlnLnVybFJld3JpdGUuZnJvbSwgY29uZmlnLnVybFJld3JpdGUudG8pKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3VzZSBqc29uIGZvcm0gcGFyc2VyIG1pZGRsd2FyZVxyXG4gICAgdGhpcy5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcclxuXHJcbiAgICAvL3VzZSBxdWVyeSBzdHJpbmcgcGFyc2VyIG1pZGRsd2FyZVxyXG4gICAgdGhpcy5hcHAudXNlKFxyXG4gICAgICBib2R5UGFyc2VyLnVybGVuY29kZWQoe1xyXG4gICAgICAgIGV4dGVuZGVkOiB0cnVlXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vdXNlIGNvb2tpZSBwYXJrZXIgbWlkZGxld2FyZSBtaWRkbHdhcmVcclxuICAgIHRoaXMuYXBwLnVzZShjb29raWVQYXJzZXIoY29va2llU2VjcmV0KSk7XHJcblxyXG4gICAgLy91c2Ugb3ZlcnJpZGUgbWlkZGx3YXJlXHJcbiAgICB0aGlzLmFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XHJcblxyXG4gICAgLy9jYXRjaCA0MDQgYW5kIGZvcndhcmQgdG8gZXJyb3IgaGFuZGxlclxyXG4gICAgdGhpcy5hcHAudXNlKGZ1bmN0aW9uKFxyXG4gICAgICBlcnI6IGFueSxcclxuICAgICAgcmVxOiBSZXF1ZXN0LFxyXG4gICAgICByZXM6IFJlc3BvbnNlLFxyXG4gICAgICBuZXh0OiBOZXh0RnVuY3Rpb25cclxuICAgICkge1xyXG4gICAgICBlcnIuc3RhdHVzID0gNDA0O1xyXG4gICAgICBuZXh0KGVycik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2Vycm9yIGhhbmRsaW5nXHJcbiAgICB0aGlzLmFwcC51c2UoZXJyb3JIYW5kbGVyKCkpO1xyXG5cclxuICAgIC8vYWRkIHN0YXRpYyBwYXRoc1xyXG4gICAgdGhpcy5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsIGNvbmZpZy53d3dyb290KSkpO1xyXG5cclxuICAgIHRoaXMuYXBwLnVzZSgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcclxuICAgICAgbmV4dCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgIHRoaXMuYXBwLnVzZSgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcclxuICAgICAgdGhpcy5jYWxsc1BlclNlY29uZHNbcmVxLmlwXSA9ICh0aGlzLmNhbGxzUGVyU2Vjb25kc1tyZXEuaXBdIHx8IDApICsgMTtcclxuXHJcbiAgICAgIGlmICh0aGlzLndhcm5pbmdzW3JlcS5pcF0gPiAzKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMud2FybmluZ3NbcmVxLmlwXTtcclxuICAgICAgICB0aGlzLmNhbGxzUGVyU2Vjb25kc1tyZXEuaXBdID0gNSAqIDUgKiA2MDtcclxuICAgICAgICBjb25zb2xlLmxvZygnQmFuIFwiJyArIHJlcS5pcCArICdcIiBmb3IgNSBtaW5zJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLmNhbGxzUGVyU2Vjb25kc1tyZXEuaXBdID4gNSkge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDI5KS5lbmQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5leHQoKTtcclxuICAgIH0pXHJcbiAgICAqL1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRTZXNzaW9uVXNlcihyZXE6IFJlcXVlc3QpOiBVc2VyIHtcclxuICAgIGlmIChyZXFbXCJ1c2VyXCJdKSB7XHJcbiAgICAgIHJldHVybiByZXFbXCJ1c2VyXCJdO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzZXNzaW9uID0gcmVxLmNvb2tpZXNbXCJzZXNzaW9uXCJdO1xyXG4gICAgcmV0dXJuIHNlc3Npb24gPyAocmVxW1widXNlclwiXSA9IHRoaXMuY29udGV4dC5nZXRMb2dpbihzZXNzaW9uKSkgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0FkbWluaXN0cmF0b3IocmVxOiBSZXF1ZXN0KSB7XHJcbiAgICBsZXQgYXBwVXNlciA9IHRoaXMuZ2V0U2Vzc2lvblVzZXIocmVxKTtcclxuICAgIHJldHVybiBhcHBVc2VyICYmIGFwcFVzZXIucm9sZSA9PT0gUm9sZS5BZG1pbmlzdHJhdG9yO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0VsZXZhdGVkKHJlcTogUmVxdWVzdCkge1xyXG4gICAgbGV0IGFwcFVzZXIgPSB0aGlzLmdldFNlc3Npb25Vc2VyKHJlcSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBhcHBVc2VyICYmXHJcbiAgICAgIChhcHBVc2VyLnJvbGUgPT09IFJvbGUuQWRtaW5pc3RyYXRvciB8fCBhcHBVc2VyLnJvbGUgPT09IFJvbGUuRWxldmF0ZWQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0xvZ2dlZEluKHJlcTogUmVxdWVzdCkge1xyXG4gICAgcmV0dXJuICEhdGhpcy5nZXRTZXNzaW9uVXNlcihyZXEpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb2cocmVxOiBSZXF1ZXN0LCBtZXNzYWdlOiBzdHJpbmcsIGxvZ0JvZHk6IGJvb2xlYW4pIHtcclxuICAgIGxldCBtc2cgPSBcIlwiO1xyXG5cclxuICAgIG1zZyArPSBEYXRlKCk7XHJcbiAgICBtc2cgKz0gXCJcXHRcIjtcclxuICAgIG1zZyArPSByZXEucGF0aDtcclxuICAgIG1zZyArPSBcIlxcdFwiO1xyXG4gICAgbXNnICs9IHRoaXMuaXNMb2dnZWRJbihyZXEpID8gdGhpcy5nZXRTZXNzaW9uVXNlcihyZXEpLmlkIDogXCJbTk9UTE9HR0VESU5dXCI7XHJcbiAgICBtc2cgKz0gXCJcXHRcIjtcclxuICAgIG1zZyArPSBtZXNzYWdlIHx8IFwiW05PTUVTU0FHRV1cIjtcclxuICAgIGlmIChsb2dCb2R5KSB7XHJcbiAgICAgIG1zZyArPSBcIlxcdFwiO1xyXG4gICAgICBtc2cgKz0gSlNPTi5zdHJpbmdpZnkocmVxLmJvZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9nRmlsZS53cml0ZShtc2cgKyBcIlxcblwiKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBSRVNUIEFQSSByb3V0ZXNcclxuICAgKlxyXG4gICAqIEBjbGFzcyBTZXJ2ZXJcclxuICAgKiBAbWV0aG9kIGFwaVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhcGkoKSB7XHJcbiAgICBsZXQgcm91dGVyID0gUm91dGVyKCk7XHJcblxyXG4gICAgcm91dGVyLnJvdXRlKFwiL3VzZXJzXCIpLnBvc3QoKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5pc0FkbWluaXN0cmF0b3IpIHtcclxuICAgICAgICB0aGlzLmxvZyhyZXEsIFwiTm90IGFuIGFkbWluaXN0cmF0b3IuXCIsIHRydWUpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAxKS5lbmQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCB1c2VyID0gbmV3IFVzZXIocmVxLmJvZHkudXNlcik7XHJcbiAgICAgIGxldCBwYXNzID0gPHN0cmluZz5yZXEuYm9keS5wYXNzO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuYWRkVXNlcih1c2VyLmlkLCB1c2VyLm5hbWUsIHBhc3MsIFJvbGUuVXNlcik7XHJcblxyXG4gICAgICAgIHRoaXMubG9nKHJlcSwgXCJBZGRlZCB1c2VyOiBcIiArIHVzZXIuaWQsIHRydWUpO1xyXG5cclxuICAgICAgICByZXMuanNvbih1c2VyLmlkKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgdGhpcy5sb2cocmVxLCBcIkVycm9yOiBcIiArIEpTT04uc3RyaW5naWZ5KGVyci5tZXNzYWdlIHx8IGVyciksIHRydWUpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKTtcclxuICAgICAgICByZXMuanNvbihlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByb3V0ZXIucm91dGUoXCIvdXNlcnNcIikucHV0KChyZXEsIHJlcykgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuaXNMb2dnZWRJbihyZXEpKSB7XHJcbiAgICAgICAgdGhpcy5sb2cocmVxLCBcIk5vdCBsb2dnZWQgaW4uXCIsIHRydWUpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAxKS5lbmQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCB1c2VySWQgPSByZXEuYm9keS51c2VySWQ7XHJcbiAgICAgIGxldCBhY3Rpb24gPSByZXEuYm9keS5hY3Rpb247XHJcbiAgICAgIGxldCB2YWx1ZSA9IHJlcS5ib2R5LnZhbHVlO1xyXG5cclxuICAgICAgbGV0IHVzZXIgPSB0aGlzLmNvbnRleHQuZ2V0VXNlcih1c2VySWQpO1xyXG5cclxuICAgICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICBjYXNlIFwicGFzc1wiOlxyXG4gICAgICAgICAgaWYgKCF0aGlzLmlzQWRtaW5pc3RyYXRvcihyZXEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKHJlcSwgXCJOb3QgYW4gYWRtaW5pc3RyYXRvci5cIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDQwMSkuZW5kKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLmNvbnRleHQuc2V0UGFzc3dvcmQodXNlci5pZCwgdmFsdWUpO1xyXG5cclxuICAgICAgICAgIHRoaXMubG9nKHJlcSwgXCJDaGFuZ2VkIHBhc3N3b3JkLlwiLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgcmVzLmpzb24odHJ1ZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY2FzZSBcInJvbGVcIjpcclxuICAgICAgICAgIGlmICghdGhpcy5pc0FkbWluaXN0cmF0b3IocmVxKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhyZXEsIFwiTm90IGFuIGFkbWluaXN0cmF0b3IuXCIsIHRydWUpO1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDQwMSkuZW5kKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLmNvbnRleHQudXBkYXRlVXNlclJvbGUodXNlci5pZCwgdmFsdWUpO1xyXG5cclxuICAgICAgICAgIHRoaXMubG9nKHJlcSwgXCJDaGFuZ2VkIHJvbGUuXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAgIHJlcy5qc29uKHRoaXMuY29udGV4dC5nZXRVc2VyKHVzZXIuaWQpKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcm91dGVyLnJvdXRlKFwiL3VzZXJzXCIpLmdldCgocmVxLCByZXMpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmlzRWxldmF0ZWQocmVxKSkge1xyXG4gICAgICAgIHRoaXMubG9nKHJlcSwgXCJOb3QgYW4gZWxldmF0ZWQgdXNlci5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDEpLmVuZCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFyZXEucXVlcnkuc2VhcmNoKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDApLmVuZCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmVzLmpzb24odGhpcy5jb250ZXh0LnNlYXJjaChyZXEucXVlcnkuc2VhcmNoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByb3V0ZXIucm91dGUoXCIvdXNlcnMvOmlkXCIpLmdldCgocmVxLCByZXMpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmlzTG9nZ2VkSW4ocmVxKSkge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAxKS5lbmQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCB1c2VyID0gdGhpcy5jb250ZXh0LmdldFVzZXIocmVxLnBhcmFtcy5pZCk7XHJcbiAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgcmVzLmpzb24odXNlcik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDQpLmVuZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByb3V0ZXIucm91dGUoXCIvbG9naW5cIikucHV0KChyZXEsIHJlcykgPT4ge1xyXG4gICAgICBsZXQgc2Vzc2lvbiA9IHRoaXMuY29udGV4dC5sb2dpbihyZXEuYm9keS5pZCwgcmVxLmJvZHkucGFzcyk7XHJcbiAgICAgIGlmIChzZXNzaW9uKSB7XHJcbiAgICAgICAgdGhpcy5sb2coXHJcbiAgICAgICAgICByZXEsXHJcbiAgICAgICAgICBcIlN1Y2Nlc3NmdWwgbG9naW46IFwiICsgcmVxLmJvZHkuaWQgKyBcIiBcIiArIHNlc3Npb24sXHJcbiAgICAgICAgICBmYWxzZVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJlcy5jb29raWUoXCJzZXNzaW9uXCIsIHNlc3Npb24pO1xyXG4gICAgICAgIHJlcy5qc29uKHRoaXMuY29udGV4dC5nZXRVc2VyQnlVc2VyTmFtZShyZXEuYm9keS5pZCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9nKHJlcSwgXCJGYWlsZWQgbG9naW46IFwiICsgcmVxLmJvZHkuaWQsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy90aGlzLndhcm5pbmdzW3JlcS5pcF0gPSAodGhpcy53YXJuaW5nc1tyZXEuaXBdIHx8IDApICsgMTtcclxuICAgICAgICByZXMuY2xlYXJDb29raWUoXCJzZXNzaW9uXCIpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDA0KS5lbmQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcm91dGVyLnJvdXRlKFwiL3JlbG9naW5cIikucHV0KChyZXEsIHJlcykgPT4ge1xyXG4gICAgICBsZXQgdXNlciA9IHRoaXMuY29udGV4dC5nZXRMb2dpbihyZXEuYm9keS5pZCk7XHJcbiAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgcmVzLmpzb24odXNlcik7XHJcblxyXG4gICAgICAgIHRoaXMubG9nKFxyXG4gICAgICAgICAgcmVxLFxyXG4gICAgICAgICAgXCJTdWNjZXNzZnVsIHJlbG9naW46IFwiICsgdXNlci5pZCArIFwiIFwiICsgcmVxLmJvZHkuaWQsXHJcbiAgICAgICAgICBmYWxzZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2cocmVxLCBcIkZhaWxlZCByZWxvZ2luOiBcIiArIHJlcS5ib2R5LmlkLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIHJlcy5jbGVhckNvb2tpZShcInNlc3Npb25cIik7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDQpLmVuZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByb3V0ZXIucm91dGUoXCIva2V5LzprZXlcIikuZ2V0KChyZXEsIHJlcykgPT4ge1xyXG4gICAgICBsZXQgc2Vzc2lvbiA9IHRoaXMuY29udGV4dC5sb2dpbldpdGhLZXkocmVxLnBhcmFtcy5rZXkpO1xyXG4gICAgICBpZiAoc2Vzc2lvbikge1xyXG4gICAgICAgIHRoaXMubG9nKFxyXG4gICAgICAgICAgcmVxLFxyXG4gICAgICAgICAgXCJTdWNjZXNzZnVsIGtleSBsb2dpbjogXCIgKyByZXEucGFyYW1zLmtleSArIFwiIFwiICsgc2Vzc2lvbixcclxuICAgICAgICAgIGZhbHNlXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmVzLmNvb2tpZShcInNlc3Npb25cIiwgc2Vzc2lvbik7XHJcbiAgICAgICAgcmVzLnJlZGlyZWN0KFwiL1wiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmxvZyhyZXEsIFwiRmFpbGVkIGxvZ2luOiBcIiArIHJlcS5ib2R5LmlkLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vdGhpcy53YXJuaW5nc1tyZXEuaXBdID0gKHRoaXMud2FybmluZ3NbcmVxLmlwXSB8fCAwKSArIDE7XHJcbiAgICAgICAgcmVzLmNsZWFyQ29va2llKFwic2Vzc2lvblwiKTtcclxuICAgICAgICByZXMuc3RhdHVzKDQwNCkuZW5kKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJvdXRlci5yb3V0ZShcIi9pdGVtL3Byb2dyZXNzXCIpLmdldCgocmVxLCByZXMpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmlzTG9nZ2VkSW4ocmVxKSkge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAxKS5lbmQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlcy5qc29uKHRoaXMuY29udGV4dC5nZXRVc2VySXRlbXModGhpcy5nZXRTZXNzaW9uVXNlcihyZXEpLmlkKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByb3V0ZXIucm91dGUoXCIvaXRlbVwiKS5nZXQoKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgIC8vIGlmICghdGhpcy5pc0xvZ2dlZEluKHJlcSkpIHtcclxuICAgICAgLy8gICByZXMuc3RhdHVzKDQwMSkuZW5kKCk7XHJcbiAgICAgIC8vICAgcmV0dXJuO1xyXG4gICAgICAvLyB9XHJcblxyXG4gICAgICByZXMuanNvbih7XHJcbiAgICAgICAgZGF0YTogdGhpcy5jb2xsZWN0b3IuY2xpZW50SXRlbXMsXHJcbiAgICAgICAgaGFzaDogdGhpcy5jb2xsZWN0b3IuY2xpZW50SXRlbXNIYXNoXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcm91dGVyLnJvdXRlKFwiL2l0ZW0vOmhhc2hcIikuZ2V0KChyZXEsIHJlcykgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuaXNMb2dnZWRJbihyZXEpKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDEpLmVuZCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlcS5wYXJhbXMuaGFzaCA9PT0gdGhpcy5jb2xsZWN0b3IuY2xpZW50SXRlbXNIYXNoKSB7XHJcbiAgICAgICAgcmVzLmpzb24odHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzLmpzb24oe1xyXG4gICAgICAgICAgZGF0YTogdGhpcy5jb2xsZWN0b3IuY2xpZW50SXRlbXMsXHJcbiAgICAgICAgICBoYXNoOiB0aGlzLmNvbGxlY3Rvci5jbGllbnRJdGVtc0hhc2hcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcm91dGVyLnJvdXRlKFwiL2l0ZW0vaW1hZ2UvOmltYWdlXCIpLmdldCgocmVxLCByZXMpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmlzTG9nZ2VkSW4ocmVxKSkge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAxKS5lbmQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBpbWcgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnd2FyZnJhbWUtaXRlbXMnLCAnZGF0YScsICdpbWcnLCByZXEucGFyYW1zLmltYWdlKTtcclxuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoaW1nKSkge1xyXG4gICAgICAgIHJlcy5zZW5kRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnd2FyZnJhbWUtaXRlbXMnLCAnZGF0YScsICdpbWcnLCByZXEucGFyYW1zLmltYWdlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDQpLmVuZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByb3V0ZXIucm91dGUoXCIvaXRlbS9wcm9ncmVzc1wiKS5wdXQoKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5pc0xvZ2dlZEluKHJlcSkpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwMSkuZW5kKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5zZXRQcm9ncmVzcyhcclxuICAgICAgICAgIHRoaXMuZ2V0U2Vzc2lvblVzZXIocmVxKS5pZCxcclxuICAgICAgICAgIHJlcS5ib2R5LmlkLFxyXG4gICAgICAgICAgcmVxLmJvZHkudmFsdWVcclxuICAgICAgICApO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5lbmQoKTtcclxuICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICByZXMuc3RhdHVzTWVzc2FnZSA9IGV4Lm1lc3NhZ2UgfHwgZXg7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDApLmVuZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByb3V0ZXIucm91dGUoXCIvaXRlbS9ub3RlXCIpLnB1dCgocmVxLCByZXMpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmlzTG9nZ2VkSW4ocmVxKSkge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAxKS5lbmQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldE5vdGUoXHJcbiAgICAgICAgICB0aGlzLmdldFNlc3Npb25Vc2VyKHJlcSkuaWQsXHJcbiAgICAgICAgICByZXEuYm9keS5pZCxcclxuICAgICAgICAgIHJlcS5ib2R5LnZhbHVlXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuZW5kKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDApLmVuZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByb3V0ZXIucm91dGUoXCIvaXRlbS9kZXNjcmlwdGlvblwiKS5wdXQoKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5pc0VsZXZhdGVkKHJlcSkpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwMSkuZW5kKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmNvbnRleHQuc2V0RGVzY3JpcHRpb24ocmVxLmJvZHkuaWQsIHJlcS5ib2R5LnZhbHVlKTtcclxuXHJcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5lbmQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYXBwLnVzZShcIi9hcGlcIiwgcm91dGVyKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU2VydmVyQ29udGV4dCB9IGZyb20gXCIuL3NlcnZlci5jb250ZXh0XCI7XHJcbmltcG9ydCB7IElVc2VySXRlbSB9IGZyb20gXCIuLi9kYXRhL3VzZXJJdGVtXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IGZzID0gcmVxdWlyZShcImZzXCIpO1xyXG5pbXBvcnQgKiBhcyBIYXNoIGZyb20gXCJub2RlLW9iamVjdC1oYXNoXCI7XHJcbmltcG9ydCB7IGNsb25lRGVlcCB9IGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmNvbnN0IHV0aWwgPSByZXF1aXJlKFwidXRpbFwiKTtcclxuY29uc3QgZXhlYyA9IHV0aWwucHJvbWlzaWZ5KHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpLmV4ZWMpO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbGxlY3RvciB7XHJcbiAgcHJpdmF0ZSBpdGVtczogYW55W107XHJcbiAgcHJpdmF0ZSBpdGVtc0hhc2g6IHN0cmluZztcclxuXHJcbiAgcHVibGljIGNsaWVudEl0ZW1zOiBhbnlbXTtcclxuICBwdWJsaWMgY2xpZW50SXRlbXNIYXNoOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGV4dDogU2VydmVyQ29udGV4dCkge31cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyB1cGRhdGVXYXJmcmFtZUl0ZW1zKCkge1xyXG4gICAgY29uc3QgeyBzdGRvdXQsIHN0ZGVyciB9ID0gYXdhaXQgZXhlYyhcIm5wbSB1cGRhdGUgd2FyZnJhbWUtaXRlbXNcIik7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjb2xsZWN0KCkge1xyXG4gICAgYXdhaXQgdGhpcy51cGRhdGVXYXJmcmFtZUl0ZW1zKCk7XHJcblxyXG4gICAgdGhpcy5pdGVtcyA9IEpTT04ucGFyc2UoXHJcbiAgICAgIGZzXHJcbiAgICAgICAgLnJlYWRGaWxlU3luYyhcclxuICAgICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwid2FyZnJhbWUtaXRlbXNcIiwgXCJkYXRhXCIsIFwianNvblwiLCBcIkFsbC5qc29uXCIpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC50b1N0cmluZygpXHJcbiAgICApO1xyXG4gICAgdGhpcy5pdGVtc0hhc2ggPSBIYXNoKCkuaGFzaCh0aGlzLml0ZW1zKTtcclxuXHJcbiAgICB0aGlzLmNsaWVudEl0ZW1zID0gY2xvbmVEZWVwKFxyXG4gICAgICB0aGlzLml0ZW1zLyouZmlsdGVyKGYgPT4ge1xyXG4gICAgICAgIHN3aXRjaCAoZi5jYXRlZ29yeSkge1xyXG4gICAgICAgICAgY2FzZSBcIk1vZHNcIjpcclxuICAgICAgICAgIGNhc2UgXCJQcmltYXJ5XCI6XHJcbiAgICAgICAgICBjYXNlIFwiU2Vjb25kYXJ5XCI6XHJcbiAgICAgICAgICBjYXNlIFwiTWVsZWVcIjpcclxuICAgICAgICAgIGNhc2UgXCJXYXJmcmFtZXNcIjpcclxuICAgICAgICAgIGNhc2UgXCJBcmNod2luZ1wiOlxyXG4gICAgICAgICAgY2FzZSBcIlBldHNcIjpcclxuICAgICAgICAgIGNhc2UgXCJTZW50aW5lbHNcIjpcclxuICAgICAgICAgIGNhc2UgXCJTa2luc1wiOlxyXG4gICAgICAgICAgY2FzZSBcIlJlc291cmNlc1wiOlxyXG4gICAgICAgICAgY2FzZSBcIlJlbGljc1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIGNhc2UgXCJGaXNoXCI6XHJcbiAgICAgICAgICBjYXNlIFwiR2VhclwiOlxyXG4gICAgICAgICAgY2FzZSBcIkdseXBoc1wiOlxyXG4gICAgICAgICAgY2FzZSBcIlNpZ2lsc1wiOlxyXG4gICAgICAgICAgY2FzZSBcIk1pc2NcIjpcclxuICAgICAgICAgIGNhc2UgXCJRdWVzdHNcIjpcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pKi9cclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5jbGllbnRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5maWx0ZXJDbGllbnRJdGVtKGl0ZW0pKTtcclxuXHJcbiAgICB0aGlzLmNsaWVudEl0ZW1zSGFzaCA9IEhhc2goKS5oYXNoKHRoaXMuY2xpZW50SXRlbXMpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiQ29sbGVjdG9yIGZpbmlzaGVkLlwiKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xpZW50SXRlbUtleXM6IHN0cmluZ1tdID0gW1xyXG4gICAgXCJ1bmlxdWVOYW1lXCIsXHJcbiAgICBcIm5hbWVcIixcclxuICAgIFwidHlwZVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCIsXHJcbiAgICBcImltYWdlTmFtZVwiLFxyXG4gICAgXCJjYXRlZ29yeVwiLFxyXG4gICAgXCJ3aWtpYVVybFwiXHJcbiAgXTtcclxuXHJcbiAgcHJpdmF0ZSBmaWx0ZXJDbGllbnRJdGVtKGl0ZW0pIHtcclxuICAgIGZvciAobGV0IGtleSBpbiBpdGVtKSB7XHJcbiAgICAgIGlmICh0aGlzLmNsaWVudEl0ZW1LZXlzLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcclxuICAgICAgICBpZiAoa2V5ID09PSBcImNvbXBvbmVudHNcIikge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtW2tleV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJDb21wb25lbnQoaXRlbVtrZXldW2ldKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVsZXRlIGl0ZW1ba2V5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wb25lbnRJdGVtS2V5czogc3RyaW5nW10gPSBbXHJcbiAgICBcInVuaXF1ZU5hbWVcIixcclxuICAgIFwibmFtZVwiLFxyXG4gICAgXCJpdGVtQ291bnRcIixcclxuICAgIFwiaW1hZ2VOYW1lXCIsXHJcbiAgICBcImRyb3BzXCJcclxuICBdO1xyXG5cclxuICBwcml2YXRlIGZpbHRlckNvbXBvbmVudChpdGVtKSB7XHJcbiAgICBmb3IgKGxldCBrZXkgaW4gaXRlbSkge1xyXG4gICAgICBpZiAodGhpcy5jb21wb25lbnRJdGVtS2V5cy5pbmRleE9mKGtleSkgPT09IC0xKSB7XHJcbiAgICAgICAgZGVsZXRlIGl0ZW1ba2V5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIERhdGFiYXNlIGZyb20gJ2JldHRlci1zcWxpdGUzJztcclxuaW1wb3J0IHsgVXNlciwgUm9sZSB9IGZyb20gJy4vdXNlcic7XHJcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZC92NCc7XHJcbmltcG9ydCAqIGFzIHNoYTI1NiBmcm9tICdzaGEyNTYnO1xyXG5cclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgSVVzZXJJdGVtIH0gZnJvbSAnLi4vZGF0YS91c2VySXRlbSc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VydmVyQ29udGV4dCB7XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRBZGRWZXJzaW9uO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50R2V0VmVyc2lvbjtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRBZGRVc2VyO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50VXBkVXNlclJvbGU7XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRHZXRVc2VyO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50R2V0VXNlckJ5VXNlck5hbWU7XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRHZXRVc2VyQnlLZXk7XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRTZXRQYXNzd29yZDtcclxuICBwcml2YXRlIHN0YXRlbWVudFNlYXJjaDtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRBZGRTZXNzaW9uO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50R2V0U2Vzc2lvbjtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRBZGRQcm9ncmVzcztcclxuICBwcml2YXRlIHN0YXRlbWVudFNldFByb2dyZXNzO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50U2V0Tm90ZTtcclxuICBwcml2YXRlIHN0YXRlbWVudEdldEl0ZW07XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRHZXRJdGVtQnlOYW1lO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50R2V0SXRlbUJ5SWQ7XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRHZXRVc2VySXRlbTtcclxuICBwcml2YXRlIHN0YXRlbWVudEdldFVzZXJJdGVtcztcclxuICBwcml2YXRlIHN0YXRlbWVudFNldERlc2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50U2V0TG9jYXRpb247XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRTZXRNYXhQcm9ncmVzcztcclxuICBwcml2YXRlIHN0YXRlbWVudFNldEl0ZW1WZXJzaW9uO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50R2V0SXRlbXM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgbGV0IGNyZWF0ZSA9ICFmcy5leGlzdHNTeW5jKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdkYXRhJywgJ2RhdGEuZGInKSk7XHJcbiAgICBsZXQgZGIgPSBuZXcgRGF0YWJhc2UocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2RhdGEnLCAnZGF0YS5kYicpKTtcclxuXHJcbiAgICBpZiAoY3JlYXRlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGUgZGF0YWJhc2UuJylcclxuXHJcbiAgICAgIGRiLnByZXBhcmUoJ0NSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIFZlcnNpb24gKGlkIElOVEVHRVIgUFJJTUFSWSBLRVkpOycpLnJ1bigpO1xyXG4gICAgICB0aGlzLnN0YXRlbWVudEFkZFZlcnNpb24gPSBkYi5wcmVwYXJlKCdJTlNFUlQgSU5UTyBWZXJzaW9uIFZBTFVFUyg/KScpXHJcbiAgICAgIHRoaXMuc3RhdGVtZW50QWRkVmVyc2lvbi5ydW4oMCk7XHJcbiAgICAgIGRiLnByZXBhcmUoJ0NSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIFVzZXIgKGlkIFRFWFQgUFJJTUFSWSBLRVksIHVzZXJOYW1lIFRFWFQgVU5JUVVFIE5PVCBOVUxMIGNvbGxhdGUgbm9jYXNlLCBuYW1lIFRFWFQsIHJvbGUgSU5URUdFUiwgcGFzc3dvcmQgVEVYVCwga2V5IFRFWFQgVU5JUVVFKTsnKS5ydW4oKTtcclxuICAgICAgdGhpcy5zdGF0ZW1lbnRBZGRVc2VyID0gZGIucHJlcGFyZSgnSU5TRVJUIElOVE8gVXNlciBWQUxVRVMoPywgPywgPywgPywgPywgPyknKVxyXG4gICAgICBkYi5wcmVwYXJlKCdDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBTZXNzaW9uIChpZCBURVhUIFBSSU1BUlkgS0VZLCB1c2VySWQgVEVYVCwgdmFsaWRpdHkgSU5URUdFUiwgRk9SRUlHTiBLRVkodXNlcklkKSBSRUZFUkVOQ0VTIFVzZXIoaWQpKTsnKS5ydW4oKTtcclxuXHJcbiAgICAgIGRiLnByZXBhcmUoJ0NSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIFByb2dyZXNzICh1c2VySWQgVEVYVCwgaXRlbUlkIFRFWFQsIHByb2dyZXNzIElOVEVHRVIsIG5vdGUgVEVYVCwgUFJJTUFSWSBLRVkgKHVzZXJJZCwgaXRlbUlkKSwgRk9SRUlHTiBLRVkodXNlcklkKSBSRUZFUkVOQ0VTIFVzZXIoaWQpKTsnKS5ydW4oKTtcclxuXHJcbiAgICAgIHRoaXMuc3RhdGVtZW50QWRkVXNlci5ydW4odXVpZCgpLCAnQicsICdCYWzDoXpzJywgUm9sZS5BZG1pbmlzdHJhdG9yLCBzaGEyNTYoJycpLCBudWxsKTtcclxuICAgICAgdGhpcy5zdGF0ZW1lbnRBZGRVc2VyLnJ1bih1dWlkKCksICdKJywgJ0p1ZGl0JywgUm9sZS5Vc2VyLCBzaGEyNTYoJycpLCBudWxsKTtcclxuICAgICAgdGhpcy5zdGF0ZW1lbnRBZGRVc2VyLnJ1bih1dWlkKCksICdUJywgJ1RpbScsIFJvbGUuVXNlciwgc2hhMjU2KCcnKSwgbnVsbCk7XHJcbiAgICAgIHRoaXMuc3RhdGVtZW50QWRkVXNlci5ydW4odXVpZCgpLCAnRycsICdHZXJnxZEnLCBSb2xlLlVzZXIsIHNoYTI1NignJyksIG51bGwpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuc3RhdGVtZW50QWRkVmVyc2lvbiA9IGRiLnByZXBhcmUoJ0lOU0VSVCBJTlRPIFZlcnNpb24gVkFMVUVTKD8pJylcclxuICAgICAgdGhpcy5zdGF0ZW1lbnRBZGRVc2VyID0gZGIucHJlcGFyZSgnSU5TRVJUIElOVE8gVXNlciBWQUxVRVMoPywgPywgPywgPywgPywgPyknKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0YXRlbWVudEdldFZlcnNpb24gPSBkYi5wcmVwYXJlKCdTRUxFQ1QgbWF4KGlkKSBhcyBpZCBGUk9NIFZlcnNpb247Jyk7XHJcblxyXG4gICAgLy9WZXJzaW9uIHVwZGF0ZVxyXG5cclxuICAgIHRoaXMuc3RhdGVtZW50R2V0VXNlciA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gVXNlciB3aGVyZSBpZCA9ID87Jyk7XHJcbiAgICB0aGlzLnN0YXRlbWVudEdldFVzZXJCeVVzZXJOYW1lID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBVc2VyIHdoZXJlIHVzZXJOYW1lID0gPzsnKTtcclxuICAgIHRoaXMuc3RhdGVtZW50R2V0VXNlckJ5S2V5ID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBVc2VyIHdoZXJlIGtleSA9ID87Jyk7XHJcbiAgICB0aGlzLnN0YXRlbWVudFVwZFVzZXJSb2xlID0gZGIucHJlcGFyZSgnVVBEQVRFIFVzZXIgU0VUIHJvbGUgPSA/IFdIRVJFIGlkID0gPycpO1xyXG5cclxuICAgIHRoaXMuc3RhdGVtZW50QWRkU2Vzc2lvbiA9IGRiLnByZXBhcmUoJ0lOU0VSVCBJTlRPIFNlc3Npb24gVkFMVUVTKD8sID8sID8pJyk7XHJcbiAgICB0aGlzLnN0YXRlbWVudEdldFNlc3Npb24gPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIFNlc3Npb24gV0hFUkUgaWQgPSA/Jyk7XHJcblxyXG4gICAgdGhpcy5zdGF0ZW1lbnRTZXRQYXNzd29yZCA9IGRiLnByZXBhcmUoJ1VQREFURSBVc2VyIFNFVCBwYXNzd29yZCA9ID8gV0hFUkUgaWQgPSA/Jyk7XHJcbiAgICB0aGlzLnN0YXRlbWVudFNlYXJjaCA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gVXNlciBXSEVSRSBuYW1lIExJS0UgPycpO1xyXG5cclxuICAgIHRoaXMuc3RhdGVtZW50QWRkUHJvZ3Jlc3MgPSBkYi5wcmVwYXJlKCdJTlNFUlQgSU5UTyBQcm9ncmVzcyBWQUxVRVMoPywgPywgPywgPyknKTtcclxuICAgIHRoaXMuc3RhdGVtZW50U2V0UHJvZ3Jlc3MgPSBkYi5wcmVwYXJlKCdVUERBVEUgUHJvZ3Jlc3MgU0VUIHByb2dyZXNzID0gPyBXSEVSRSB1c2VySWQgPSA/IEFORCBpdGVtSWQgPSA/Jyk7XHJcbiAgICB0aGlzLnN0YXRlbWVudFNldE5vdGUgPSBkYi5wcmVwYXJlKCdVUERBVEUgUHJvZ3Jlc3MgU0VUIG5vdGUgPSA/IFdIRVJFIHVzZXJJZCA9ID8gQU5EIGl0ZW1JZCA9ID8nKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlbWVudEdldFVzZXJJdGVtID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBQcm9ncmVzcyBXSEVSRSB1c2VySWQgPSA/IEFORCBpdGVtSWQgPSA/Jyk7XHJcbiAgICB0aGlzLnN0YXRlbWVudEdldFVzZXJJdGVtcyA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gUHJvZ3Jlc3MgV0hFUkUgdXNlcklkID0gPycpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHZlcnNpb24oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlbWVudEdldFZlcnNpb24uZ2V0KCkuaWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VXNlcihpZDogc3RyaW5nKTogVXNlciB7XHJcbiAgICBsZXQgcm93ID0gdGhpcy5zdGF0ZW1lbnRHZXRVc2VyLmdldChpZCk7XHJcbiAgICByZXR1cm4gcm93ID8gbmV3IFVzZXIocm93KSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VXNlckJ5VXNlck5hbWUoaWQ6IHN0cmluZyk6IFVzZXIge1xyXG4gICAgbGV0IHJvdyA9IHRoaXMuc3RhdGVtZW50R2V0VXNlckJ5VXNlck5hbWUuZ2V0KGlkKTtcclxuICAgIHJldHVybiByb3cgPyBuZXcgVXNlcihyb3cpIDogbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMb2dpbihzZXNzaW9uOiBzdHJpbmcpOiBVc2VyIHtcclxuICAgIGxldCBzZXNzaW9uUm93ID0gdGhpcy5zdGF0ZW1lbnRHZXRTZXNzaW9uLmdldChzZXNzaW9uKTtcclxuICAgIGlmIChzZXNzaW9uUm93ICYmIHNlc3Npb25Sb3cudmFsaWRpdHkgPj0gRGF0ZS5ub3coKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRVc2VyKHNlc3Npb25Sb3cudXNlcklkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ2luKHVzZXJOYW1lOiBzdHJpbmcsIHBhc3M6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgcm93ID0gdGhpcy5zdGF0ZW1lbnRHZXRVc2VyQnlVc2VyTmFtZS5nZXQodXNlck5hbWUpO1xyXG4gICAgaWYgKHJvdyAmJiByb3cucGFzc3dvcmQgPT09IHNoYTI1NihwYXNzKSkge1xyXG4gICAgICBsZXQgc2Vzc2lvbiA9IHV1aWQoKTtcclxuICAgICAgdGhpcy5zdGF0ZW1lbnRBZGRTZXNzaW9uLnJ1bihzZXNzaW9uLCByb3cuaWQsIERhdGUubm93KCkgKyA1ICogMzYwMCAqIDEwMDApO1xyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ2luV2l0aEtleShrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgcm93ID0gdGhpcy5zdGF0ZW1lbnRHZXRVc2VyQnlLZXkuZ2V0KGtleSk7XHJcbiAgICBpZiAocm93KSB7XHJcbiAgICAgIGxldCBzZXNzaW9uID0gdXVpZCgpO1xyXG4gICAgICB0aGlzLnN0YXRlbWVudEFkZFNlc3Npb24ucnVuKHNlc3Npb24sIHJvdy5pZCwgRGF0ZS5ub3coKSArIDUgKiAzNjAwICogMTAwMCk7XHJcbiAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkVXNlcih1c2VyTmFtZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHBhc3M6IHN0cmluZywgcm9sZTogUm9sZSkge1xyXG4gICAgdGhpcy5zdGF0ZW1lbnRBZGRVc2VyLnJ1bih1dWlkKCksIHVzZXJOYW1lLCBuYW1lLCByb2xlLCBzaGEyNTYocGFzcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZVVzZXJSb2xlKGlkOiBzdHJpbmcsIHJvbGU6IFJvbGUpIHtcclxuICAgIHRoaXMuc3RhdGVtZW50VXBkVXNlclJvbGUucnVuKHJvbGUsIGlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRQYXNzd29yZChpZDogc3RyaW5nLCBwYXNzOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc3RhdGVtZW50U2V0UGFzc3dvcmQucnVuKHNoYTI1NihwYXNzKSwgaWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlYXJjaChuYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlbWVudFNlYXJjaC5hbGwoJyUnICsgbmFtZSArICclJykubWFwKG0gPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGlkOiBtLmlkLFxyXG4gICAgICAgIG5hbWU6IG0ubmFtZVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkUHJvZ3Jlc3ModXNlcklkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nLCBwcm9ncmVzczogbnVtYmVyLCBub3RlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc3RhdGVtZW50QWRkUHJvZ3Jlc3MucnVuKHVzZXJJZCwgaXRlbUlkLCBwcm9ncmVzcywgbm90ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0UHJvZ3Jlc3ModXNlcklkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nLCBwcm9ncmVzczogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5nZXRVc2VyKHVzZXJJZCkgPT0gbnVsbCkgdGhyb3cgJ1VzZXIgZG9lcyBub3QgZXhpc3QnO1xyXG5cclxuICAgIGlmICh0aGlzLmdldFVzZXJJdGVtKHVzZXJJZCwgaXRlbUlkKSkge1xyXG4gICAgICB0aGlzLnN0YXRlbWVudFNldFByb2dyZXNzLnJ1bihwcm9ncmVzcywgdXNlcklkLCBpdGVtSWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hZGRQcm9ncmVzcyh1c2VySWQsIGl0ZW1JZCwgcHJvZ3Jlc3MsIG51bGwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE5vdGUodXNlcklkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAodGhpcy5nZXRVc2VyKHVzZXJJZCkgPT0gbnVsbCkgdGhyb3cgJ1VzZXIgZG9lcyBub3QgZXhpc3QnO1xyXG5cclxuICAgIGlmICh0aGlzLmdldFVzZXJJdGVtKHVzZXJJZCwgaXRlbUlkKSkge1xyXG4gICAgICB0aGlzLnN0YXRlbWVudFNldE5vdGUucnVuKHZhbHVlLCB1c2VySWQsIGl0ZW1JZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFkZFByb2dyZXNzKHVzZXJJZCwgaXRlbUlkLCBudWxsLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VXNlckl0ZW0odXNlcklkOiBzdHJpbmcsIGl0ZW1JZDogc3RyaW5nKTogSVVzZXJJdGVtW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGVtZW50R2V0VXNlckl0ZW0uZ2V0KHVzZXJJZCwgaXRlbUlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRVc2VySXRlbXModXNlcklkOiBzdHJpbmcpOiBJVXNlckl0ZW1bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZW1lbnRHZXRVc2VySXRlbXMuYWxsKHVzZXJJZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0RGVzY3JpcHRpb24oaXRlbUlkOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc3RhdGVtZW50U2V0RGVzY3JpcHRpb24ucnVuKHZhbHVlLCBpdGVtSWQpO1xyXG4gIH1cclxuXHJcbn0iLCJleHBvcnQgZW51bSBSb2xlIHtcclxuICBVc2VyID0gMCxcclxuICBFbGV2YXRlZCA9IDUxMixcclxuICBBZG1pbmlzdHJhdG9yID0gMTAyNFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVXNlciB7XHJcbiAgcHVibGljIGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIHVzZXJOYW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgcm9sZTogUm9sZTtcclxuXHJcbiAgY29uc3RydWN0b3IoYmFzZT86IFVzZXIpIHtcclxuICAgIGlmIChiYXNlKSB7XHJcbiAgICAgIHRoaXMuaWQgPSBiYXNlLmlkO1xyXG4gICAgICB0aGlzLnVzZXJOYW1lID0gYmFzZS51c2VyTmFtZTtcclxuICAgICAgdGhpcy5uYW1lID0gYmFzZS5uYW1lO1xyXG4gICAgICB0aGlzLnJvbGUgPSBiYXNlLnJvbGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJldHRlci1zcWxpdGUzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyeXB0b1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlcnJvcmhhbmRsZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLXVybHJld3JpdGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWV0aG9kLW92ZXJyaWRlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vcmdhblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLW9iamVjdC1oYXNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2hhMjU2XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV0aWxcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==