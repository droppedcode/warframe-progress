
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

/***/ "./src/data/ItemType.ts":
/*!******************************!*\
  !*** ./src/data/ItemType.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ItemType;
(function (ItemType) {
    ItemType[ItemType["Unknown"] = 0] = "Unknown";
    ItemType[ItemType["Primary"] = 1] = "Primary";
    ItemType[ItemType["Secondary"] = 2] = "Secondary";
    ItemType[ItemType["Melee"] = 3] = "Melee";
    ItemType[ItemType["Warframe"] = 4] = "Warframe";
    ItemType[ItemType["Archwing"] = 5] = "Archwing";
    ItemType[ItemType["ArchGun"] = 6] = "ArchGun";
    ItemType[ItemType["ArchMelee"] = 7] = "ArchMelee";
    ItemType[ItemType["Sentinel"] = 8] = "Sentinel";
    ItemType[ItemType["Companion"] = 9] = "Companion";
    ItemType[ItemType["Amp"] = 10] = "Amp";
    ItemType[ItemType["ZawStrike"] = 11] = "ZawStrike";
    ItemType[ItemType["ZawGrip"] = 12] = "ZawGrip";
    ItemType[ItemType["ZawLink"] = 13] = "ZawLink";
    ItemType[ItemType["SentinelWeapon"] = 14] = "SentinelWeapon";
})(ItemType = exports.ItemType || (exports.ItemType = {}));


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
        let collector = new collector_1.Collector(this.context);
        collector.collect();
        setInterval(() => {
            collector.collect();
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
const axios_1 = __webpack_require__(/*! axios */ "axios");
const cheerio = __webpack_require__(/*! cheerio */ "cheerio");
const ItemType_1 = __webpack_require__(/*! ../data/ItemType */ "./src/data/ItemType.ts");
class Collector {
    constructor(context) {
        this.context = context;
    }
    async get(url) {
        try {
            let response = await axios_1.default.get(url);
            return cheerio.load(response.data);
        }
        catch (err) {
            console.error(err);
        }
    }
    async collect() {
        await this.weapon();
        await this.zaw();
        await this.warframe();
        await this.archwing();
        await this.sentinel();
        await this.companions();
        await this.relic();
        await this.version();
        console.log('Collector finished.');
    }
    getType(value) {
        switch (value.trim().toLowerCase()) {
            case 'primary':
                return ItemType_1.ItemType.Primary;
            case 'secondary':
                return ItemType_1.ItemType.Secondary;
            case 'melee':
                return ItemType_1.ItemType.Melee;
            case 'warframe':
                return ItemType_1.ItemType.Warframe;
            case 'archwing':
                return ItemType_1.ItemType.Archwing;
            case 'aw primary':
                return ItemType_1.ItemType.ArchGun;
            case 'aw melee':
                return ItemType_1.ItemType.ArchMelee;
            case 'sentinel':
                return ItemType_1.ItemType.SentinelWeapon;
            case 'companion':
                return ItemType_1.ItemType.Companion;
            case 'amp':
                return ItemType_1.ItemType.Amp;
            case 'strike':
                return ItemType_1.ItemType.ZawStrike;
            case 'grip':
                return ItemType_1.ItemType.ZawGrip;
            case 'link':
                return ItemType_1.ItemType.ZawLink;
            default:
                return undefined;
        }
    }
    async weapon() {
        let $ = await this.get('http://warframe.wikia.com/wiki/Weapon_Comparison');
        let mainTypes = $('.mw-content-text > .tabbertab-borderless > .tabber > .tabbertab');
        mainTypes.each((index, mainType) => {
            let type = this.getType($(mainType).attr('title'));
            let subTypes = $(mainType).find('table');
            subTypes.each((index2, subType) => {
                if (index2 === 0) {
                    let last;
                    $(subType).find('tbody tr').each((index3, row) => {
                        $(row).find('td').each((index4, cell) => {
                            if (index4 === 0) {
                                let text = $(cell).text();
                                let index = text.indexOf(' (');
                                if (index > -1) {
                                    text = text.substr(0, index);
                                }
                                text = text.replace(/\//g, ' ').replace(/  /g, ' ').trim();
                                if (last != text) {
                                    last = text;
                                    if (!this.context.getItem(text, type)) {
                                        this.context.addItem(text, type, null, null, null, 2, 0);
                                    }
                                }
                            }
                        });
                    });
                }
            });
        });
    }
    async zaw() {
        let $ = await this.get('http://warframe.wikia.com/wiki/Zaw');
        let mainTypes = $('table.navbox tr');
        mainTypes.each((index, mainType) => {
            if (index === 0)
                return;
            if ($(mainType).find('tr').first().text().replace(/\//g, ' ').replace(/  /g, ' ').trim() != 'Zaw Components')
                return;
            let typeText = $(mainType).find('td').first().text().replace(/\//g, ' ').replace(/  /g, ' ').trim();
            let type = this.getType(typeText);
            $(mainType).find('a').each((index2, a) => {
                let text = $(a).text().trim();
                if (!this.context.getItem(text, type)) {
                    this.context.addItem(text, type, null, null, null, 2, 0);
                }
            });
        });
    }
    async warframe() {
        let $ = await this.get('http://warframe.wikia.com/wiki/Warframes');
        let frames = $('div.tabbertab[title="All"] tbody tr');
        frames.each((index, frame) => {
            if (index === 0)
                return;
            let text = $(frame).find('td').first().text().replace(/\//g, ' ').replace(/  /g, ' ').trim();
            if (!this.context.getItem(text, ItemType_1.ItemType.Warframe)) {
                let id = this.context.addItem(text, ItemType_1.ItemType.Warframe, null, null, null, 2, 0);
                if (text.indexOf('Prime') === -1) {
                    this.context.addItem(text + ' Blueprint', ItemType_1.ItemType.Warframe, id, null, null, 1, 0);
                    this.context.addItem(text + ' Chassis Blueprint', ItemType_1.ItemType.Warframe, id, null, null, 1, 0);
                    this.context.addItem(text + ' Neuroptics Blueprint', ItemType_1.ItemType.Warframe, id, null, null, 1, 0);
                    this.context.addItem(text + ' Systems Blueprint', ItemType_1.ItemType.Warframe, id, null, null, 1, 0);
                }
                else {
                    this.context.addItem(text + ' Blueprint', ItemType_1.ItemType.Warframe, id, null, null, 1, 0);
                    this.context.addItem(text + ' Chassis Blueprint', ItemType_1.ItemType.Warframe, id, null, null, 1, 0);
                    this.context.addItem(text + ' Neuroptics Blueprint', ItemType_1.ItemType.Warframe, id, null, null, 1, 0);
                    this.context.addItem(text + ' Systems Blueprint', ItemType_1.ItemType.Warframe, id, null, null, 1, 0);
                }
            }
        });
    }
    async archwing() {
        let $ = await this.get('http://warframe.wikia.com/wiki/Archwing');
        let items = $('.navbox').first().find('a');
        items.each((index, item) => {
            let text = $(item).attr('title').replace(/\//g, ' ').replace(/  /g, ' ').trim();
            if (!this.context.getItem(text, ItemType_1.ItemType.Archwing)) {
                let id = this.context.addItem(text, ItemType_1.ItemType.Archwing, null, null, null, 2, 0);
                this.context.addItem(text + ' Blueprint', ItemType_1.ItemType.Archwing, id, null, null, 1, 0);
                this.context.addItem(text + ' Harness', ItemType_1.ItemType.Archwing, id, null, null, 1, 0);
                this.context.addItem(text + ' Systems', ItemType_1.ItemType.Archwing, id, null, null, 1, 0);
                this.context.addItem(text + ' Wings', ItemType_1.ItemType.Archwing, id, null, null, 1, 0);
            }
        });
    }
    async sentinel() {
        let $ = await this.get('http://warframe.wikia.com/wiki/Sentinels');
        let items = $('table.sortable').first().find('tbody tr');
        items.each((index, item) => {
            if (index == 0)
                return;
            let text = $(item).find('td').first().find('a').attr('title').replace(/\//g, ' ').replace(/  /g, ' ').trim();
            if (!this.context.getItem(text, ItemType_1.ItemType.Sentinel)) {
                let id = this.context.addItem(text, ItemType_1.ItemType.Sentinel, null, null, null, 2, 0);
                if ((/prime/i).test(text)) {
                    this.context.addItem(text + ' Blueprint', ItemType_1.ItemType.Sentinel, id, null, null, 1, 0);
                    this.context.addItem(text + ' Carapace', ItemType_1.ItemType.Sentinel, id, null, null, 1, 0);
                    this.context.addItem(text + ' Cerebrum', ItemType_1.ItemType.Sentinel, id, null, null, 1, 0);
                    this.context.addItem(text + ' Systems', ItemType_1.ItemType.Sentinel, id, null, null, 1, 0);
                }
            }
        });
    }
    async companions() {
        let $ = await this.get('http://warframe.wikia.com/wiki/Companions');
        let items = $('.navbox tr');
        items.each((index, item) => {
            if (index == 4 || index == 6) {
                $(item).find('a').each((index2, item2) => {
                    let text = $(item2).attr('title').replace(/\//g, ' ').replace(/  /g, ' ').trim();
                    if (!this.context.getItem(text, ItemType_1.ItemType.Companion)) {
                        this.context.addItem(text, ItemType_1.ItemType.Companion, null, null, null, 2, 0);
                    }
                });
            }
        });
    }
    async relic() {
        let $ = await this.get('http://warframe.wikia.com/wiki/Relic');
        let items = $('[title="By rewards (simple table)"] table tbody tr');
        let rows = items.map((index, item) => {
            let values = $(item).find('td').get();
            if (values.length === 0)
                return;
            let itemName = $(values[0]).text().replace(/\//g, ' ').replace(/  /g, ' ').trim();
            let itemPart = $(values[1]).text().replace(/\//g, ' ').replace(/  /g, ' ').trim();
            let relicTier = $(values[2]).text().replace(/\//g, ' ').replace(/  /g, ' ').trim();
            let relicName = $(values[3]).text().replace(/\//g, ' ').replace(/  /g, ' ').trim();
            let rarity = $(values[4]).text().replace(/\//g, ' ').replace(/  /g, ' ').trim();
            let vaulted = $(values[5]).text().replace(/\//g, ' ').replace(/  /g, ' ').trim();
            let itemFullName = itemName + ' ' + itemPart;
            let location = relicTier + ' ' + relicName + ' ' + rarity;
            if (vaulted.toLowerCase() == 'yes') {
                location += ' (V)';
            }
            return {
                name: itemFullName,
                owner: itemName,
                location: location
            };
        }).get();
        rows = rows.sort((a, b) => a.name.localeCompare(b.name));
        let prevItem = rows[0];
        for (let i = 1; i < rows.length; ++i) {
            let item = rows[i];
            //New item commit the locations
            if (prevItem.name != item.name) {
                this.setLocation(prevItem);
            }
            else {
                item.location = prevItem.location + '\n' + item.location;
            }
            prevItem = item;
        }
        //Commit the last item
        this.setLocation(prevItem);
    }
    setLocation(item) {
        let dbItem = this.context.getItemByName(item.name);
        if (dbItem) {
            //We have the item
            this.context.setLocation(dbItem.id, item.location);
        }
        else {
            //We don't have the item
            let ownerItem = this.context.getItemByName(item.owner);
            if (ownerItem) {
                this.context.addItem(item.name, ownerItem.type, ownerItem.id, null, item.location, 1, 0);
            }
            else {
                console.warn('Missing item: ' + item.owner);
            }
        }
    }
    async version() {
        let items = this.context.getItems();
        let currentItems = items.filter(f => f.ownerItemId === null && f.version < 1);
        items = items.filter(f => f.ownerItemId !== null);
        if (items.length > 0) {
            await this.versionUpdate(currentItems, items);
        }
    }
    async versionUpdate(currentItems, items) {
        for (let item of currentItems) {
            let $ = await this.get('http://warframe.wikia.com/wiki/' + item.name.replace(/ /g, '_'));
            let rows = $('.foundrytable > tbody > tr');
            let research = rows.find('a[title="Research"]');
            if (research.length > 0) {
                this.context.setDescription(item.id, research.first().text());
            }
            else if ((/prime/i).test(item.name)) {
                let components = rows.last().find('table tr').map((i, m) => {
                    return $(m).find('td')[0].childNodes.find(f => f.type === 'text').nodeValue.replace(/  /g, ' ').trim();
                }).get();
                rows.slice(1, 2).find('td').each((i, m) => {
                    let component = $(m).find('a').attr('title');
                    if (components.indexOf(component) > -1) {
                        let count = parseInt(m.childNodes[m.childNodes.length - 1].nodeValue.trim()) || 1;
                        let subItem = items.find(f => f.name === item.name + ' ' + component || f.name === item.name + ' ' + component + ' Blueprint' || f.name + ' Blueprint' === item.name + ' ' + component);
                        if (subItem) {
                            this.context.setMaxProgress(subItem.id, count);
                        }
                        else {
                            console.log('Missing part: ' + item.name + ' ' + component);
                        }
                    }
                });
            }
            this.context.setItemVersion(item.id, 1);
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
const ItemType_1 = __webpack_require__(/*! ../data/ItemType */ "./src/data/ItemType.ts");
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
            db.prepare('CREATE TABLE IF NOT EXISTS Item (id TEXT PRIMARY KEY, name TEXT, type INTEGER, ownerItemId TEXT, description TEXT, FOREIGN KEY(ownerItemId) REFERENCES Item(id));').run();
            db.prepare('CREATE TABLE IF NOT EXISTS Progress (userId TEXT, itemId TEXT, progress INTEGER, note TEXT, PRIMARY KEY (userId, itemId), FOREIGN KEY(userId) REFERENCES User(id), FOREIGN KEY(itemId) REFERENCES Item(id));').run();
            this.statementAddUser.run(uuid(), 'B', 'Balázs', user_1.Role.Administrator, sha256(''), null);
            this.statementAddUser.run(uuid(), 'J', 'Judit', user_1.Role.User, sha256(''), null);
        }
        else {
            this.statementAddVersion = db.prepare('INSERT INTO Version VALUES(?)');
            this.statementAddUser = db.prepare('INSERT INTO User VALUES(?, ?, ?, ?, ?, ?)');
        }
        this.statementGetVersion = db.prepare('SELECT max(id) as id FROM Version;');
        if (this.version < 1) {
            db.prepare('ALTER TABLE Item ADD COLUMN location TEXT;').run();
            this.statementAddVersion.run(1);
        }
        if (this.version < 2) {
            db.prepare('ALTER TABLE Item ADD COLUMN maxProgress INTEGER;').run();
            db.prepare('ALTER TABLE Item ADD COLUMN version INTEGER;').run();
            db.prepare('UPDATE Item SET maxProgress = 2 WHERE ownerItemId is NULL').run();
            db.prepare('UPDATE Item SET maxProgress = 1 WHERE ownerItemId is NOT NULL').run();
            db.prepare('UPDATE Item SET version = 0').run();
            this.statementAddVersion.run(2);
        }
        this.statementGetUser = db.prepare('SELECT * FROM User where id = ?;');
        this.statementGetUserByUserName = db.prepare('SELECT * FROM User where userName = ?;');
        this.statementGetUserByKey = db.prepare('SELECT * FROM User where key = ?;');
        this.statementUpdUserRole = db.prepare('UPDATE User SET role = ? WHERE id = ?');
        this.statementAddSession = db.prepare('INSERT INTO Session VALUES(?, ?, ?)');
        this.statementGetSession = db.prepare('SELECT * FROM Session WHERE id = ?');
        this.statementSetPassword = db.prepare('UPDATE User SET password = ? WHERE id = ?');
        this.statementSearch = db.prepare('SELECT * FROM User WHERE name LIKE ?');
        this.statementAddItem = db.prepare('INSERT INTO Item VALUES(?, ?, ?, ?, ?, ?, ?, ?)');
        this.statementAddProgress = db.prepare('INSERT INTO Progress VALUES(?, ?, ?, ?)');
        this.statementSetProgress = db.prepare('UPDATE Progress SET progress = ? WHERE userId = ? AND itemId = ?');
        this.statementSetNote = db.prepare('UPDATE Progress SET note = ? WHERE userId = ? AND itemId = ?');
        this.statementSetDescription = db.prepare('UPDATE Item SET description = ? WHERE id = ?');
        this.statementSetLocation = db.prepare('UPDATE Item SET location = ? WHERE id = ?');
        this.statementSetMaxProgress = db.prepare('UPDATE Item SET maxProgress = ? WHERE id = ?');
        this.statementSetItemVersion = db.prepare('UPDATE Item SET version = ? WHERE id = ?');
        this.statementGetItem = db.prepare('SELECT * FROM Item WHERE name = ? collate nocase AND Type = ?');
        this.statementGetItemByName = db.prepare('SELECT * FROM Item WHERE name = ? collate nocase');
        this.statementGetItemById = db.prepare('SELECT * FROM Item WHERE id = ?');
        this.statementGetUserItem = db.prepare('SELECT i.id, i.name, i.type, i.ownerItemId, i.description, i.location, i.maxProgress, i.version, p.progress, p.note FROM Item i INNER JOIN Progress p ON i.id = p.itemId AND p.userId = ? where i.id = ?');
        this.statementGetUserItems = db.prepare('SELECT i.id, i.name, i.type, i.ownerItemId, i.description, i.location, i.maxProgress, i.version, p.progress, p.note FROM Item i LEFT JOIN Progress p ON i.id = p.itemId AND p.userId = ?');
        this.statementGetItems = db.prepare('SELECT * FROM Item');
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
    addItem(name, type, ownerItemId, description, location, maxProgress, version) {
        console.log('Add item: ' + name + ' (' + ItemType_1.ItemType[type] + ')');
        let id = uuid();
        this.statementAddItem.run(id, name, type, ownerItemId, description, location, maxProgress, version);
        return id;
    }
    addProgress(userId, itemId, progress, note) {
        this.statementAddProgress.run(userId, itemId, progress, note);
    }
    setProgress(userId, itemId, progress) {
        if (this.getUser(userId) == null)
            throw 'User does not exist';
        if (this.getItemById(itemId) == null)
            throw 'Item does not exist';
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
        if (this.getItemById(itemId) == null)
            throw 'Item does not exist';
        if (this.getUserItem(userId, itemId)) {
            this.statementSetNote.run(value, userId, itemId);
        }
        else {
            this.addProgress(userId, itemId, null, value);
        }
    }
    getItem(name, type) {
        return this.statementGetItem.get(name, type);
    }
    getItemByName(name) {
        return this.statementGetItemByName.get(name);
    }
    getItemById(id) {
        return this.statementGetItemById.get(id);
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
    setLocation(itemId, value) {
        this.statementSetLocation.run(value, itemId);
    }
    setMaxProgress(itemId, value) {
        this.statementSetMaxProgress.run(value, itemId);
    }
    setItemVersion(itemId, value) {
        this.statementSetItemVersion.run(value, itemId);
    }
    getItems() {
        return this.statementGetItems.all();
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

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

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

/***/ "cheerio":
/*!**************************!*\
  !*** external "cheerio" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cheerio");

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGEvSXRlbVR5cGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb2xsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9zZXJ2ZXIuY29udGV4dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3VzZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiZXR0ZXItc3FsaXRlM1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hlZXJpb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXJyb3JoYW5kbGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3MtdXJscmV3cml0ZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWV0aG9kLW92ZXJyaWRlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9yZ2FuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNoYTI1NlwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQzVCQSxJQUFZLFFBaUJYO0FBakJELFdBQVksUUFBUTtJQUVsQiw2Q0FBVztJQUNYLDZDQUFXO0lBQ1gsaURBQWE7SUFDYix5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QUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3pHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNULElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3hDLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM3QyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQ3RDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFFbEYsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLFlBQVksSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLFlBQVksS0FBSyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQzt3QkFFeEwsSUFBSSxPQUFPLEVBQUU7NEJBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQzt5QkFDaEQ7NkJBQU07NEJBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQzt5QkFDN0Q7cUJBQ0Y7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUVELElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0NBRUY7QUF4VEQsOEJBd1RDOzs7Ozs7Ozs7Ozs7Ozs7QUM5VEQsK0NBQXlCO0FBQ3pCLDZFQUEyQztBQUMzQyx5RUFBb0M7QUFDcEMsNkVBQWdDO0FBQ2hDLDJEQUFpQztBQUVqQyxxREFBNkI7QUFDN0IseUZBQTRDO0FBRzVDO0lBOEJFO1FBQ0UsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksRUFBRSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRWxFLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztZQUUvQixFQUFFLENBQUMsT0FBTyxDQUFDLDhEQUE4RCxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDakYsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsK0JBQStCLENBQUM7WUFDdEUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxFQUFFLENBQUMsT0FBTyxDQUFDLCtKQUErSixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDbEwsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsMkNBQTJDLENBQUM7WUFDL0UsRUFBRSxDQUFDLE9BQU8sQ0FBQyxtSUFBbUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRXRKLEVBQUUsQ0FBQyxPQUFPLENBQUMsbUtBQW1LLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN0TCxFQUFFLENBQUMsT0FBTyxDQUFDLDhNQUE4TSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFak8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFdBQUksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3ZGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxXQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5RTthQUNJO1lBQ0gsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsK0JBQStCLENBQUM7WUFDdEUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsMkNBQTJDLENBQUMsQ0FBQztTQUNqRjtRQUVELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFFNUUsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRTtZQUNwQixFQUFFLENBQUMsT0FBTyxDQUFDLDRDQUE0QyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFL0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUU7WUFDcEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxrREFBa0QsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3JFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOENBQThDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVqRSxFQUFFLENBQUMsT0FBTyxDQUFDLDJEQUEyRCxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDOUUsRUFBRSxDQUFDLE9BQU8sQ0FBQywrREFBK0QsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2xGLEVBQUUsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVoRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsMEJBQTBCLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUVoRixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFFNUUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsMkNBQTJDLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUUxRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0VBQWtFLENBQUMsQ0FBQztRQUMzRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1FBQ25HLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsMkNBQTJDLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFFdEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsK0RBQStELENBQUMsQ0FBQztRQUNwRyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1FBQzdGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsME1BQTBNLENBQUMsQ0FBQztRQUNuUCxJQUFJLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQywwTEFBMEwsQ0FBQyxDQUFDO1FBQ3BPLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRU0sT0FBTyxDQUFDLEVBQVU7UUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxXQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNwQyxDQUFDO0lBRU0saUJBQWlCLENBQUMsRUFBVTtRQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUFFTSxRQUFRLENBQUMsT0FBZTtRQUM3QixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ25ELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxLQUFLLENBQUMsUUFBZ0IsRUFBRSxJQUFZO1FBQ3pDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEQsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztZQUM1RSxPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLFlBQVksQ0FBQyxHQUFXO1FBQzdCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQzVFLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sT0FBTyxDQUFDLFFBQWdCLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFVO1FBQ3JFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVNLGNBQWMsQ0FBQyxFQUFVLEVBQUUsSUFBVTtRQUMxQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sV0FBVyxDQUFDLEVBQVUsRUFBRSxJQUFZO1FBQ3pDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSxNQUFNLENBQUMsSUFBWTtRQUN4QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3hELE9BQU87Z0JBQ0wsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUNSLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTthQUNiLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxPQUFPLENBQUMsSUFBWSxFQUFFLElBQWMsRUFBRSxXQUFtQixFQUFFLFdBQW1CLEVBQUUsUUFBZ0IsRUFBRSxXQUFtQixFQUFFLE9BQWU7UUFDM0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxtQkFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRS9ELElBQUksRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BHLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVNLFdBQVcsQ0FBQyxNQUFjLEVBQUUsTUFBYyxFQUFFLFFBQWdCLEVBQUUsSUFBWTtRQUMvRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTSxXQUFXLENBQUMsTUFBYyxFQUFFLE1BQWMsRUFBRSxRQUFnQjtRQUNqRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSTtZQUFFLE1BQU0scUJBQXFCLENBQUM7UUFDOUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUk7WUFBRSxNQUFNLHFCQUFxQixDQUFDO1FBRWxFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3pEO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQztJQUVNLE9BQU8sQ0FBQyxNQUFjLEVBQUUsTUFBYyxFQUFFLEtBQWE7UUFDMUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUk7WUFBRSxNQUFNLHFCQUFxQixDQUFDO1FBQzlELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJO1lBQUUsTUFBTSxxQkFBcUIsQ0FBQztRQUVsRSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7SUFFTSxPQUFPLENBQUMsSUFBWSxFQUFFLElBQWM7UUFDekMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sYUFBYSxDQUFDLElBQVk7UUFDL0IsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSxXQUFXLENBQUMsRUFBVTtRQUMzQixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLFdBQVcsQ0FBQyxNQUFjLEVBQUUsTUFBYztRQUMvQyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFTSxZQUFZLENBQUMsTUFBYztRQUNoQyxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLGNBQWMsQ0FBQyxNQUFjLEVBQUUsS0FBYTtRQUNqRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU0sV0FBVyxDQUFDLE1BQWMsRUFBRSxLQUFhO1FBQzlDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSxjQUFjLENBQUMsTUFBYyxFQUFFLEtBQWE7UUFDakQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLGNBQWMsQ0FBQyxNQUFjLEVBQUUsS0FBYTtRQUNqRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FFRjtBQS9PRCxzQ0ErT0M7Ozs7Ozs7Ozs7Ozs7OztBQ3pQRCxJQUFZLElBSVg7QUFKRCxXQUFZLElBQUk7SUFDZCwrQkFBUTtJQUNSLHlDQUFjO0lBQ2Qsb0RBQW9CO0FBQ3RCLENBQUMsRUFKVyxJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUFJZjtBQUVEO0lBTUUsWUFBWSxJQUFXO1FBQ3JCLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztDQUVGO0FBZkQsb0JBZUM7Ozs7Ozs7Ozs7OztBQ3JCRCxrQzs7Ozs7Ozs7Ozs7QUNBQSwyQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSwrQzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxtQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIHdhc20gbW9kdWxlc1xuIFx0dmFyIGluc3RhbGxlZFdhc21Nb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvYmplY3Qgd2l0aCBhbGwgY29tcGlsZWQgV2ViQXNzZW1ibHkuTW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy53ID0ge307XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9VdWlkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBidGggPSBieXRlVG9IZXg7XG4gIHJldHVybiBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnl0ZXNUb1V1aWQ7XG4iLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgSW4gbm9kZS5qc1xuLy8gdGhpcyBpcyBwcmV0dHkgc3RyYWlnaHQtZm9yd2FyZCAtIHdlIHVzZSB0aGUgY3J5cHRvIEFQSS5cblxudmFyIHJiID0gcmVxdWlyZSgnY3J5cHRvJykucmFuZG9tQnl0ZXM7XG5cbmZ1bmN0aW9uIHJuZygpIHtcbiAgcmV0dXJuIHJiKDE2KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBybmc7XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyArK2lpKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgYnl0ZXNUb1V1aWQocm5kcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjQ7XG4iLCJleHBvcnQgZW51bSBJdGVtVHlwZVxyXG57XHJcbiAgVW5rbm93biA9IDAsXHJcbiAgUHJpbWFyeSA9IDEsXHJcbiAgU2Vjb25kYXJ5ID0gMixcclxuICBNZWxlZSA9IDMsXHJcbiAgV2FyZnJhbWUgPSA0LFxyXG4gIEFyY2h3aW5nID0gNSxcclxuICBBcmNoR3VuID0gNixcclxuICBBcmNoTWVsZWUgPSA3LFxyXG4gIFNlbnRpbmVsID0gOCxcclxuICBDb21wYW5pb24gPSA5LFxyXG4gIEFtcCA9IDEwLFxyXG4gIFphd1N0cmlrZSA9IDExLFxyXG4gIFphd0dyaXAgPSAxMixcclxuICBaYXdMaW5rID0gMTMsXHJcbiAgU2VudGluZWxXZWFwb24gPSAxNFxyXG59IiwicHJvY2Vzcy5vbigndW5jYXVnaHRFeGNlcHRpb24nLCBmdW5jdGlvbiAoZXhjZXB0aW9uKSB7XHJcbiAgY29uc29sZS5sb2coZXhjZXB0aW9uKTsgLy8gdG8gc2VlIHlvdXIgZXhjZXB0aW9uIGRldGFpbHMgaW4gdGhlIGNvbnNvbGVcclxuICAvLyBpZiB5b3UgYXJlIG9uIHByb2R1Y3Rpb24sIG1heWJlIHlvdSBjYW4gc2VuZCB0aGUgZXhjZXB0aW9uIGRldGFpbHMgdG8geW91clxyXG4gIC8vIGVtYWlsIGFzIHdlbGwgP1xyXG59KTtcclxuXHJcbmltcG9ydCB7IGV4ZWNTeW5jIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XHJcblxyXG4vL2NvbnNvbGUubG9nKCdJbnN0YWxsaW5nIHBhY2thZ2VzLi4uJyk7XHJcblxyXG4vL2V4ZWNTeW5jKCducG0gaW5zdGFsbCAtLW9ubHk9cHJvZHVjdGlvbicsIHsgc3RkaW86ICdpbmhlcml0JyB9KTtcclxuXHJcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gJy4vc2VydmVyJztcclxuXHJcbmNvbnNvbGUubG9nKCdTdGFydGluZyBzZXJ2ZXIuLi4nKTtcclxuXHJcblNlcnZlci5ib290c3RyYXAoKTsiLCJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uLCBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5cclxuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcclxuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gXCJjb29raWUtcGFyc2VyXCI7XHJcbmltcG9ydCAqIGFzIGxvZ2dlciBmcm9tIFwibW9yZ2FuXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0ICogYXMgY29ycyBmcm9tIFwiY29yc1wiO1xyXG5cclxuaW1wb3J0IGZzID0gcmVxdWlyZShcImZzXCIpO1xyXG5pbXBvcnQgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG5pbXBvcnQgaHR0cHMgPSByZXF1aXJlKFwiaHR0cHNcIik7XHJcblxyXG5pbXBvcnQgeyBJbmNvbWluZ01lc3NhZ2UgfSBmcm9tIFwiaHR0cFwiO1xyXG5cclxuaW1wb3J0IGVycm9ySGFuZGxlciA9IHJlcXVpcmUoXCJlcnJvcmhhbmRsZXJcIik7XHJcbmltcG9ydCBtZXRob2RPdmVycmlkZSA9IHJlcXVpcmUoXCJtZXRob2Qtb3ZlcnJpZGVcIik7XHJcblxyXG5pbXBvcnQgeyBTZXJ2ZXJDb250ZXh0IH0gZnJvbSBcIi4vc2VydmVyL3NlcnZlci5jb250ZXh0XCI7XHJcbmltcG9ydCB7IFVzZXIsIFJvbGUgfSBmcm9tIFwiLi9zZXJ2ZXIvdXNlclwiO1xyXG5pbXBvcnQgeyBJQ29uZmlnIH0gZnJvbSBcIi4vc2VydmVyL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBDb2xsZWN0b3IgfSBmcm9tIFwiLi9zZXJ2ZXIvY29sbGVjdG9yXCI7XHJcblxyXG5pbXBvcnQgKiBhcyByZXdyaXRlIGZyb20gXCJleHByZXNzLXVybHJld3JpdGVcIjtcclxuXHJcbmNvbnN0IGNvb2tpZVNlY3JldCA9IFwiZWNmMzUzN2Y0YjE0NGUwZjhiNDc3YzNjNmE0OWRjM2NcIjtcclxuXHJcbmNvbnN0IGNvbmZpZyA9IDxJQ29uZmlnPihcclxuICBKU09OLnBhcnNlKFxyXG4gICAgZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiZGF0YVwiLCBcImNvbmZpZy5qc29uXCIpKS50b1N0cmluZygpXHJcbiAgKVxyXG4pO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBzZXJ2ZXIuXHJcbiAqXHJcbiAqIEBjbGFzcyBTZXJ2ZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2ZXIge1xyXG4gIHByaXZhdGUgc2VydmVyID0gdGhpcztcclxuXHJcbiAgcHVibGljIGNvbnRleHQ6IFNlcnZlckNvbnRleHQ7XHJcblxyXG4gIHB1YmxpYyBhcHA6IEFwcGxpY2F0aW9uO1xyXG5cclxuICAvKlxyXG4gIHByaXZhdGUgY2FsbHNQZXJTZWNvbmRzID0ge307XHJcbiAgcHJpdmF0ZSB3YXJuaW5ncyA9IHt9O1xyXG4gICovXHJcblxyXG4gIHByaXZhdGUgbG9nRmlsZSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKHBhdGguam9pbihfX2Rpcm5hbWUsIFwibG9nLnR4dFwiKSwge1xyXG4gICAgZmxhZ3M6IFwiYVwiXHJcbiAgfSk7XHJcblxyXG4gIHByaXZhdGUgbWFya2V0QXJjaGl2ZTogeyB0aW1lOiBudW1iZXI7IHZhbHVlOiBudW1iZXIgfVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEJvb3RzdHJhcCB0aGUgYXBwbGljYXRpb24uXHJcbiAgICpcclxuICAgKiBAY2xhc3MgU2VydmVyXHJcbiAgICogQG1ldGhvZCBib290c3RyYXBcclxuICAgKiBAc3RhdGljXHJcbiAgICogQHJldHVybiB7bmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlfSBSZXR1cm5zIHRoZSBuZXdseSBjcmVhdGVkIGluamVjdG9yIGZvciB0aGlzIGFwcC5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGJvb3RzdHJhcCgpOiBTZXJ2ZXIge1xyXG4gICAgcmV0dXJuIG5ldyBTZXJ2ZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdG9yLlxyXG4gICAqXHJcbiAgICogQGNsYXNzIFNlcnZlclxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5jb250ZXh0ID0gbmV3IFNlcnZlckNvbnRleHQoKTtcclxuXHJcbiAgICAvL2NyZWF0ZSBleHByZXNzanMgYXBwbGljYXRpb25cclxuICAgIHRoaXMuYXBwID0gZXhwcmVzcygpO1xyXG5cclxuICAgIC8vY29uZmlndXJlIGFwcGxpY2F0aW9uXHJcbiAgICB0aGlzLmNvbmZpZygpO1xyXG5cclxuICAgIC8vYWRkIGFwaVxyXG4gICAgdGhpcy5hcGkoKTtcclxuXHJcbiAgICBpZiAoY29uZmlnLnBvcnQpIHtcclxuICAgICAgbGV0IGh0dHBQb3J0ID0gY29uZmlnLnVzZUVudlBvcnRcclxuICAgICAgICA/IHByb2Nlc3MuZW52LlBPUlQgfHwgY29uZmlnLnBvcnRcclxuICAgICAgICA6IGNvbmZpZy5wb3J0O1xyXG5cclxuICAgICAgbGV0IGh0dHBTZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcigpO1xyXG5cclxuICAgICAgaHR0cFNlcnZlci5vbihcInJlcXVlc3RcIiwgdGhpcy5hcHApO1xyXG5cclxuICAgICAgaHR0cFNlcnZlci5saXN0ZW4oaHR0cFBvcnQpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJTZXJ2ZXIgc3RhcnRlZCBvbiBwb3J0IGh0dHA6Ly8rOlwiICsgaHR0cFBvcnQgKyBcIi5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvbmZpZy5zZWN1cmVQb3J0KSB7XHJcbiAgICAgIGxldCBodHRwc1BvcnQgPSBjb25maWcudXNlRW52UG9ydFxyXG4gICAgICAgID8gcHJvY2Vzcy5lbnYuUE9SVCB8fCBjb25maWcuc2VjdXJlUG9ydFxyXG4gICAgICAgIDogY29uZmlnLnNlY3VyZVBvcnQ7XHJcblxyXG4gICAgICBsZXQgcHJpdmF0ZUtleSA9IGZzLnJlYWRGaWxlU3luYyhcInNzbGNlcnQvaG9zdC5rZXlcIiwgXCJ1dGY4XCIpO1xyXG4gICAgICBsZXQgY2VydGlmaWNhdGUgPSBmcy5yZWFkRmlsZVN5bmMoXCJzc2xjZXJ0L2hvc3QuY3J0XCIsIFwidXRmOFwiKTtcclxuXHJcbiAgICAgIGxldCBjcmVkZW50aWFscyA9IHsga2V5OiBwcml2YXRlS2V5LCBjZXJ0OiBjZXJ0aWZpY2F0ZSB9O1xyXG5cclxuICAgICAgbGV0IGh0dHBzU2VydmVyID0gaHR0cHMuY3JlYXRlU2VydmVyKGNyZWRlbnRpYWxzKTtcclxuXHJcbiAgICAgIGh0dHBzU2VydmVyLm9uKFwicmVxdWVzdFwiLCB0aGlzLmFwcCk7XHJcblxyXG4gICAgICBodHRwc1NlcnZlci5saXN0ZW4oaHR0cHNQb3J0KTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VydmVyIHN0YXJ0ZWQgb24gcG9ydCBodHRwczovLys6XCIgKyBodHRwc1BvcnQgKyBcIi5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbGxlY3RvciA9IG5ldyBDb2xsZWN0b3IodGhpcy5jb250ZXh0KTtcclxuICAgIGNvbGxlY3Rvci5jb2xsZWN0KCk7XHJcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGNvbGxlY3Rvci5jb2xsZWN0KCk7XHJcbiAgICB9LCAxMDAwICogNjAgKiA2MCAqIDI0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbmZpZ3VyZSBhcHBsaWNhdGlvblxyXG4gICAqXHJcbiAgICogQGNsYXNzIFNlcnZlclxyXG4gICAqIEBtZXRob2QgY29uZmlnXHJcbiAgICovXHJcbiAgcHVibGljIGNvbmZpZygpIHtcclxuICAgIHRoaXMuYXBwLnVzZShlcnJvckhhbmRsZXIoeyBsb2c6IGZhbHNlIH0pKTtcclxuXHJcbiAgICB0aGlzLmFwcC51c2UoKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICAgIG5leHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vdXNlIGxvZ2dlciBtaWRkbHdhcmVcclxuICAgIHRoaXMuYXBwLnVzZShsb2dnZXIoXCJkZXZcIikpO1xyXG5cclxuICAgIHRoaXMuYXBwLnVzZShjb3JzKCkpO1xyXG5cclxuICAgIGlmIChjb25maWcudXJsUmV3cml0ZSkge1xyXG4gICAgICB0aGlzLmFwcC51c2UocmV3cml0ZShjb25maWcudXJsUmV3cml0ZS5mcm9tLCBjb25maWcudXJsUmV3cml0ZS50bykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vdXNlIGpzb24gZm9ybSBwYXJzZXIgbWlkZGx3YXJlXHJcbiAgICB0aGlzLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xyXG5cclxuICAgIC8vdXNlIHF1ZXJ5IHN0cmluZyBwYXJzZXIgbWlkZGx3YXJlXHJcbiAgICB0aGlzLmFwcC51c2UoXHJcbiAgICAgIGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7XHJcbiAgICAgICAgZXh0ZW5kZWQ6IHRydWVcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgLy91c2UgY29va2llIHBhcmtlciBtaWRkbGV3YXJlIG1pZGRsd2FyZVxyXG4gICAgdGhpcy5hcHAudXNlKGNvb2tpZVBhcnNlcihjb29raWVTZWNyZXQpKTtcclxuXHJcbiAgICAvL3VzZSBvdmVycmlkZSBtaWRkbHdhcmVcclxuICAgIHRoaXMuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcclxuXHJcbiAgICAvL2NhdGNoIDQwNCBhbmQgZm9yd2FyZCB0byBlcnJvciBoYW5kbGVyXHJcbiAgICB0aGlzLmFwcC51c2UoZnVuY3Rpb24oXHJcbiAgICAgIGVycjogYW55LFxyXG4gICAgICByZXE6IFJlcXVlc3QsXHJcbiAgICAgIHJlczogUmVzcG9uc2UsXHJcbiAgICAgIG5leHQ6IE5leHRGdW5jdGlvblxyXG4gICAgKSB7XHJcbiAgICAgIGVyci5zdGF0dXMgPSA0MDQ7XHJcbiAgICAgIG5leHQoZXJyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vZXJyb3IgaGFuZGxpbmdcclxuICAgIHRoaXMuYXBwLnVzZShlcnJvckhhbmRsZXIoKSk7XHJcblxyXG4gICAgLy9hZGQgc3RhdGljIHBhdGhzXHJcbiAgICB0aGlzLmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgY29uZmlnLnd3d3Jvb3QpKSk7XHJcblxyXG4gICAgdGhpcy5hcHAudXNlKChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgICBuZXh0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgdGhpcy5hcHAudXNlKChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgICB0aGlzLmNhbGxzUGVyU2Vjb25kc1tyZXEuaXBdID0gKHRoaXMuY2FsbHNQZXJTZWNvbmRzW3JlcS5pcF0gfHwgMCkgKyAxO1xyXG5cclxuICAgICAgaWYgKHRoaXMud2FybmluZ3NbcmVxLmlwXSA+IDMpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy53YXJuaW5nc1tyZXEuaXBdO1xyXG4gICAgICAgIHRoaXMuY2FsbHNQZXJTZWNvbmRzW3JlcS5pcF0gPSA1ICogNSAqIDYwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdCYW4gXCInICsgcmVxLmlwICsgJ1wiIGZvciA1IG1pbnMnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuY2FsbHNQZXJTZWNvbmRzW3JlcS5pcF0gPiA1KSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MjkpLmVuZCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbmV4dCgpO1xyXG4gICAgfSlcclxuICAgICovXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFNlc3Npb25Vc2VyKHJlcTogUmVxdWVzdCk6IFVzZXIge1xyXG4gICAgaWYgKHJlcVtcInVzZXJcIl0pIHtcclxuICAgICAgcmV0dXJuIHJlcVtcInVzZXJcIl07XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHNlc3Npb24gPSByZXEuY29va2llc1tcInNlc3Npb25cIl07XHJcbiAgICByZXR1cm4gc2Vzc2lvbiA/IChyZXFbXCJ1c2VyXCJdID0gdGhpcy5jb250ZXh0LmdldExvZ2luKHNlc3Npb24pKSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzQWRtaW5pc3RyYXRvcihyZXE6IFJlcXVlc3QpIHtcclxuICAgIGxldCBhcHBVc2VyID0gdGhpcy5nZXRTZXNzaW9uVXNlcihyZXEpO1xyXG4gICAgcmV0dXJuIGFwcFVzZXIgJiYgYXBwVXNlci5yb2xlID09PSBSb2xlLkFkbWluaXN0cmF0b3I7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzRWxldmF0ZWQocmVxOiBSZXF1ZXN0KSB7XHJcbiAgICBsZXQgYXBwVXNlciA9IHRoaXMuZ2V0U2Vzc2lvblVzZXIocmVxKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIGFwcFVzZXIgJiZcclxuICAgICAgKGFwcFVzZXIucm9sZSA9PT0gUm9sZS5BZG1pbmlzdHJhdG9yIHx8IGFwcFVzZXIucm9sZSA9PT0gUm9sZS5FbGV2YXRlZClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzTG9nZ2VkSW4ocmVxOiBSZXF1ZXN0KSB7XHJcbiAgICByZXR1cm4gISF0aGlzLmdldFNlc3Npb25Vc2VyKHJlcSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvZyhyZXE6IFJlcXVlc3QsIG1lc3NhZ2U6IHN0cmluZywgbG9nQm9keTogYm9vbGVhbikge1xyXG4gICAgbGV0IG1zZyA9IFwiXCI7XHJcblxyXG4gICAgbXNnICs9IERhdGUoKTtcclxuICAgIG1zZyArPSBcIlxcdFwiO1xyXG4gICAgbXNnICs9IHJlcS5wYXRoO1xyXG4gICAgbXNnICs9IFwiXFx0XCI7XHJcbiAgICBtc2cgKz0gdGhpcy5pc0xvZ2dlZEluKHJlcSkgPyB0aGlzLmdldFNlc3Npb25Vc2VyKHJlcSkuaWQgOiBcIltOT1RMT0dHRURJTl1cIjtcclxuICAgIG1zZyArPSBcIlxcdFwiO1xyXG4gICAgbXNnICs9IG1lc3NhZ2UgfHwgXCJbTk9NRVNTQUdFXVwiO1xyXG4gICAgaWYgKGxvZ0JvZHkpIHtcclxuICAgICAgbXNnICs9IFwiXFx0XCI7XHJcbiAgICAgIG1zZyArPSBKU09OLnN0cmluZ2lmeShyZXEuYm9keSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sb2dGaWxlLndyaXRlKG1zZyArIFwiXFxuXCIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIFJFU1QgQVBJIHJvdXRlc1xyXG4gICAqXHJcbiAgICogQGNsYXNzIFNlcnZlclxyXG4gICAqIEBtZXRob2QgYXBpXHJcbiAgICovXHJcbiAgcHVibGljIGFwaSgpIHtcclxuICAgIGxldCByb3V0ZXIgPSBSb3V0ZXIoKTtcclxuXHJcbiAgICByb3V0ZXIucm91dGUoXCIvdXNlcnNcIikucG9zdCgocmVxLCByZXMpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmlzQWRtaW5pc3RyYXRvcikge1xyXG4gICAgICAgIHRoaXMubG9nKHJlcSwgXCJOb3QgYW4gYWRtaW5pc3RyYXRvci5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDEpLmVuZCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcihyZXEuYm9keS51c2VyKTtcclxuICAgICAgbGV0IHBhc3MgPSA8c3RyaW5nPnJlcS5ib2R5LnBhc3M7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5hZGRVc2VyKHVzZXIuaWQsIHVzZXIubmFtZSwgcGFzcywgUm9sZS5Vc2VyKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2cocmVxLCBcIkFkZGVkIHVzZXI6IFwiICsgdXNlci5pZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIHJlcy5qc29uKHVzZXIuaWQpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICB0aGlzLmxvZyhyZXEsIFwiRXJyb3I6IFwiICsgSlNPTi5zdHJpbmdpZnkoZXJyLm1lc3NhZ2UgfHwgZXJyKSwgdHJ1ZSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDApO1xyXG4gICAgICAgIHJlcy5qc29uKGVycik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJvdXRlci5yb3V0ZShcIi91c2Vyc1wiKS5wdXQoKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5pc0xvZ2dlZEluKHJlcSkpIHtcclxuICAgICAgICB0aGlzLmxvZyhyZXEsIFwiTm90IGxvZ2dlZCBpbi5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDEpLmVuZCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHVzZXJJZCA9IHJlcS5ib2R5LnVzZXJJZDtcclxuICAgICAgbGV0IGFjdGlvbiA9IHJlcS5ib2R5LmFjdGlvbjtcclxuICAgICAgbGV0IHZhbHVlID0gcmVxLmJvZHkudmFsdWU7XHJcblxyXG4gICAgICBsZXQgdXNlciA9IHRoaXMuY29udGV4dC5nZXRVc2VyKHVzZXJJZCk7XHJcblxyXG4gICAgICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgICAgIGNhc2UgXCJwYXNzXCI6XHJcbiAgICAgICAgICBpZiAoIXRoaXMuaXNBZG1pbmlzdHJhdG9yKHJlcSkpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2cocmVxLCBcIk5vdCBhbiBhZG1pbmlzdHJhdG9yLlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5lbmQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuY29udGV4dC5zZXRQYXNzd29yZCh1c2VyLmlkLCB2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgdGhpcy5sb2cocmVxLCBcIkNoYW5nZWQgcGFzc3dvcmQuXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICByZXMuanNvbih0cnVlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjYXNlIFwicm9sZVwiOlxyXG4gICAgICAgICAgaWYgKCF0aGlzLmlzQWRtaW5pc3RyYXRvcihyZXEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKHJlcSwgXCJOb3QgYW4gYWRtaW5pc3RyYXRvci5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5lbmQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuY29udGV4dC51cGRhdGVVc2VyUm9sZSh1c2VyLmlkLCB2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgdGhpcy5sb2cocmVxLCBcIkNoYW5nZWQgcm9sZS5cIiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgcmVzLmpzb24odGhpcy5jb250ZXh0LmdldFVzZXIodXNlci5pZCkpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByb3V0ZXIucm91dGUoXCIvdXNlcnNcIikuZ2V0KChyZXEsIHJlcykgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuaXNFbGV2YXRlZChyZXEpKSB7XHJcbiAgICAgICAgdGhpcy5sb2cocmVxLCBcIk5vdCBhbiBlbGV2YXRlZCB1c2VyLlwiLCB0cnVlKTtcclxuICAgICAgICByZXMuc3RhdHVzKDQwMSkuZW5kKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXJlcS5xdWVyeS5zZWFyY2gpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwMCkuZW5kKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXMuanNvbih0aGlzLmNvbnRleHQuc2VhcmNoKHJlcS5xdWVyeS5zZWFyY2gpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJvdXRlci5yb3V0ZShcIi91c2Vycy86aWRcIikuZ2V0KChyZXEsIHJlcykgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuaXNMb2dnZWRJbihyZXEpKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDEpLmVuZCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHVzZXIgPSB0aGlzLmNvbnRleHQuZ2V0VXNlcihyZXEucGFyYW1zLmlkKTtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICByZXMuanNvbih1c2VyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwNCkuZW5kKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJvdXRlci5yb3V0ZShcIi9sb2dpblwiKS5wdXQoKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgIGxldCBzZXNzaW9uID0gdGhpcy5jb250ZXh0LmxvZ2luKHJlcS5ib2R5LmlkLCByZXEuYm9keS5wYXNzKTtcclxuICAgICAgaWYgKHNlc3Npb24pIHtcclxuICAgICAgICB0aGlzLmxvZyhcclxuICAgICAgICAgIHJlcSxcclxuICAgICAgICAgIFwiU3VjY2Vzc2Z1bCBsb2dpbjogXCIgKyByZXEuYm9keS5pZCArIFwiIFwiICsgc2Vzc2lvbixcclxuICAgICAgICAgIGZhbHNlXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmVzLmNvb2tpZShcInNlc3Npb25cIiwgc2Vzc2lvbik7XHJcbiAgICAgICAgcmVzLmpzb24odGhpcy5jb250ZXh0LmdldFVzZXJCeVVzZXJOYW1lKHJlcS5ib2R5LmlkKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2cocmVxLCBcIkZhaWxlZCBsb2dpbjogXCIgKyByZXEuYm9keS5pZCwgZmFsc2UpO1xyXG5cclxuICAgICAgICAvL3RoaXMud2FybmluZ3NbcmVxLmlwXSA9ICh0aGlzLndhcm5pbmdzW3JlcS5pcF0gfHwgMCkgKyAxO1xyXG4gICAgICAgIHJlcy5jbGVhckNvb2tpZShcInNlc3Npb25cIik7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDQpLmVuZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByb3V0ZXIucm91dGUoXCIvcmVsb2dpblwiKS5wdXQoKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgIGxldCB1c2VyID0gdGhpcy5jb250ZXh0LmdldExvZ2luKHJlcS5ib2R5LmlkKTtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICByZXMuanNvbih1c2VyKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2coXHJcbiAgICAgICAgICByZXEsXHJcbiAgICAgICAgICBcIlN1Y2Nlc3NmdWwgcmVsb2dpbjogXCIgKyB1c2VyLmlkICsgXCIgXCIgKyByZXEuYm9keS5pZCxcclxuICAgICAgICAgIGZhbHNlXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmxvZyhyZXEsIFwiRmFpbGVkIHJlbG9naW46IFwiICsgcmVxLmJvZHkuaWQsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgcmVzLmNsZWFyQ29va2llKFwic2Vzc2lvblwiKTtcclxuICAgICAgICByZXMuc3RhdHVzKDQwNCkuZW5kKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJvdXRlci5yb3V0ZShcIi9rZXkvOmtleVwiKS5nZXQoKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgIGxldCBzZXNzaW9uID0gdGhpcy5jb250ZXh0LmxvZ2luV2l0aEtleShyZXEucGFyYW1zLmtleSk7XHJcbiAgICAgIGlmIChzZXNzaW9uKSB7XHJcbiAgICAgICAgdGhpcy5sb2coXHJcbiAgICAgICAgICByZXEsXHJcbiAgICAgICAgICBcIlN1Y2Nlc3NmdWwga2V5IGxvZ2luOiBcIiArIHJlcS5wYXJhbXMua2V5ICsgXCIgXCIgKyBzZXNzaW9uLFxyXG4gICAgICAgICAgZmFsc2VcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXMuY29va2llKFwic2Vzc2lvblwiLCBzZXNzaW9uKTtcclxuICAgICAgICByZXMucmVkaXJlY3QoXCIvXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9nKHJlcSwgXCJGYWlsZWQgbG9naW46IFwiICsgcmVxLmJvZHkuaWQsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy90aGlzLndhcm5pbmdzW3JlcS5pcF0gPSAodGhpcy53YXJuaW5nc1tyZXEuaXBdIHx8IDApICsgMTtcclxuICAgICAgICByZXMuY2xlYXJDb29raWUoXCJzZXNzaW9uXCIpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDA0KS5lbmQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcm91dGVyLnJvdXRlKFwiL2l0ZW1cIikuZ2V0KChyZXEsIHJlcykgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuaXNMb2dnZWRJbihyZXEpKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDEpLmVuZCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmVzLmpzb24odGhpcy5jb250ZXh0LmdldFVzZXJJdGVtcyh0aGlzLmdldFNlc3Npb25Vc2VyKHJlcSkuaWQpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJvdXRlci5yb3V0ZShcIi9pdGVtL3Byb2dyZXNzXCIpLnB1dCgocmVxLCByZXMpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmlzTG9nZ2VkSW4ocmVxKSkge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAxKS5lbmQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldFByb2dyZXNzKFxyXG4gICAgICAgICAgdGhpcy5nZXRTZXNzaW9uVXNlcihyZXEpLmlkLFxyXG4gICAgICAgICAgcmVxLmJvZHkuaWQsXHJcbiAgICAgICAgICByZXEuYm9keS52YWx1ZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmVuZCgpO1xyXG4gICAgICB9IGNhdGNoIChleCkge1xyXG4gICAgICAgIHJlcy5zdGF0dXNNZXNzYWdlID0gZXgubWVzc2FnZSB8fCBleDtcclxuICAgICAgICByZXMuc3RhdHVzKDQwMCkuZW5kKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJvdXRlci5yb3V0ZShcIi9pdGVtL25vdGVcIikucHV0KChyZXEsIHJlcykgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuaXNMb2dnZWRJbihyZXEpKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDEpLmVuZCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc2V0Tm90ZShcclxuICAgICAgICAgIHRoaXMuZ2V0U2Vzc2lvblVzZXIocmVxKS5pZCxcclxuICAgICAgICAgIHJlcS5ib2R5LmlkLFxyXG4gICAgICAgICAgcmVxLmJvZHkudmFsdWVcclxuICAgICAgICApO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5lbmQoKTtcclxuICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwMCkuZW5kKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJvdXRlci5yb3V0ZShcIi9pdGVtL2Rlc2NyaXB0aW9uXCIpLnB1dCgocmVxLCByZXMpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmlzRWxldmF0ZWQocmVxKSkge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAxKS5lbmQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuY29udGV4dC5zZXREZXNjcmlwdGlvbihyZXEuYm9keS5pZCwgcmVxLmJvZHkudmFsdWUpO1xyXG5cclxuICAgICAgcmVzLnN0YXR1cygyMDApLmVuZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5hcHAudXNlKFwiL2FwaVwiLCByb3V0ZXIpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgKiBhcyBjaGVlcmlvIGZyb20gJ2NoZWVyaW8nO1xyXG5pbXBvcnQgeyBTZXJ2ZXJDb250ZXh0IH0gZnJvbSAnLi9zZXJ2ZXIuY29udGV4dCc7XHJcbmltcG9ydCB7IEl0ZW1UeXBlIH0gZnJvbSAnLi4vZGF0YS9JdGVtVHlwZSc7XHJcbmltcG9ydCB7IElVc2VySXRlbSB9IGZyb20gJy4uL2RhdGEvdXNlckl0ZW0nO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbGxlY3RvciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGV4dDogU2VydmVyQ29udGV4dCkgeyB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgZ2V0KHVybDogc3RyaW5nKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQodXJsKTtcclxuICAgICAgcmV0dXJuIGNoZWVyaW8ubG9hZChyZXNwb25zZS5kYXRhKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBjb2xsZWN0KCkge1xyXG4gICAgYXdhaXQgdGhpcy53ZWFwb24oKTtcclxuICAgIGF3YWl0IHRoaXMuemF3KCk7XHJcbiAgICBhd2FpdCB0aGlzLndhcmZyYW1lKCk7XHJcbiAgICBhd2FpdCB0aGlzLmFyY2h3aW5nKCk7XHJcbiAgICBhd2FpdCB0aGlzLnNlbnRpbmVsKCk7XHJcbiAgICBhd2FpdCB0aGlzLmNvbXBhbmlvbnMoKTtcclxuICAgIGF3YWl0IHRoaXMucmVsaWMoKTtcclxuICAgIGF3YWl0IHRoaXMudmVyc2lvbigpO1xyXG4gICAgY29uc29sZS5sb2coJ0NvbGxlY3RvciBmaW5pc2hlZC4nKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0VHlwZSh2YWx1ZTogc3RyaW5nKTogSXRlbVR5cGUge1xyXG4gICAgc3dpdGNoICh2YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICBjYXNlICdwcmltYXJ5JzpcclxuICAgICAgICByZXR1cm4gSXRlbVR5cGUuUHJpbWFyeTtcclxuICAgICAgY2FzZSAnc2Vjb25kYXJ5JzpcclxuICAgICAgICByZXR1cm4gSXRlbVR5cGUuU2Vjb25kYXJ5O1xyXG4gICAgICBjYXNlICdtZWxlZSc6XHJcbiAgICAgICAgcmV0dXJuIEl0ZW1UeXBlLk1lbGVlO1xyXG4gICAgICBjYXNlICd3YXJmcmFtZSc6XHJcbiAgICAgICAgcmV0dXJuIEl0ZW1UeXBlLldhcmZyYW1lO1xyXG4gICAgICBjYXNlICdhcmNod2luZyc6XHJcbiAgICAgICAgcmV0dXJuIEl0ZW1UeXBlLkFyY2h3aW5nO1xyXG4gICAgICBjYXNlICdhdyBwcmltYXJ5JzpcclxuICAgICAgICByZXR1cm4gSXRlbVR5cGUuQXJjaEd1bjtcclxuICAgICAgY2FzZSAnYXcgbWVsZWUnOlxyXG4gICAgICAgIHJldHVybiBJdGVtVHlwZS5BcmNoTWVsZWU7XHJcbiAgICAgIGNhc2UgJ3NlbnRpbmVsJzpcclxuICAgICAgICByZXR1cm4gSXRlbVR5cGUuU2VudGluZWxXZWFwb247XHJcbiAgICAgIGNhc2UgJ2NvbXBhbmlvbic6XHJcbiAgICAgICAgcmV0dXJuIEl0ZW1UeXBlLkNvbXBhbmlvbjtcclxuICAgICAgY2FzZSAnYW1wJzpcclxuICAgICAgICByZXR1cm4gSXRlbVR5cGUuQW1wO1xyXG4gICAgICBjYXNlICdzdHJpa2UnOlxyXG4gICAgICAgIHJldHVybiBJdGVtVHlwZS5aYXdTdHJpa2U7XHJcbiAgICAgIGNhc2UgJ2dyaXAnOlxyXG4gICAgICAgIHJldHVybiBJdGVtVHlwZS5aYXdHcmlwO1xyXG4gICAgICBjYXNlICdsaW5rJzpcclxuICAgICAgICByZXR1cm4gSXRlbVR5cGUuWmF3TGluaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyB3ZWFwb24oKSB7XHJcbiAgICBsZXQgJCA9IGF3YWl0IHRoaXMuZ2V0KCdodHRwOi8vd2FyZnJhbWUud2lraWEuY29tL3dpa2kvV2VhcG9uX0NvbXBhcmlzb24nKTtcclxuICAgIGxldCBtYWluVHlwZXMgPSAkKCcubXctY29udGVudC10ZXh0ID4gLnRhYmJlcnRhYi1ib3JkZXJsZXNzID4gLnRhYmJlciA+IC50YWJiZXJ0YWInKTtcclxuXHJcbiAgICBtYWluVHlwZXMuZWFjaCgoaW5kZXgsIG1haW5UeXBlKSA9PiB7XHJcbiAgICAgIGxldCB0eXBlID0gdGhpcy5nZXRUeXBlKCQobWFpblR5cGUpLmF0dHIoJ3RpdGxlJykpO1xyXG4gICAgICBsZXQgc3ViVHlwZXMgPSAkKG1haW5UeXBlKS5maW5kKCd0YWJsZScpO1xyXG5cclxuICAgICAgc3ViVHlwZXMuZWFjaCgoaW5kZXgyLCBzdWJUeXBlKSA9PiB7XHJcbiAgICAgICAgaWYgKGluZGV4MiA9PT0gMCkge1xyXG4gICAgICAgICAgbGV0IGxhc3Q7XHJcbiAgICAgICAgICAkKHN1YlR5cGUpLmZpbmQoJ3Rib2R5IHRyJykuZWFjaCgoaW5kZXgzLCByb3cpID0+IHtcclxuICAgICAgICAgICAgJChyb3cpLmZpbmQoJ3RkJykuZWFjaCgoaW5kZXg0LCBjZWxsKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKGluZGV4NCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHQgPSAkKGNlbGwpLnRleHQoKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRleHQuaW5kZXhPZignICgnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHIoMCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcLy9nLCAnICcpLnJlcGxhY2UoLyAgL2csICcgJykudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsYXN0ICE9IHRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgbGFzdCA9IHRleHQ7XHJcbiAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb250ZXh0LmdldEl0ZW0odGV4dCwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkSXRlbSh0ZXh0LCB0eXBlLCBudWxsLCBudWxsLCBudWxsLCAyLCAwKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIHphdygpIHtcclxuICAgIGxldCAkID0gYXdhaXQgdGhpcy5nZXQoJ2h0dHA6Ly93YXJmcmFtZS53aWtpYS5jb20vd2lraS9aYXcnKTtcclxuICAgIGxldCBtYWluVHlwZXMgPSAkKCd0YWJsZS5uYXZib3ggdHInKTtcclxuXHJcbiAgICBtYWluVHlwZXMuZWFjaCgoaW5kZXgsIG1haW5UeXBlKSA9PiB7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgICBpZiAoJChtYWluVHlwZSkuZmluZCgndHInKS5maXJzdCgpLnRleHQoKS5yZXBsYWNlKC9cXC8vZywgJyAnKS5yZXBsYWNlKC8gIC9nLCAnICcpLnRyaW0oKSAhPSAnWmF3IENvbXBvbmVudHMnKSByZXR1cm47XHJcblxyXG4gICAgICBsZXQgdHlwZVRleHQgPSAkKG1haW5UeXBlKS5maW5kKCd0ZCcpLmZpcnN0KCkudGV4dCgpLnJlcGxhY2UoL1xcLy9nLCAnICcpLnJlcGxhY2UoLyAgL2csICcgJykudHJpbSgpO1xyXG4gICAgICBsZXQgdHlwZSA9IHRoaXMuZ2V0VHlwZSh0eXBlVGV4dCk7XHJcbiAgICAgICQobWFpblR5cGUpLmZpbmQoJ2EnKS5lYWNoKChpbmRleDIsIGEpID0+IHtcclxuICAgICAgICBsZXQgdGV4dCA9ICQoYSkudGV4dCgpLnRyaW0oKTtcclxuICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5nZXRJdGVtKHRleHQsIHR5cGUpKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkSXRlbSh0ZXh0LCB0eXBlLCBudWxsLCBudWxsLCBudWxsLCAyLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyB3YXJmcmFtZSgpIHtcclxuICAgIGxldCAkID0gYXdhaXQgdGhpcy5nZXQoJ2h0dHA6Ly93YXJmcmFtZS53aWtpYS5jb20vd2lraS9XYXJmcmFtZXMnKTtcclxuICAgIGxldCBmcmFtZXMgPSAkKCdkaXYudGFiYmVydGFiW3RpdGxlPVwiQWxsXCJdIHRib2R5IHRyJyk7XHJcblxyXG4gICAgZnJhbWVzLmVhY2goKGluZGV4LCBmcmFtZSkgPT4ge1xyXG4gICAgICBpZiAoaW5kZXggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgIGxldCB0ZXh0ID0gJChmcmFtZSkuZmluZCgndGQnKS5maXJzdCgpLnRleHQoKS5yZXBsYWNlKC9cXC8vZywgJyAnKS5yZXBsYWNlKC8gIC9nLCAnICcpLnRyaW0oKTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5jb250ZXh0LmdldEl0ZW0odGV4dCwgSXRlbVR5cGUuV2FyZnJhbWUpKSB7XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5jb250ZXh0LmFkZEl0ZW0odGV4dCwgSXRlbVR5cGUuV2FyZnJhbWUsIG51bGwsIG51bGwsIG51bGwsIDIsIDApO1xyXG5cclxuICAgICAgICBpZiAodGV4dC5pbmRleE9mKCdQcmltZScpID09PSAtMSkge1xyXG4gICAgICAgICAgdGhpcy5jb250ZXh0LmFkZEl0ZW0odGV4dCArICcgQmx1ZXByaW50JywgSXRlbVR5cGUuV2FyZnJhbWUsIGlkLCBudWxsLCBudWxsLCAxLCAwKTtcclxuICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRJdGVtKHRleHQgKyAnIENoYXNzaXMgQmx1ZXByaW50JywgSXRlbVR5cGUuV2FyZnJhbWUsIGlkLCBudWxsLCBudWxsLCAxLCAwKTtcclxuICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRJdGVtKHRleHQgKyAnIE5ldXJvcHRpY3MgQmx1ZXByaW50JywgSXRlbVR5cGUuV2FyZnJhbWUsIGlkLCBudWxsLCBudWxsLCAxLCAwKTtcclxuICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRJdGVtKHRleHQgKyAnIFN5c3RlbXMgQmx1ZXByaW50JywgSXRlbVR5cGUuV2FyZnJhbWUsIGlkLCBudWxsLCBudWxsLCAxLCAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jb250ZXh0LmFkZEl0ZW0odGV4dCArICcgQmx1ZXByaW50JywgSXRlbVR5cGUuV2FyZnJhbWUsIGlkLCBudWxsLCBudWxsLCAxLCAwKTtcclxuICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRJdGVtKHRleHQgKyAnIENoYXNzaXMgQmx1ZXByaW50JywgSXRlbVR5cGUuV2FyZnJhbWUsIGlkLCBudWxsLCBudWxsLCAxLCAwKTtcclxuICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRJdGVtKHRleHQgKyAnIE5ldXJvcHRpY3MgQmx1ZXByaW50JywgSXRlbVR5cGUuV2FyZnJhbWUsIGlkLCBudWxsLCBudWxsLCAxLCAwKTtcclxuICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRJdGVtKHRleHQgKyAnIFN5c3RlbXMgQmx1ZXByaW50JywgSXRlbVR5cGUuV2FyZnJhbWUsIGlkLCBudWxsLCBudWxsLCAxLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgYXJjaHdpbmcoKSB7XHJcbiAgICBsZXQgJCA9IGF3YWl0IHRoaXMuZ2V0KCdodHRwOi8vd2FyZnJhbWUud2lraWEuY29tL3dpa2kvQXJjaHdpbmcnKTtcclxuICAgIGxldCBpdGVtcyA9ICQoJy5uYXZib3gnKS5maXJzdCgpLmZpbmQoJ2EnKTtcclxuXHJcbiAgICBpdGVtcy5lYWNoKChpbmRleCwgaXRlbSkgPT4ge1xyXG4gICAgICBsZXQgdGV4dCA9ICQoaXRlbSkuYXR0cigndGl0bGUnKS5yZXBsYWNlKC9cXC8vZywgJyAnKS5yZXBsYWNlKC8gIC9nLCAnICcpLnRyaW0oKTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5jb250ZXh0LmdldEl0ZW0odGV4dCwgSXRlbVR5cGUuQXJjaHdpbmcpKSB7XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5jb250ZXh0LmFkZEl0ZW0odGV4dCwgSXRlbVR5cGUuQXJjaHdpbmcsIG51bGwsIG51bGwsIG51bGwsIDIsIDApO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuYWRkSXRlbSh0ZXh0ICsgJyBCbHVlcHJpbnQnLCBJdGVtVHlwZS5BcmNod2luZywgaWQsIG51bGwsIG51bGwsIDEsIDApO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5hZGRJdGVtKHRleHQgKyAnIEhhcm5lc3MnLCBJdGVtVHlwZS5BcmNod2luZywgaWQsIG51bGwsIG51bGwsIDEsIDApO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5hZGRJdGVtKHRleHQgKyAnIFN5c3RlbXMnLCBJdGVtVHlwZS5BcmNod2luZywgaWQsIG51bGwsIG51bGwsIDEsIDApO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5hZGRJdGVtKHRleHQgKyAnIFdpbmdzJywgSXRlbVR5cGUuQXJjaHdpbmcsIGlkLCBudWxsLCBudWxsLCAxLCAwKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBzZW50aW5lbCgpIHtcclxuICAgIGxldCAkID0gYXdhaXQgdGhpcy5nZXQoJ2h0dHA6Ly93YXJmcmFtZS53aWtpYS5jb20vd2lraS9TZW50aW5lbHMnKTtcclxuICAgIGxldCBpdGVtcyA9ICQoJ3RhYmxlLnNvcnRhYmxlJykuZmlyc3QoKS5maW5kKCd0Ym9keSB0cicpO1xyXG5cclxuICAgIGl0ZW1zLmVhY2goKGluZGV4LCBpdGVtKSA9PiB7XHJcbiAgICAgIGlmIChpbmRleCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICBsZXQgdGV4dCA9ICQoaXRlbSkuZmluZCgndGQnKS5maXJzdCgpLmZpbmQoJ2EnKS5hdHRyKCd0aXRsZScpLnJlcGxhY2UoL1xcLy9nLCAnICcpLnJlcGxhY2UoLyAgL2csICcgJykudHJpbSgpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLmNvbnRleHQuZ2V0SXRlbSh0ZXh0LCBJdGVtVHlwZS5TZW50aW5lbCkpIHtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLmNvbnRleHQuYWRkSXRlbSh0ZXh0LCBJdGVtVHlwZS5TZW50aW5lbCwgbnVsbCwgbnVsbCwgbnVsbCwgMiwgMCk7XHJcblxyXG4gICAgICAgIGlmICgoL3ByaW1lL2kpLnRlc3QodGV4dCkpIHtcclxuICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRJdGVtKHRleHQgKyAnIEJsdWVwcmludCcsIEl0ZW1UeXBlLlNlbnRpbmVsLCBpZCwgbnVsbCwgbnVsbCwgMSwgMCk7XHJcbiAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkSXRlbSh0ZXh0ICsgJyBDYXJhcGFjZScsIEl0ZW1UeXBlLlNlbnRpbmVsLCBpZCwgbnVsbCwgbnVsbCwgMSwgMCk7XHJcbiAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkSXRlbSh0ZXh0ICsgJyBDZXJlYnJ1bScsIEl0ZW1UeXBlLlNlbnRpbmVsLCBpZCwgbnVsbCwgbnVsbCwgMSwgMCk7XHJcbiAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkSXRlbSh0ZXh0ICsgJyBTeXN0ZW1zJywgSXRlbVR5cGUuU2VudGluZWwsIGlkLCBudWxsLCBudWxsLCAxLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgY29tcGFuaW9ucygpIHtcclxuICAgIGxldCAkID0gYXdhaXQgdGhpcy5nZXQoJ2h0dHA6Ly93YXJmcmFtZS53aWtpYS5jb20vd2lraS9Db21wYW5pb25zJyk7XHJcbiAgICBsZXQgaXRlbXMgPSAkKCcubmF2Ym94IHRyJyk7XHJcblxyXG4gICAgaXRlbXMuZWFjaCgoaW5kZXgsIGl0ZW0pID0+IHtcclxuICAgICAgaWYgKGluZGV4ID09IDQgfHwgaW5kZXggPT0gNikge1xyXG4gICAgICAgICQoaXRlbSkuZmluZCgnYScpLmVhY2goKGluZGV4MiwgaXRlbTIpID0+IHtcclxuICAgICAgICAgIGxldCB0ZXh0ID0gJChpdGVtMikuYXR0cigndGl0bGUnKS5yZXBsYWNlKC9cXC8vZywgJyAnKS5yZXBsYWNlKC8gIC9nLCAnICcpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5nZXRJdGVtKHRleHQsIEl0ZW1UeXBlLkNvbXBhbmlvbikpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZEl0ZW0odGV4dCwgSXRlbVR5cGUuQ29tcGFuaW9uLCBudWxsLCBudWxsLCBudWxsLCAyLCAwKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgcmVsaWMoKSB7XHJcbiAgICBsZXQgJCA9IGF3YWl0IHRoaXMuZ2V0KCdodHRwOi8vd2FyZnJhbWUud2lraWEuY29tL3dpa2kvUmVsaWMnKTtcclxuICAgIGxldCBpdGVtcyA9ICQoJ1t0aXRsZT1cIkJ5IHJld2FyZHMgKHNpbXBsZSB0YWJsZSlcIl0gdGFibGUgdGJvZHkgdHInKTtcclxuXHJcbiAgICBsZXQgcm93cyA9IDx7IG5hbWU6IHN0cmluZywgb3duZXI6IHN0cmluZywgbG9jYXRpb246IHN0cmluZyB9W10+PGFueT5pdGVtcy5tYXAoKGluZGV4LCBpdGVtKSA9PiB7XHJcbiAgICAgIGxldCB2YWx1ZXMgPSAkKGl0ZW0pLmZpbmQoJ3RkJykuZ2V0KCk7XHJcblxyXG4gICAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgbGV0IGl0ZW1OYW1lID0gJCh2YWx1ZXNbMF0pLnRleHQoKS5yZXBsYWNlKC9cXC8vZywgJyAnKS5yZXBsYWNlKC8gIC9nLCAnICcpLnRyaW0oKTtcclxuICAgICAgbGV0IGl0ZW1QYXJ0ID0gJCh2YWx1ZXNbMV0pLnRleHQoKS5yZXBsYWNlKC9cXC8vZywgJyAnKS5yZXBsYWNlKC8gIC9nLCAnICcpLnRyaW0oKTtcclxuICAgICAgbGV0IHJlbGljVGllciA9ICQodmFsdWVzWzJdKS50ZXh0KCkucmVwbGFjZSgvXFwvL2csICcgJykucmVwbGFjZSgvICAvZywgJyAnKS50cmltKCk7XHJcbiAgICAgIGxldCByZWxpY05hbWUgPSAkKHZhbHVlc1szXSkudGV4dCgpLnJlcGxhY2UoL1xcLy9nLCAnICcpLnJlcGxhY2UoLyAgL2csICcgJykudHJpbSgpO1xyXG4gICAgICBsZXQgcmFyaXR5ID0gJCh2YWx1ZXNbNF0pLnRleHQoKS5yZXBsYWNlKC9cXC8vZywgJyAnKS5yZXBsYWNlKC8gIC9nLCAnICcpLnRyaW0oKTtcclxuICAgICAgbGV0IHZhdWx0ZWQgPSAkKHZhbHVlc1s1XSkudGV4dCgpLnJlcGxhY2UoL1xcLy9nLCAnICcpLnJlcGxhY2UoLyAgL2csICcgJykudHJpbSgpO1xyXG5cclxuICAgICAgbGV0IGl0ZW1GdWxsTmFtZSA9IGl0ZW1OYW1lICsgJyAnICsgaXRlbVBhcnQ7XHJcbiAgICAgIGxldCBsb2NhdGlvbiA9IHJlbGljVGllciArICcgJyArIHJlbGljTmFtZSArICcgJyArIHJhcml0eTtcclxuICAgICAgaWYgKHZhdWx0ZWQudG9Mb3dlckNhc2UoKSA9PSAneWVzJykge1xyXG4gICAgICAgIGxvY2F0aW9uICs9ICcgKFYpJztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiBpdGVtRnVsbE5hbWUsXHJcbiAgICAgICAgb3duZXI6IGl0ZW1OYW1lLFxyXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxyXG4gICAgICB9O1xyXG4gICAgfSkuZ2V0KCk7XHJcblxyXG4gICAgcm93cyA9IHJvd3Muc29ydCgoYSwgYikgPT4gYS5uYW1lLmxvY2FsZUNvbXBhcmUoYi5uYW1lKSk7XHJcblxyXG4gICAgbGV0IHByZXZJdGVtID0gcm93c1swXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHJvd3MubGVuZ3RoOyArK2kpIHtcclxuICAgICAgbGV0IGl0ZW0gPSByb3dzW2ldO1xyXG4gICAgICAvL05ldyBpdGVtIGNvbW1pdCB0aGUgbG9jYXRpb25zXHJcbiAgICAgIGlmIChwcmV2SXRlbS5uYW1lICE9IGl0ZW0ubmFtZSkge1xyXG4gICAgICAgIHRoaXMuc2V0TG9jYXRpb24ocHJldkl0ZW0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGl0ZW0ubG9jYXRpb24gPSBwcmV2SXRlbS5sb2NhdGlvbiArICdcXG4nICsgaXRlbS5sb2NhdGlvbjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcHJldkl0ZW0gPSBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8vQ29tbWl0IHRoZSBsYXN0IGl0ZW1cclxuICAgIHRoaXMuc2V0TG9jYXRpb24ocHJldkl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRMb2NhdGlvbihpdGVtOiB7IG5hbWU6IHN0cmluZywgb3duZXI6IHN0cmluZywgbG9jYXRpb246IHN0cmluZyB9KSB7XHJcbiAgICBsZXQgZGJJdGVtID0gdGhpcy5jb250ZXh0LmdldEl0ZW1CeU5hbWUoaXRlbS5uYW1lKTtcclxuICAgIGlmIChkYkl0ZW0pIHtcclxuICAgICAgLy9XZSBoYXZlIHRoZSBpdGVtXHJcbiAgICAgIHRoaXMuY29udGV4dC5zZXRMb2NhdGlvbihkYkl0ZW0uaWQsIGl0ZW0ubG9jYXRpb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy9XZSBkb24ndCBoYXZlIHRoZSBpdGVtXHJcbiAgICAgIGxldCBvd25lckl0ZW0gPSB0aGlzLmNvbnRleHQuZ2V0SXRlbUJ5TmFtZShpdGVtLm93bmVyKTtcclxuXHJcbiAgICAgIGlmIChvd25lckl0ZW0pIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuYWRkSXRlbShpdGVtLm5hbWUsIG93bmVySXRlbS50eXBlLCBvd25lckl0ZW0uaWQsIG51bGwsIGl0ZW0ubG9jYXRpb24sIDEsIDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignTWlzc2luZyBpdGVtOiAnICsgaXRlbS5vd25lcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgdmVyc2lvbigpIHtcclxuICAgIGxldCBpdGVtcyA9IHRoaXMuY29udGV4dC5nZXRJdGVtcygpO1xyXG4gICAgbGV0IGN1cnJlbnRJdGVtcyA9IGl0ZW1zLmZpbHRlcihmID0+IGYub3duZXJJdGVtSWQgPT09IG51bGwgJiYgZi52ZXJzaW9uIDwgMSk7XHJcbiAgICBpdGVtcyA9IGl0ZW1zLmZpbHRlcihmID0+IGYub3duZXJJdGVtSWQgIT09IG51bGwpO1xyXG5cclxuICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMudmVyc2lvblVwZGF0ZShjdXJyZW50SXRlbXMsIGl0ZW1zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgdmVyc2lvblVwZGF0ZShjdXJyZW50SXRlbXM6IElVc2VySXRlbVtdLCBpdGVtczogSVVzZXJJdGVtW10pIHtcclxuICAgIGZvciAobGV0IGl0ZW0gb2YgY3VycmVudEl0ZW1zKSB7XHJcbiAgICAgIGxldCAkID0gYXdhaXQgdGhpcy5nZXQoJ2h0dHA6Ly93YXJmcmFtZS53aWtpYS5jb20vd2lraS8nICsgaXRlbS5uYW1lLnJlcGxhY2UoLyAvZywgJ18nKSk7XHJcbiAgICAgIGxldCByb3dzID0gJCgnLmZvdW5kcnl0YWJsZSA+IHRib2R5ID4gdHInKTtcclxuXHJcbiAgICAgIGxldCByZXNlYXJjaCA9IHJvd3MuZmluZCgnYVt0aXRsZT1cIlJlc2VhcmNoXCJdJyk7XHJcbiAgICAgIGlmIChyZXNlYXJjaC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldERlc2NyaXB0aW9uKGl0ZW0uaWQsIHJlc2VhcmNoLmZpcnN0KCkudGV4dCgpKTtcclxuICAgICAgfSBlbHNlIGlmICgoL3ByaW1lL2kpLnRlc3QoaXRlbS5uYW1lKSkge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gcm93cy5sYXN0KCkuZmluZCgndGFibGUgdHInKS5tYXAoKGksIG0pID0+IHtcclxuICAgICAgICAgIHJldHVybiAkKG0pLmZpbmQoJ3RkJylbMF0uY2hpbGROb2Rlcy5maW5kKGYgPT4gZi50eXBlID09PSAndGV4dCcpLm5vZGVWYWx1ZS5yZXBsYWNlKC8gIC9nLCAnICcpLnRyaW0oKTtcclxuICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICByb3dzLnNsaWNlKDEsIDIpLmZpbmQoJ3RkJykuZWFjaCgoaSwgbSkgPT4ge1xyXG4gICAgICAgICAgbGV0IGNvbXBvbmVudCA9ICQobSkuZmluZCgnYScpLmF0dHIoJ3RpdGxlJyk7XHJcbiAgICAgICAgICBpZiAoY29tcG9uZW50cy5pbmRleE9mKGNvbXBvbmVudCkgPiAtMSkge1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSBwYXJzZUludChtLmNoaWxkTm9kZXNbbS5jaGlsZE5vZGVzLmxlbmd0aCAtIDFdLm5vZGVWYWx1ZS50cmltKCkpIHx8IDE7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3ViSXRlbSA9IGl0ZW1zLmZpbmQoZiA9PiBmLm5hbWUgPT09IGl0ZW0ubmFtZSArICcgJyArIGNvbXBvbmVudCB8fCBmLm5hbWUgPT09IGl0ZW0ubmFtZSArICcgJyArIGNvbXBvbmVudCArICcgQmx1ZXByaW50JyB8fCBmLm5hbWUgKyAnIEJsdWVwcmludCcgPT09IGl0ZW0ubmFtZSArICcgJyArIGNvbXBvbmVudCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3ViSXRlbSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuY29udGV4dC5zZXRNYXhQcm9ncmVzcyhzdWJJdGVtLmlkLCBjb3VudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01pc3NpbmcgcGFydDogJyArIGl0ZW0ubmFtZSArICcgJyArIGNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jb250ZXh0LnNldEl0ZW1WZXJzaW9uKGl0ZW0uaWQsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0iLCJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIERhdGFiYXNlIGZyb20gJ2JldHRlci1zcWxpdGUzJztcclxuaW1wb3J0IHsgVXNlciwgUm9sZSB9IGZyb20gJy4vdXNlcic7XHJcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZC92NCc7XHJcbmltcG9ydCAqIGFzIHNoYTI1NiBmcm9tICdzaGEyNTYnO1xyXG5cclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgSXRlbVR5cGUgfSBmcm9tICcuLi9kYXRhL0l0ZW1UeXBlJztcclxuaW1wb3J0IHsgSVVzZXJJdGVtIH0gZnJvbSAnLi4vZGF0YS91c2VySXRlbSc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VydmVyQ29udGV4dCB7XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRBZGRWZXJzaW9uO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50R2V0VmVyc2lvbjtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRBZGRVc2VyO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50VXBkVXNlclJvbGU7XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRHZXRVc2VyO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50R2V0VXNlckJ5VXNlck5hbWU7XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRHZXRVc2VyQnlLZXk7XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRTZXRQYXNzd29yZDtcclxuICBwcml2YXRlIHN0YXRlbWVudFNlYXJjaDtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRBZGRTZXNzaW9uO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50R2V0U2Vzc2lvbjtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRBZGRJdGVtO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50QWRkUHJvZ3Jlc3M7XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRTZXRQcm9ncmVzcztcclxuICBwcml2YXRlIHN0YXRlbWVudFNldE5vdGU7XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRHZXRJdGVtO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50R2V0SXRlbUJ5TmFtZTtcclxuICBwcml2YXRlIHN0YXRlbWVudEdldEl0ZW1CeUlkO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50R2V0VXNlckl0ZW07XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRHZXRVc2VySXRlbXM7XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRTZXREZXNjcmlwdGlvbjtcclxuICBwcml2YXRlIHN0YXRlbWVudFNldExvY2F0aW9uO1xyXG4gIHByaXZhdGUgc3RhdGVtZW50U2V0TWF4UHJvZ3Jlc3M7XHJcbiAgcHJpdmF0ZSBzdGF0ZW1lbnRTZXRJdGVtVmVyc2lvbjtcclxuICBwcml2YXRlIHN0YXRlbWVudEdldEl0ZW1zO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGxldCBjcmVhdGUgPSAhZnMuZXhpc3RzU3luYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnZGF0YScsICdkYXRhLmRiJykpO1xyXG4gICAgbGV0IGRiID0gbmV3IERhdGFiYXNlKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdkYXRhJywgJ2RhdGEuZGInKSk7XHJcblxyXG4gICAgaWYgKGNyZWF0ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnQ3JlYXRlIGRhdGFiYXNlLicpXHJcblxyXG4gICAgICBkYi5wcmVwYXJlKCdDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBWZXJzaW9uIChpZCBJTlRFR0VSIFBSSU1BUlkgS0VZKTsnKS5ydW4oKTtcclxuICAgICAgdGhpcy5zdGF0ZW1lbnRBZGRWZXJzaW9uID0gZGIucHJlcGFyZSgnSU5TRVJUIElOVE8gVmVyc2lvbiBWQUxVRVMoPyknKVxyXG4gICAgICB0aGlzLnN0YXRlbWVudEFkZFZlcnNpb24ucnVuKDApO1xyXG4gICAgICBkYi5wcmVwYXJlKCdDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBVc2VyIChpZCBURVhUIFBSSU1BUlkgS0VZLCB1c2VyTmFtZSBURVhUIFVOSVFVRSBOT1QgTlVMTCBjb2xsYXRlIG5vY2FzZSwgbmFtZSBURVhULCByb2xlIElOVEVHRVIsIHBhc3N3b3JkIFRFWFQsIGtleSBURVhUIFVOSVFVRSk7JykucnVuKCk7XHJcbiAgICAgIHRoaXMuc3RhdGVtZW50QWRkVXNlciA9IGRiLnByZXBhcmUoJ0lOU0VSVCBJTlRPIFVzZXIgVkFMVUVTKD8sID8sID8sID8sID8sID8pJylcclxuICAgICAgZGIucHJlcGFyZSgnQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgU2Vzc2lvbiAoaWQgVEVYVCBQUklNQVJZIEtFWSwgdXNlcklkIFRFWFQsIHZhbGlkaXR5IElOVEVHRVIsIEZPUkVJR04gS0VZKHVzZXJJZCkgUkVGRVJFTkNFUyBVc2VyKGlkKSk7JykucnVuKCk7XHJcblxyXG4gICAgICBkYi5wcmVwYXJlKCdDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBJdGVtIChpZCBURVhUIFBSSU1BUlkgS0VZLCBuYW1lIFRFWFQsIHR5cGUgSU5URUdFUiwgb3duZXJJdGVtSWQgVEVYVCwgZGVzY3JpcHRpb24gVEVYVCwgRk9SRUlHTiBLRVkob3duZXJJdGVtSWQpIFJFRkVSRU5DRVMgSXRlbShpZCkpOycpLnJ1bigpO1xyXG4gICAgICBkYi5wcmVwYXJlKCdDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBQcm9ncmVzcyAodXNlcklkIFRFWFQsIGl0ZW1JZCBURVhULCBwcm9ncmVzcyBJTlRFR0VSLCBub3RlIFRFWFQsIFBSSU1BUlkgS0VZICh1c2VySWQsIGl0ZW1JZCksIEZPUkVJR04gS0VZKHVzZXJJZCkgUkVGRVJFTkNFUyBVc2VyKGlkKSwgRk9SRUlHTiBLRVkoaXRlbUlkKSBSRUZFUkVOQ0VTIEl0ZW0oaWQpKTsnKS5ydW4oKTtcclxuXHJcbiAgICAgIHRoaXMuc3RhdGVtZW50QWRkVXNlci5ydW4odXVpZCgpLCAnQicsICdCYWzDoXpzJywgUm9sZS5BZG1pbmlzdHJhdG9yLCBzaGEyNTYoJycpLCBudWxsKTtcclxuICAgICAgdGhpcy5zdGF0ZW1lbnRBZGRVc2VyLnJ1bih1dWlkKCksICdKJywgJ0p1ZGl0JywgUm9sZS5Vc2VyLCBzaGEyNTYoJycpLCBudWxsKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLnN0YXRlbWVudEFkZFZlcnNpb24gPSBkYi5wcmVwYXJlKCdJTlNFUlQgSU5UTyBWZXJzaW9uIFZBTFVFUyg/KScpXHJcbiAgICAgIHRoaXMuc3RhdGVtZW50QWRkVXNlciA9IGRiLnByZXBhcmUoJ0lOU0VSVCBJTlRPIFVzZXIgVkFMVUVTKD8sID8sID8sID8sID8sID8pJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdGF0ZW1lbnRHZXRWZXJzaW9uID0gZGIucHJlcGFyZSgnU0VMRUNUIG1heChpZCkgYXMgaWQgRlJPTSBWZXJzaW9uOycpO1xyXG5cclxuICAgIGlmICh0aGlzLnZlcnNpb24gPCAxKSB7XHJcbiAgICAgIGRiLnByZXBhcmUoJ0FMVEVSIFRBQkxFIEl0ZW0gQUREIENPTFVNTiBsb2NhdGlvbiBURVhUOycpLnJ1bigpO1xyXG5cclxuICAgICAgdGhpcy5zdGF0ZW1lbnRBZGRWZXJzaW9uLnJ1bigxKTtcclxuICAgIH0gIFxyXG5cclxuICAgIGlmICh0aGlzLnZlcnNpb24gPCAyKSB7XHJcbiAgICAgIGRiLnByZXBhcmUoJ0FMVEVSIFRBQkxFIEl0ZW0gQUREIENPTFVNTiBtYXhQcm9ncmVzcyBJTlRFR0VSOycpLnJ1bigpO1xyXG4gICAgICBkYi5wcmVwYXJlKCdBTFRFUiBUQUJMRSBJdGVtIEFERCBDT0xVTU4gdmVyc2lvbiBJTlRFR0VSOycpLnJ1bigpO1xyXG5cclxuICAgICAgZGIucHJlcGFyZSgnVVBEQVRFIEl0ZW0gU0VUIG1heFByb2dyZXNzID0gMiBXSEVSRSBvd25lckl0ZW1JZCBpcyBOVUxMJykucnVuKCk7XHJcbiAgICAgIGRiLnByZXBhcmUoJ1VQREFURSBJdGVtIFNFVCBtYXhQcm9ncmVzcyA9IDEgV0hFUkUgb3duZXJJdGVtSWQgaXMgTk9UIE5VTEwnKS5ydW4oKTtcclxuICAgICAgZGIucHJlcGFyZSgnVVBEQVRFIEl0ZW0gU0VUIHZlcnNpb24gPSAwJykucnVuKCk7XHJcblxyXG4gICAgICB0aGlzLnN0YXRlbWVudEFkZFZlcnNpb24ucnVuKDIpO1xyXG4gICAgfSAgXHJcblxyXG4gICAgdGhpcy5zdGF0ZW1lbnRHZXRVc2VyID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBVc2VyIHdoZXJlIGlkID0gPzsnKTtcclxuICAgIHRoaXMuc3RhdGVtZW50R2V0VXNlckJ5VXNlck5hbWUgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIFVzZXIgd2hlcmUgdXNlck5hbWUgPSA/OycpO1xyXG4gICAgdGhpcy5zdGF0ZW1lbnRHZXRVc2VyQnlLZXkgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIFVzZXIgd2hlcmUga2V5ID0gPzsnKTtcclxuICAgIHRoaXMuc3RhdGVtZW50VXBkVXNlclJvbGUgPSBkYi5wcmVwYXJlKCdVUERBVEUgVXNlciBTRVQgcm9sZSA9ID8gV0hFUkUgaWQgPSA/Jyk7XHJcblxyXG4gICAgdGhpcy5zdGF0ZW1lbnRBZGRTZXNzaW9uID0gZGIucHJlcGFyZSgnSU5TRVJUIElOVE8gU2Vzc2lvbiBWQUxVRVMoPywgPywgPyknKTtcclxuICAgIHRoaXMuc3RhdGVtZW50R2V0U2Vzc2lvbiA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gU2Vzc2lvbiBXSEVSRSBpZCA9ID8nKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlbWVudFNldFBhc3N3b3JkID0gZGIucHJlcGFyZSgnVVBEQVRFIFVzZXIgU0VUIHBhc3N3b3JkID0gPyBXSEVSRSBpZCA9ID8nKTtcclxuICAgIHRoaXMuc3RhdGVtZW50U2VhcmNoID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBVc2VyIFdIRVJFIG5hbWUgTElLRSA/Jyk7XHJcblxyXG4gICAgdGhpcy5zdGF0ZW1lbnRBZGRJdGVtID0gZGIucHJlcGFyZSgnSU5TRVJUIElOVE8gSXRlbSBWQUxVRVMoPywgPywgPywgPywgPywgPywgPywgPyknKTtcclxuICAgIHRoaXMuc3RhdGVtZW50QWRkUHJvZ3Jlc3MgPSBkYi5wcmVwYXJlKCdJTlNFUlQgSU5UTyBQcm9ncmVzcyBWQUxVRVMoPywgPywgPywgPyknKTtcclxuICAgIHRoaXMuc3RhdGVtZW50U2V0UHJvZ3Jlc3MgPSBkYi5wcmVwYXJlKCdVUERBVEUgUHJvZ3Jlc3MgU0VUIHByb2dyZXNzID0gPyBXSEVSRSB1c2VySWQgPSA/IEFORCBpdGVtSWQgPSA/Jyk7XHJcbiAgICB0aGlzLnN0YXRlbWVudFNldE5vdGUgPSBkYi5wcmVwYXJlKCdVUERBVEUgUHJvZ3Jlc3MgU0VUIG5vdGUgPSA/IFdIRVJFIHVzZXJJZCA9ID8gQU5EIGl0ZW1JZCA9ID8nKTtcclxuICAgIHRoaXMuc3RhdGVtZW50U2V0RGVzY3JpcHRpb24gPSBkYi5wcmVwYXJlKCdVUERBVEUgSXRlbSBTRVQgZGVzY3JpcHRpb24gPSA/IFdIRVJFIGlkID0gPycpO1xyXG4gICAgdGhpcy5zdGF0ZW1lbnRTZXRMb2NhdGlvbiA9IGRiLnByZXBhcmUoJ1VQREFURSBJdGVtIFNFVCBsb2NhdGlvbiA9ID8gV0hFUkUgaWQgPSA/Jyk7XHJcbiAgICB0aGlzLnN0YXRlbWVudFNldE1heFByb2dyZXNzID0gZGIucHJlcGFyZSgnVVBEQVRFIEl0ZW0gU0VUIG1heFByb2dyZXNzID0gPyBXSEVSRSBpZCA9ID8nKTtcclxuICAgIHRoaXMuc3RhdGVtZW50U2V0SXRlbVZlcnNpb24gPSBkYi5wcmVwYXJlKCdVUERBVEUgSXRlbSBTRVQgdmVyc2lvbiA9ID8gV0hFUkUgaWQgPSA/Jyk7XHJcblxyXG4gICAgdGhpcy5zdGF0ZW1lbnRHZXRJdGVtID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBJdGVtIFdIRVJFIG5hbWUgPSA/IGNvbGxhdGUgbm9jYXNlIEFORCBUeXBlID0gPycpO1xyXG4gICAgdGhpcy5zdGF0ZW1lbnRHZXRJdGVtQnlOYW1lID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBJdGVtIFdIRVJFIG5hbWUgPSA/IGNvbGxhdGUgbm9jYXNlJyk7XHJcbiAgICB0aGlzLnN0YXRlbWVudEdldEl0ZW1CeUlkID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBJdGVtIFdIRVJFIGlkID0gPycpO1xyXG4gICAgdGhpcy5zdGF0ZW1lbnRHZXRVc2VySXRlbSA9IGRiLnByZXBhcmUoJ1NFTEVDVCBpLmlkLCBpLm5hbWUsIGkudHlwZSwgaS5vd25lckl0ZW1JZCwgaS5kZXNjcmlwdGlvbiwgaS5sb2NhdGlvbiwgaS5tYXhQcm9ncmVzcywgaS52ZXJzaW9uLCBwLnByb2dyZXNzLCBwLm5vdGUgRlJPTSBJdGVtIGkgSU5ORVIgSk9JTiBQcm9ncmVzcyBwIE9OIGkuaWQgPSBwLml0ZW1JZCBBTkQgcC51c2VySWQgPSA/IHdoZXJlIGkuaWQgPSA/Jyk7XHJcbiAgICB0aGlzLnN0YXRlbWVudEdldFVzZXJJdGVtcyA9IGRiLnByZXBhcmUoJ1NFTEVDVCBpLmlkLCBpLm5hbWUsIGkudHlwZSwgaS5vd25lckl0ZW1JZCwgaS5kZXNjcmlwdGlvbiwgaS5sb2NhdGlvbiwgaS5tYXhQcm9ncmVzcywgaS52ZXJzaW9uLCBwLnByb2dyZXNzLCBwLm5vdGUgRlJPTSBJdGVtIGkgTEVGVCBKT0lOIFByb2dyZXNzIHAgT04gaS5pZCA9IHAuaXRlbUlkIEFORCBwLnVzZXJJZCA9ID8nKTtcclxuICAgIHRoaXMuc3RhdGVtZW50R2V0SXRlbXMgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIEl0ZW0nKTtcclxuICB9XHJcblxyXG4gIGdldCB2ZXJzaW9uKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZW1lbnRHZXRWZXJzaW9uLmdldCgpLmlkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFVzZXIoaWQ6IHN0cmluZyk6IFVzZXIge1xyXG4gICAgbGV0IHJvdyA9IHRoaXMuc3RhdGVtZW50R2V0VXNlci5nZXQoaWQpO1xyXG4gICAgcmV0dXJuIHJvdyA/IG5ldyBVc2VyKHJvdykgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFVzZXJCeVVzZXJOYW1lKGlkOiBzdHJpbmcpOiBVc2VyIHtcclxuICAgIGxldCByb3cgPSB0aGlzLnN0YXRlbWVudEdldFVzZXJCeVVzZXJOYW1lLmdldChpZCk7XHJcbiAgICByZXR1cm4gcm93ID8gbmV3IFVzZXIocm93KSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TG9naW4oc2Vzc2lvbjogc3RyaW5nKTogVXNlciB7XHJcbiAgICBsZXQgc2Vzc2lvblJvdyA9IHRoaXMuc3RhdGVtZW50R2V0U2Vzc2lvbi5nZXQoc2Vzc2lvbik7XHJcbiAgICBpZiAoc2Vzc2lvblJvdyAmJiBzZXNzaW9uUm93LnZhbGlkaXR5ID49IERhdGUubm93KCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0VXNlcihzZXNzaW9uUm93LnVzZXJJZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2dpbih1c2VyTmFtZTogc3RyaW5nLCBwYXNzOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IHJvdyA9IHRoaXMuc3RhdGVtZW50R2V0VXNlckJ5VXNlck5hbWUuZ2V0KHVzZXJOYW1lKTtcclxuICAgIGlmIChyb3cgJiYgcm93LnBhc3N3b3JkID09PSBzaGEyNTYocGFzcykpIHtcclxuICAgICAgbGV0IHNlc3Npb24gPSB1dWlkKCk7XHJcbiAgICAgIHRoaXMuc3RhdGVtZW50QWRkU2Vzc2lvbi5ydW4oc2Vzc2lvbiwgcm93LmlkLCBEYXRlLm5vdygpICsgNSAqIDM2MDAgKiAxMDAwKTtcclxuICAgICAgcmV0dXJuIHNlc3Npb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2dpbldpdGhLZXkoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IHJvdyA9IHRoaXMuc3RhdGVtZW50R2V0VXNlckJ5S2V5LmdldChrZXkpO1xyXG4gICAgaWYgKHJvdykge1xyXG4gICAgICBsZXQgc2Vzc2lvbiA9IHV1aWQoKTtcclxuICAgICAgdGhpcy5zdGF0ZW1lbnRBZGRTZXNzaW9uLnJ1bihzZXNzaW9uLCByb3cuaWQsIERhdGUubm93KCkgKyA1ICogMzYwMCAqIDEwMDApO1xyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZFVzZXIodXNlck5hbWU6IHN0cmluZywgbmFtZTogc3RyaW5nLCBwYXNzOiBzdHJpbmcsIHJvbGU6IFJvbGUpIHtcclxuICAgIHRoaXMuc3RhdGVtZW50QWRkVXNlci5ydW4odXVpZCgpLCB1c2VyTmFtZSwgbmFtZSwgcm9sZSwgc2hhMjU2KHBhc3MpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVVc2VyUm9sZShpZDogc3RyaW5nLCByb2xlOiBSb2xlKSB7XHJcbiAgICB0aGlzLnN0YXRlbWVudFVwZFVzZXJSb2xlLnJ1bihyb2xlLCBpZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0UGFzc3dvcmQoaWQ6IHN0cmluZywgcGFzczogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnN0YXRlbWVudFNldFBhc3N3b3JkLnJ1bihzaGEyNTYocGFzcyksIGlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWFyY2gobmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZW1lbnRTZWFyY2guYWxsKCclJyArIG5hbWUgKyAnJScpLm1hcChtID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogbS5pZCxcclxuICAgICAgICBuYW1lOiBtLm5hbWVcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEl0ZW0obmFtZTogc3RyaW5nLCB0eXBlOiBJdGVtVHlwZSwgb3duZXJJdGVtSWQ6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgbG9jYXRpb246IHN0cmluZywgbWF4UHJvZ3Jlc3M6IG51bWJlciwgdmVyc2lvbjogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGNvbnNvbGUubG9nKCdBZGQgaXRlbTogJyArIG5hbWUgKyAnICgnICsgSXRlbVR5cGVbdHlwZV0gKyAnKScpO1xyXG5cclxuICAgIGxldCBpZCA9IHV1aWQoKTtcclxuICAgIHRoaXMuc3RhdGVtZW50QWRkSXRlbS5ydW4oaWQsIG5hbWUsIHR5cGUsIG93bmVySXRlbUlkLCBkZXNjcmlwdGlvbiwgbG9jYXRpb24sIG1heFByb2dyZXNzLCB2ZXJzaW9uKTtcclxuICAgIHJldHVybiBpZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRQcm9ncmVzcyh1c2VySWQ6IHN0cmluZywgaXRlbUlkOiBzdHJpbmcsIHByb2dyZXNzOiBudW1iZXIsIG5vdGU6IHN0cmluZykge1xyXG4gICAgdGhpcy5zdGF0ZW1lbnRBZGRQcm9ncmVzcy5ydW4odXNlcklkLCBpdGVtSWQsIHByb2dyZXNzLCBub3RlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRQcm9ncmVzcyh1c2VySWQ6IHN0cmluZywgaXRlbUlkOiBzdHJpbmcsIHByb2dyZXNzOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLmdldFVzZXIodXNlcklkKSA9PSBudWxsKSB0aHJvdyAnVXNlciBkb2VzIG5vdCBleGlzdCc7XHJcbiAgICBpZiAodGhpcy5nZXRJdGVtQnlJZChpdGVtSWQpID09IG51bGwpIHRocm93ICdJdGVtIGRvZXMgbm90IGV4aXN0JztcclxuXHJcbiAgICBpZiAodGhpcy5nZXRVc2VySXRlbSh1c2VySWQsIGl0ZW1JZCkpIHtcclxuICAgICAgdGhpcy5zdGF0ZW1lbnRTZXRQcm9ncmVzcy5ydW4ocHJvZ3Jlc3MsIHVzZXJJZCwgaXRlbUlkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWRkUHJvZ3Jlc3ModXNlcklkLCBpdGVtSWQsIHByb2dyZXNzLCBudWxsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXROb3RlKHVzZXJJZDogc3RyaW5nLCBpdGVtSWQ6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKHRoaXMuZ2V0VXNlcih1c2VySWQpID09IG51bGwpIHRocm93ICdVc2VyIGRvZXMgbm90IGV4aXN0JztcclxuICAgIGlmICh0aGlzLmdldEl0ZW1CeUlkKGl0ZW1JZCkgPT0gbnVsbCkgdGhyb3cgJ0l0ZW0gZG9lcyBub3QgZXhpc3QnO1xyXG5cclxuICAgIGlmICh0aGlzLmdldFVzZXJJdGVtKHVzZXJJZCwgaXRlbUlkKSkge1xyXG4gICAgICB0aGlzLnN0YXRlbWVudFNldE5vdGUucnVuKHZhbHVlLCB1c2VySWQsIGl0ZW1JZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFkZFByb2dyZXNzKHVzZXJJZCwgaXRlbUlkLCBudWxsLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0SXRlbShuYW1lOiBzdHJpbmcsIHR5cGU6IEl0ZW1UeXBlKTogSVVzZXJJdGVtIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlbWVudEdldEl0ZW0uZ2V0KG5hbWUsIHR5cGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEl0ZW1CeU5hbWUobmFtZTogc3RyaW5nKTogSVVzZXJJdGVtIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlbWVudEdldEl0ZW1CeU5hbWUuZ2V0KG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEl0ZW1CeUlkKGlkOiBzdHJpbmcpOiBJVXNlckl0ZW0ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGVtZW50R2V0SXRlbUJ5SWQuZ2V0KGlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRVc2VySXRlbSh1c2VySWQ6IHN0cmluZywgaXRlbUlkOiBzdHJpbmcpOiBJVXNlckl0ZW1bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZW1lbnRHZXRVc2VySXRlbS5nZXQodXNlcklkLCBpdGVtSWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFVzZXJJdGVtcyh1c2VySWQ6IHN0cmluZyk6IElVc2VySXRlbVtdIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlbWVudEdldFVzZXJJdGVtcy5hbGwodXNlcklkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXREZXNjcmlwdGlvbihpdGVtSWQ6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5zdGF0ZW1lbnRTZXREZXNjcmlwdGlvbi5ydW4odmFsdWUsIGl0ZW1JZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0TG9jYXRpb24oaXRlbUlkOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc3RhdGVtZW50U2V0TG9jYXRpb24ucnVuKHZhbHVlLCBpdGVtSWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE1heFByb2dyZXNzKGl0ZW1JZDogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnN0YXRlbWVudFNldE1heFByb2dyZXNzLnJ1bih2YWx1ZSwgaXRlbUlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRJdGVtVmVyc2lvbihpdGVtSWQ6IHN0cmluZywgdmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5zdGF0ZW1lbnRTZXRJdGVtVmVyc2lvbi5ydW4odmFsdWUsIGl0ZW1JZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0SXRlbXMoKTogSVVzZXJJdGVtW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGVtZW50R2V0SXRlbXMuYWxsKCk7XHJcbiAgfVxyXG5cclxufSIsImV4cG9ydCBlbnVtIFJvbGUge1xyXG4gIFVzZXIgPSAwLFxyXG4gIEVsZXZhdGVkID0gNTEyLFxyXG4gIEFkbWluaXN0cmF0b3IgPSAxMDI0XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VyIHtcclxuICBwdWJsaWMgaWQ6IHN0cmluZztcclxuICBwdWJsaWMgdXNlck5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gIHB1YmxpYyByb2xlOiBSb2xlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihiYXNlPzogVXNlcikge1xyXG4gICAgaWYgKGJhc2UpIHtcclxuICAgICAgdGhpcy5pZCA9IGJhc2UuaWQ7XHJcbiAgICAgIHRoaXMudXNlck5hbWUgPSBiYXNlLnVzZXJOYW1lO1xyXG4gICAgICB0aGlzLm5hbWUgPSBiYXNlLm5hbWU7XHJcbiAgICAgIHRoaXMucm9sZSA9IGJhc2Uucm9sZTtcclxuICAgIH1cclxuICB9XHJcblxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmV0dGVyLXNxbGl0ZTNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hlZXJpb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVycm9yaGFuZGxlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3MtdXJscmV3cml0ZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1ldGhvZC1vdmVycmlkZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb3JnYW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzaGEyNTZcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==