(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [ngSwitch]=\"screen\" class=\"fill\">\r\n  <div *ngSwitchCase=\"'connect'\" class=\"fill\">\r\n    <div class=\"fill\">\r\n      <div class=\"loading\">\r\n        <div>\r\n          <i class=\"material-icons loading-image\"> cloud </i>\r\n        </div>\r\n        <div class=\"loading-text\">Connecting to session...</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div *ngSwitchCase=\"'connected'\" class=\"fill\">\r\n    <mat-sidenav-container>\r\n      <mat-sidenav #sidenav mode=\"over\" opened=\"false\">\r\n        <div>\r\n          <div *ngIf=\"user\">\r\n            <mat-toolbar>\r\n              <span>{{user.name}}</span>\r\n            </mat-toolbar>\r\n          </div>\r\n          <button type=\"button\" mat-button (click)=\"context.navigation.go('connected:'); context.router.navigateByUrl('/'); sidenav.close();\">Information</button>\r\n          <button *ngIf=\"isLoggedIn\" type=\"button\" mat-button (click)=\"context.navigation.go('connected:'); context.router.navigateByUrl('/progress'); sidenav.close();\">Progress</button>\r\n\r\n          <button *ngIf=\"isAdministrator\" type=\"button\" mat-button (click)=\"register(); sidenav.close();\">Register</button>\r\n          <button *ngIf=\"isElevated\" type=\"button\" mat-button (click)=\"context.navigation.go('connected:search'); sidenav.close();\">Search</button>\r\n          \r\n          <button *ngIf=\"isLoggedIn\" type=\"button\" mat-button (click)=\"context.navigation.go('connected:user'); sidenav.close();\">User</button>\r\n          <button *ngIf=\"!isLoggedIn\" type=\"button\" mat-button (click)=\"login(); sidenav.close();\">Login</button>\r\n          <button *ngIf=\"isLoggedIn\" type=\"button\" mat-button (click)=\"logout(); context.navigation.go('connected:'); sidenav.close();\">Logout</button>\r\n\r\n          <!-- <div class=\"lang\">\r\n            hu\r\n            <mat-slide-toggle [(ngModel)]=\"context.isEnglish\">\r\n            </mat-slide-toggle>\r\n            en\r\n          </div> -->\r\n        </div>\r\n      </mat-sidenav>\r\n      <div [ngSwitch]=\"page\" class=\"fill page\">\r\n        <div *ngSwitchCase=\"'user'\" class=\"fill\">\r\n          <wfp-user></wfp-user>\r\n        </div>\r\n        <div *ngSwitchCase=\"'search'\" class=\"fill\">\r\n          <wfp-search></wfp-search>\r\n        </div>\r\n        <div *ngSwitchDefault class=\"fill scrollable main\">\r\n          <router-outlet></router-outlet>\r\n        </div>\r\n      </div>\r\n      <button class=\"toggle\" mat-mini-fab (click)=\"sidenav.toggle()\">\r\n        <mat-icon>menu</mat-icon>\r\n      </button>\r\n    </mat-sidenav-container>\r\n  </div>\r\n  <div *ngSwitchDefault class=\"fill\">\r\n    <div class=\"fill\">\r\n      <div class=\"error\">\r\n        <div>\r\n          <i class=\"material-icons error-image\"> sentiment_very_dissatisfied </i>\r\n        </div>\r\n        <div class=\"error-text\">The page is not found.</div>\r\n        <button md-button (click)=\"context.navigation.reload()\">Reload page</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"fill loader\" *ngIf=\"isLoading\">\r\n  <div class=\"loading\">\r\n    <div>\r\n      <i class=\"material-icons loading-image\"> cloud_queue </i>\r\n    </div>\r\n    <div class=\"loading-text\">Loading...</div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-sidenav-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0; }\n  mat-sidenav-container mat-sidenav {\n    min-width: calc(100% - 10vh);\n    max-width: calc(100% - 10vh); }\n  mat-sidenav-container mat-sidenav button {\n      width: 100%;\n      font-size: 3vh;\n      text-align: left;\n      padding: 1vh;\n      padding-left: 4vh; }\n  mat-sidenav-container .toggle {\n    position: absolute;\n    right: 2vh;\n    top: 2vh; }\n  .mat-drawer-container {\n  background: none; }\n  .loader {\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.8); }\n  .role {\n  position: absolute;\n  top: 0;\n  right: 0; }\n  .role.role1 {\n    width: 3vh;\n    height: 1vh; }\n  .role.role2 {\n    width: 1vh;\n    height: 3vh; }\n  .role[role=administrator] {\n    background: red; }\n  .role[role=gamemaster] {\n    background: purple; }\n  .role[role=player] {\n    background: turquoise; }\n  .lang {\n  position: absolute;\n  bottom: 2vh;\n  right: 2vh; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.context */ "./src/app/app.context.ts");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular-redux/store */ "./node_modules/@angular-redux/store/lib/src/index.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_angular_redux_store__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pages_core_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/core/login/login.component */ "./src/app/pages/core/login/login.component.ts");
/* harmony import */ var _pages_core_register_register_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/core/register/register.component */ "./src/app/pages/core/register/register.component.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppComponent = /** @class */ (function () {
    function AppComponent(context, change) {
        var _this = this;
        this.context = context;
        this.change = change;
        this.screen$.subscribe(function (s) {
            _this.screen = s;
            _this.change.markForCheck();
        });
        this.page$.subscribe(function (s) {
            _this.page = s;
            _this.change.markForCheck();
        });
        this.isLoading$.subscribe(function (s) {
            _this.isLoading = s;
            _this.change.markForCheck();
        });
        this.user$.subscribe(function (s) {
            _this.user = s;
            _this.change.markForCheck();
        });
        this.isAdministrator$.subscribe(function (s) {
            _this.isAdministrator = s;
            _this.change.markForCheck();
        });
        this.isElevated$.subscribe(function (s) {
            _this.isElevated = s;
            _this.change.markForCheck();
        });
        this.isLoggedIn$.subscribe(function (s) {
            _this.isLoggedIn = s;
            _this.change.markForCheck();
        });
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.login = function () {
        this.context.dialog.open(_pages_core_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]);
    };
    AppComponent.prototype.logout = function () {
        this.context.user.set(null);
        this.context.setCookie('session', null);
        this.context.navigation.reload();
    };
    AppComponent.prototype.register = function () {
        this.context.dialog.open(_pages_core_register_register_component__WEBPACK_IMPORTED_MODULE_4__["RegisterComponent"]);
    };
    __decorate([
        Object(_angular_redux_store__WEBPACK_IMPORTED_MODULE_2__["select"])(['navigation', 'screen']),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_5__["Observable"])
    ], AppComponent.prototype, "screen$", void 0);
    __decorate([
        Object(_angular_redux_store__WEBPACK_IMPORTED_MODULE_2__["select"])(['navigation', 'page']),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_5__["Observable"])
    ], AppComponent.prototype, "page$", void 0);
    __decorate([
        Object(_angular_redux_store__WEBPACK_IMPORTED_MODULE_2__["select"])(['navigation', 'isLoading']),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_5__["Observable"])
    ], AppComponent.prototype, "isLoading$", void 0);
    __decorate([
        Object(_angular_redux_store__WEBPACK_IMPORTED_MODULE_2__["select"])(['user', 'user']),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_5__["Observable"])
    ], AppComponent.prototype, "user$", void 0);
    __decorate([
        Object(_angular_redux_store__WEBPACK_IMPORTED_MODULE_2__["select"])(['user', 'isAdministrator']),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_5__["Observable"])
    ], AppComponent.prototype, "isAdministrator$", void 0);
    __decorate([
        Object(_angular_redux_store__WEBPACK_IMPORTED_MODULE_2__["select"])(['user', 'isElevated']),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_5__["Observable"])
    ], AppComponent.prototype, "isElevated$", void 0);
    __decorate([
        Object(_angular_redux_store__WEBPACK_IMPORTED_MODULE_2__["select"])(['user', 'isLoggedIn']),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_5__["Observable"])
    ], AppComponent.prototype, "isLoggedIn$", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'wfp-app',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            host: {
                class: 'fill',
                '[attr.screen]': 'screen',
                '[attr.page]': 'page',
                '[attr.information]': '!page'
            }
        }),
        __metadata("design:paramtypes", [_app_context__WEBPACK_IMPORTED_MODULE_1__["AppContext"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.context.ts":
/*!********************************!*\
  !*** ./src/app/app.context.ts ***!
  \********************************/
/*! exports provided: AppContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContext", function() { return AppContext; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _store_action_core_navigation_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../store/action/core/navigation.action */ "./src/store/action/core/navigation.action.ts");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular-redux/store */ "./node_modules/@angular-redux/store/lib/src/index.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_angular_redux_store__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_root_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../store/root.reducer */ "./src/store/root.reducer.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _services_core_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/core/service */ "./src/services/core/service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _store_action_core_user_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../store/action/core/user.action */ "./src/store/action/core/user.action.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var _ = lodash__WEBPACK_IMPORTED_MODULE_4___default.a || window._;
var AppContext = /** @class */ (function () {
    function AppContext(store, navigation, user, service, snackBar, dialog, router) {
        var _this = this;
        this.store = store;
        this.navigation = navigation;
        this.user = user;
        this.service = service;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.router = router;
        this._isEnglish = false;
        store.configureStore(_store_root_reducer__WEBPACK_IMPORTED_MODULE_3__["rootReducer"], _.cloneDeep(_store_root_reducer__WEBPACK_IMPORTED_MODULE_3__["INITIAL_STATE"]));
        var session = this.getCookie('session');
        if (session) {
            this.service.relogin(session).toPromise().then(function (u) {
                _this.user.set(u);
                navigation.go('connected');
            }).catch(function () {
                _this.navigation.reload();
            });
        }
        else {
            navigation.go('connected');
        }
        try {
            this.isEnglish = JSON.parse(localStorage.getItem('language')) || false;
        }
        catch (e) {
        }
    }
    Object.defineProperty(AppContext.prototype, "isEnglish", {
        get: function () {
            return this._isEnglish;
        },
        set: function (value) {
            this._isEnglish = value;
            try {
                localStorage.setItem('language', JSON.stringify(value));
            }
            catch (e) {
            }
        },
        enumerable: true,
        configurable: true
    });
    AppContext.prototype.getCookie = function (name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2)
            return parts.pop().split(";").shift();
    };
    AppContext.prototype.setCookie = function (cname, cvalue, exdays) {
        if (exdays === void 0) { exdays = 365; }
        if (cvalue === null) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
        else {
            document.cookie = cname + "=";
        }
    };
    AppContext.prototype.alert = function (message) {
        var snack = this.snackBar.open(message, 'Ok', {
            duration: 2000,
        });
        snack.onAction().subscribe(function () {
            snack.dismiss();
        });
    };
    AppContext = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_redux_store__WEBPACK_IMPORTED_MODULE_2__["NgRedux"], _store_action_core_navigation_action__WEBPACK_IMPORTED_MODULE_1__["NavigationActions"], _store_action_core_user_action__WEBPACK_IMPORTED_MODULE_8__["UserActions"], _services_core_service__WEBPACK_IMPORTED_MODULE_5__["Service"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSnackBar"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialog"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"]])
    ], AppContext);
    return AppContext;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ "./node_modules/reflect-metadata/Reflect.js");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/esm5/sidenav.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular-redux/store */ "./node_modules/@angular-redux/store/lib/src/index.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_angular_redux_store__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_context__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./app.context */ "./src/app/app.context.ts");
/* harmony import */ var _store_action_core_navigation_action__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./../store/action/core/navigation.action */ "./src/store/action/core/navigation.action.ts");
/* harmony import */ var _pages_core_user_user_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./pages/core/user/user.component */ "./src/app/pages/core/user/user.component.ts");
/* harmony import */ var _pages_core_register_register_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./pages/core/register/register.component */ "./src/app/pages/core/register/register.component.ts");
/* harmony import */ var _services_core_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../services/core/service */ "./src/services/core/service.ts");
/* harmony import */ var _pages_core_login_login_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./pages/core/login/login.component */ "./src/app/pages/core/login/login.component.ts");
/* harmony import */ var _pages_core_search_search_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./pages/core/search/search.component */ "./src/app/pages/core/search/search.component.ts");
/* harmony import */ var _directives_scroll_directive__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./directives/scroll.directive */ "./src/app/directives/scroll.directive.ts");
/* harmony import */ var _pages_information_information_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./pages/information/information.component */ "./src/app/pages/information/information.component.ts");
/* harmony import */ var _store_action_core_user_action__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../store/action/core/user.action */ "./src/store/action/core/user.action.ts");
/* harmony import */ var _pages_progress_progress_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./pages/progress/progress.component */ "./src/app/pages/progress/progress.component.ts");
/* harmony import */ var _pipes_item_type_pipe__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./pipes/item-type.pipe */ "./src/app/pipes/item-type.pipe.ts");
/* harmony import */ var _pages_text_editor_text_editor_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./pages/text-editor/text-editor.component */ "./src/app/pages/text-editor/text-editor.component.ts");
/* harmony import */ var _pipes_new_line_pipe__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./pipes/new-line.pipe */ "./src/app/pipes/new-line.pipe.ts");
/* harmony import */ var _pipes_number_to_array_pipe__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./pipes/number-to-array.pipe */ "./src/app/pipes/number-to-array.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















// Components

// Meta

// Store














var appRoutes = [
    { path: "progress", component: _pages_progress_progress_component__WEBPACK_IMPORTED_MODULE_31__["ProgressComponent"] },
    { path: "", component: _pages_information_information_component__WEBPACK_IMPORTED_MODULE_29__["InformationComponent"] },
    { path: "**", redirectTo: "progress" }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"].forRoot(appRoutes, { useHash: true }),
                _angular_material_table__WEBPACK_IMPORTED_MODULE_16__["MatTableModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_15__["MatSelectModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__["MatFormFieldModule"],
                _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__["MatSidenavModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__["MatCheckboxModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButtonModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIconModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__["MatToolbarModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__["MatDialogModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_17__["MatSnackBarModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_18__["MatInputModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _angular_redux_store__WEBPACK_IMPORTED_MODULE_19__["NgReduxModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"]
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_20__["AppComponent"],
                // Components
                _pages_core_user_user_component__WEBPACK_IMPORTED_MODULE_23__["UserComponent"],
                _pages_core_register_register_component__WEBPACK_IMPORTED_MODULE_24__["RegisterComponent"],
                _pages_core_login_login_component__WEBPACK_IMPORTED_MODULE_26__["LoginComponent"],
                _pages_core_search_search_component__WEBPACK_IMPORTED_MODULE_27__["SearchComponent"],
                // Directives
                _directives_scroll_directive__WEBPACK_IMPORTED_MODULE_28__["ScrollDirective"],
                _pages_information_information_component__WEBPACK_IMPORTED_MODULE_29__["InformationComponent"],
                _pages_progress_progress_component__WEBPACK_IMPORTED_MODULE_31__["ProgressComponent"],
                _pipes_item_type_pipe__WEBPACK_IMPORTED_MODULE_32__["ItemTypePipe"],
                _pipes_new_line_pipe__WEBPACK_IMPORTED_MODULE_34__["NewLinePipe"],
                _pages_text_editor_text_editor_component__WEBPACK_IMPORTED_MODULE_33__["TextEditorComponent"],
                _pipes_number_to_array_pipe__WEBPACK_IMPORTED_MODULE_35__["NumberToArrayPipe"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_20__["AppComponent"]],
            entryComponents: [_pages_core_login_login_component__WEBPACK_IMPORTED_MODULE_26__["LoginComponent"], _pages_core_register_register_component__WEBPACK_IMPORTED_MODULE_24__["RegisterComponent"], _pages_text_editor_text_editor_component__WEBPACK_IMPORTED_MODULE_33__["TextEditorComponent"]],
            providers: [
                _app_context__WEBPACK_IMPORTED_MODULE_21__["AppContext"],
                // Store
                _store_action_core_navigation_action__WEBPACK_IMPORTED_MODULE_22__["NavigationActions"],
                _store_action_core_user_action__WEBPACK_IMPORTED_MODULE_30__["UserActions"],
                // Services
                _services_core_service__WEBPACK_IMPORTED_MODULE_25__["Service"]
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/directives/scroll.directive.ts":
/*!************************************************!*\
  !*** ./src/app/directives/scroll.directive.ts ***!
  \************************************************/
/*! exports provided: ScrollDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollDirective", function() { return ScrollDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ScrollDirective = /** @class */ (function () {
    function ScrollDirective(element) {
        this.element = element;
        this.isScrolledManually = false;
    }
    ScrollDirective.prototype.ngOnDestroy = function () {
        if (this.scrollElement) {
            this.scrollElement.removeEventListener('scroll', this.cancelWrapper);
        }
    };
    ScrollDirective.prototype.cancel = function () {
        if (this.lastDirectiveScrollTop === this.scrollElement.scrollTop)
            return;
        this.isScrolledManually = true;
    };
    ScrollDirective.prototype.scroll = function () {
        var _this = this;
        if (this.isScrolledManually) {
            return;
        }
        var diff = this.targetElement.offsetTop - this.scrollElement.scrollTop;
        this.lastDirectiveScrollTop = Math.floor(this.scrollElement.scrollTop + (diff < 0 ? -1 : 1) * Math.min(Math.abs(diff), this.step));
        this.scrollElement.scrollTop = this.lastDirectiveScrollTop;
        if (this.targetElement.offsetTop !== this.scrollElement.scrollTop && this.scrollElement.scrollTop === this.lastDirectiveScrollTop) {
            this.scrollElement.scrollTimeout = setTimeout(function () { return _this.scroll(); }, 25);
        }
        else {
            this.targetElement.classList.add('scrolled');
            setTimeout(function () {
                _this.targetElement.classList.remove('scrolled');
            }, 2000);
        }
    };
    ScrollDirective.prototype.scrollTo = function () {
        var _this = this;
        if (!this.targetElement) {
            this.targetElement = document.getElementById(this.target.substr(1));
            this.scrollElement = this.findScrollParent(this.targetElement);
            this.cancelWrapper = function () { return _this.cancel(); };
            this.scrollElement.addEventListener('scroll', this.cancelWrapper);
        }
        if (this.scrollElement) {
            this.lastDirectiveScrollTop = this.scrollElement.scrollTop;
            this.isScrolledManually = false;
            var timeout = this.scrollElement.scrollTimeout;
            if (timeout) {
                clearTimeout(timeout);
            }
            this.step = Math.max(25, Math.abs(this.targetElement.offsetTop - this.scrollElement.scrollTop) / 10);
            this.scrollElement.scrollTimeout = setTimeout(function () { return _this.scroll(); }, 25);
        }
    };
    ScrollDirective.prototype.findScrollParent = function (element) {
        if (!element) {
            return null;
        }
        if (element.scrollHeight > element.clientHeight) {
            return element;
        }
        return this.findScrollParent(element.parentElement);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('scroll'),
        __metadata("design:type", String)
    ], ScrollDirective.prototype, "target", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ScrollDirective.prototype, "scrollTo", null);
    ScrollDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[scroll]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], ScrollDirective);
    return ScrollDirective;
}());



/***/ }),

/***/ "./src/app/pages/core/login/login.component.html":
/*!*******************************************************!*\
  !*** ./src/app/pages/core/login/login.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Login</h1>\r\n<mat-dialog-content>\r\n  <mat-form-field class=\"width-100\">\r\n    <input matInput placeholder=\"Username\" [(ngModel)]=\"id\" (keyup.enter)=\"login()\">\r\n  </mat-form-field>\r\n  <mat-form-field class=\"width-100\">\r\n    <input type=\"password\" matInput placeholder=\"Password\" [(ngModel)]=\"pass\" (keyup.enter)=\"login()\">\r\n  </mat-form-field>\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button [mat-dialog-close]=\"false\">Cancel</button>\r\n  <button mat-raised-button color=\"primary\" (click)=\"login()\">Login</button>\r\n</mat-dialog-actions>"

/***/ }),

/***/ "./src/app/pages/core/login/login.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/pages/core/login/login.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/core/login/login.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/core/login/login.component.ts ***!
  \*****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app.context */ "./src/app/app.context.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = /** @class */ (function () {
    function LoginComponent(context, change, dialog) {
        this.context = context;
        this.change = change;
        this.dialog = dialog;
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.context.navigation.loading(true);
        this.context.service.login(this.id, this.pass || '').toPromise().then(function (user) {
            _this.context.navigation.loading(false);
            _this.context.alert('Login successful');
            _this.context.user.set(user);
            _this.dialog.close(true);
        }).catch(function (err) {
            _this.context.navigation.loading(false);
            _this.context.alert('Login failed');
            _this.context.user.set(null);
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'wfp-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/pages/core/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/pages/core/login/login.component.scss")],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
        }),
        __metadata("design:paramtypes", [_app_context__WEBPACK_IMPORTED_MODULE_1__["AppContext"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/pages/core/register/register.component.html":
/*!*************************************************************!*\
  !*** ./src/app/pages/core/register/register.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Register</h1>\r\n<mat-dialog-content>\r\n  <mat-form-field class=\"width-100\">\r\n    <input matInput [(ngModel)]=\"name\" placeholder=\"Name\" value=\"\" (keyup.enter)=\"register()\">\r\n  </mat-form-field>\r\n  <mat-form-field class=\"width-100\">\r\n    <input matInput [(ngModel)]=\"id\" placeholder=\"Id\" value=\"\" (keyup.enter)=\"register()\">\r\n  </mat-form-field>\r\n  <mat-form-field class=\"width-100\">\r\n    <input type=\"password\" matInput [(ngModel)]=\"pass\" placeholder=\"Password\" value=\"\" (keyup.enter)=\"register()\">\r\n  </mat-form-field>\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button [mat-dialog-close]=\"false\">Cancel</button>\r\n  <button mat-raised-button color=\"primary\" [disabled]=\"id && id.length < 3 && name && name.length > 3 && pass && pass.length > 3\" (click)=\"register()\">Register</button>\r\n</mat-dialog-actions>"

/***/ }),

/***/ "./src/app/pages/core/register/register.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/pages/core/register/register.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/core/register/register.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/core/register/register.component.ts ***!
  \***********************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app.context */ "./src/app/app.context.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(context, change, dialog) {
        this.context = context;
        this.change = change;
        this.dialog = dialog;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.context.navigation.loading(true);
        this.context.service.addUser({
            id: this.id,
            name: this.name
        }, this.pass).toPromise().then(function () {
            _this.context.navigation.loading(false);
            _this.context.alert('User added');
            _this.dialog.close(true);
        }).catch(function (err) {
            _this.context.navigation.loading(false);
            _this.context.alert(err.message || err);
        });
        this.id = '';
        this.name = '';
        this.pass = '';
        this.change.markForCheck();
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'wfp-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/pages/core/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.scss */ "./src/app/pages/core/register/register.component.scss")],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
        }),
        __metadata("design:paramtypes", [_app_context__WEBPACK_IMPORTED_MODULE_1__["AppContext"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/pages/core/search/search.component.html":
/*!*********************************************************!*\
  !*** ./src/app/pages/core/search/search.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-form-field class=\"width-100\">\r\n  <input #name matInput placeholder=\"Name\" (keyup)=\"search(name.value)\">\r\n</mat-form-field>\r\n<div *ngFor=\"let item of list\" (click)=\"select(item.id)\">\r\n  <div>{{item.name}} ({{item.id}})</div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/core/search/search.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/pages/core/search/search.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/core/search/search.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/core/search/search.component.ts ***!
  \*******************************************************/
/*! exports provided: SearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchComponent", function() { return SearchComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app.context */ "./src/app/app.context.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchComponent = /** @class */ (function () {
    function SearchComponent(context, change) {
        this.context = context;
        this.change = change;
    }
    SearchComponent.prototype.ngOnInit = function () {
    };
    SearchComponent.prototype.search = function (value) {
        var _this = this;
        if (value && value.length > 2) {
            this.context.service.search(value).toPromise().then(function (l) {
                _this.list = l;
                _this.change.markForCheck();
            });
        }
        else {
            this.list = [];
            this.change.markForCheck();
        }
    };
    SearchComponent.prototype.select = function (id) {
        this.context.selectUser = id;
        this.context.navigation.go('connected:user');
    };
    SearchComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'wfp-search',
            template: __webpack_require__(/*! ./search.component.html */ "./src/app/pages/core/search/search.component.html"),
            styles: [__webpack_require__(/*! ./search.component.scss */ "./src/app/pages/core/search/search.component.scss")],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            host: {
                class: 'fill'
            }
        }),
        __metadata("design:paramtypes", [_app_context__WEBPACK_IMPORTED_MODULE_1__["AppContext"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], SearchComponent);
    return SearchComponent;
}());



/***/ }),

/***/ "./src/app/pages/core/user/user.component.html":
/*!*****************************************************!*\
  !*** ./src/app/pages/core/user/user.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-content\">\r\n\r\n</div>"

/***/ }),

/***/ "./src/app/pages/core/user/user.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/pages/core/user/user.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".role {\n  position: absolute;\n  top: 0;\n  right: 0; }\n  .role.role1 {\n    width: 3vh;\n    height: 1vh; }\n  .role.role2 {\n    width: 1vh;\n    height: 3vh; }\n  .role[role=administrator] {\n    background: red; }\n  .role[role=gamemaster] {\n    background: purple; }\n  .role[role=player] {\n    background: turquoise; }\n  .user {\n  text-align: center;\n  font-size: 2em; }\n  .admin {\n  text-align: center; }\n  input {\n  text-align: center; }\n  .mat-button {\n  font-size: 1em; }\n  .mat-button.slim {\n    padding: 0;\n    min-width: 0; }\n  img {\n  width: 5vh; }\n"

/***/ }),

/***/ "./src/app/pages/core/user/user.component.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/core/user/user.component.ts ***!
  \***************************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var UserComponent = /** @class */ (function () {
    function UserComponent() {
    }
    UserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'wfp-user',
            template: __webpack_require__(/*! ./user.component.html */ "./src/app/pages/core/user/user.component.html"),
            styles: [__webpack_require__(/*! ./user.component.scss */ "./src/app/pages/core/user/user.component.scss")],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            host: {
                class: 'fill scrollable'
            }
        })
    ], UserComponent);
    return UserComponent;
}());



/***/ }),

/***/ "./src/app/pages/information/information.component.html":
/*!**************************************************************!*\
  !*** ./src/app/pages/information/information.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  Warframe Tracker\r\n\r\n  <a class=\"width-100\" mat-raised-button type=\"button\" routerLink=\"/progress\">Go to the progress page</a>\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/pages/information/information.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/pages/information/information.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  overflow: auto; }\n"

/***/ }),

/***/ "./src/app/pages/information/information.component.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/information/information.component.ts ***!
  \************************************************************/
/*! exports provided: InformationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InformationComponent", function() { return InformationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app.context */ "./src/app/app.context.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InformationComponent = /** @class */ (function () {
    function InformationComponent(context, change) {
        this.context = context;
        this.change = change;
    }
    InformationComponent.prototype.ngOnInit = function () {
    };
    InformationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'wfp-information',
            template: __webpack_require__(/*! ./information.component.html */ "./src/app/pages/information/information.component.html"),
            styles: [__webpack_require__(/*! ./information.component.scss */ "./src/app/pages/information/information.component.scss")],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            host: {
                class: 'fill scrollable'
            }
        }),
        __metadata("design:paramtypes", [_app_context__WEBPACK_IMPORTED_MODULE_1__["AppContext"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], InformationComponent);
    return InformationComponent;
}());



/***/ }),

/***/ "./src/app/pages/progress/progress.component.html":
/*!********************************************************!*\
  !*** ./src/app/pages/progress/progress.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"filterText\" placeholder=\"Filter\">\n  </mat-form-field>\n  <mat-form-field>\n    <mat-select placeholder=\"Type\" [(value)]=\"filterType\">\n      <mat-option [value]=\"-1\">All</mat-option>\n      <mat-option [value]=\"4\">Warframe</mat-option>\n      <mat-option [value]=\"1\">Primary</mat-option>\n      <mat-option [value]=\"2\">Secondary</mat-option>\n      <mat-option [value]=\"3\">Melee</mat-option>\n      <mat-option [value]=\"5\">Archwing</mat-option>\n      <mat-option [value]=\"6\">ArchGun</mat-option>\n      <mat-option [value]=\"7\">ArchMelee</mat-option>\n      <mat-option [value]=\"8\">Sentinel</mat-option>\n      <mat-option [value]=\"9\">Companion</mat-option>\n      <mat-option [value]=\"10\">Amp</mat-option>\n      <mat-option [value]=\"11\">Zaw strike</mat-option>\n      <mat-option [value]=\"12\">Zaw grip</mat-option>\n      <mat-option [value]=\"13\">Zaw link</mat-option>\n      <mat-option [value]=\"14\">Sentinel weapon</mat-option>\n      <mat-option [value]=\"0\">Unknown</mat-option>\n    </mat-select>\n  </mat-form-field>\n  <mat-form-field>\n    <mat-select placeholder=\"Progress\" [(value)]=\"progress\">\n      <mat-option [value]=\"-1\">All</mat-option>\n      <mat-option [value]=\"0\">No progress</mat-option>\n      <mat-option [value]=\"1\">In progress</mat-option>\n      <mat-option [value]=\"2\">Finished</mat-option>\n    </mat-select>\n  </mat-form-field>\n</div>\n<div class=\"scrollable\">\n  <mat-table #table [dataSource]=\"dataSource\" matSort matSortActive=\"name\" matSortDirection=\"asc\">\n    <!-- Name Column -->\n    <ng-container matColumnDef=\"tree\">\n      <mat-header-cell *matHeaderCellDef></mat-header-cell>\n      <mat-cell *matCellDef=\"let item\">\n        <button *ngIf=\"item.hasChildren\" mat-icon-button (click)=\"item.isOpen = !item.isOpen; filterItems();\">\n          <mat-icon *ngIf=\"!item.isOpen\">keyboard_arrow_right</mat-icon>\n          <mat-icon *ngIf=\"item.isOpen\">keyboard_arrow_down</mat-icon>\n        </button>\n      </mat-cell>\n    </ng-container>\n\n    <!-- Name Column -->\n    <ng-container matColumnDef=\"name\">\n      <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>\n      <mat-cell *matCellDef=\"let item\">\n        <div *ngIf=\"item.owner\" class=\"child\"></div>{{item.name}}</mat-cell>\n    </ng-container>\n\n    <ng-container matColumnDef=\"type\">\n      <mat-header-cell *matHeaderCellDef mat-sort-header>Type</mat-header-cell>\n      <mat-cell *matCellDef=\"let item\">{{item.type | itemType}}</mat-cell>\n    </ng-container>\n\n    <ng-container matColumnDef=\"progress\">\n      <mat-header-cell *matHeaderCellDef mat-sort-header>Progress</mat-header-cell>\n      <mat-cell *matCellDef=\"let item\">\n        <mat-checkbox *ngFor=\"let p of (item.maxProgress | numberToArray)\" [attr.data-progress]=\"p\" [checked]=\"item.progress > p\" (change)=\"setProgress(item, !(item.progress > p), p + 1)\"></mat-checkbox>\n      </mat-cell>\n    </ng-container>\n\n    <ng-container matColumnDef=\"description\">\n      <mat-header-cell *matHeaderCellDef mat-sort-header>Description</mat-header-cell>\n      <mat-cell *matCellDef=\"let item\">\n        <div>\n          <button *ngIf=\"isElevated\" mat-icon-button (click)=\"editDescription(item)\">\n            <mat-icon>edit</mat-icon>\n          </button>{{item.description}}</div>\n        <div [innerHtml]=\"item.location | newLine\"></div>\n      </mat-cell>\n    </ng-container>\n\n    <ng-container matColumnDef=\"note\">\n      <mat-header-cell *matHeaderCellDef mat-sort-header>Note</mat-header-cell>\n      <mat-cell *matCellDef=\"let item\">\n        <button mat-icon-button (click)=\"editNote(item)\">\n          <mat-icon>edit</mat-icon>\n        </button>{{item.note}}</mat-cell>\n    </ng-container>\n\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n  </mat-table>\n</div>"

/***/ }),

/***/ "./src/app/pages/progress/progress.component.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/progress/progress.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-row {\n  position: relative; }\n\nmat-cell {\n  overflow: visible; }\n\n.scrollable {\n  position: absolute;\n  top: 65.5px;\n  left: 0;\n  right: 0;\n  bottom: 0; }\n\n.mat-column-tree {\n  min-width: 40px;\n  flex-grow: 0; }\n\n.mat-column-tree .mat-icon {\n    vertical-align: middle; }\n\nmat-row mat-cell.mat-column-note button, mat-row mat-cell.mat-column-description button {\n  display: none; }\n\nmat-row:hover mat-cell.mat-column-note button, mat-row:hover mat-cell.mat-column-description button {\n  display: block;\n  position: absolute;\n  top: 0; }\n\n.mat-column-name .child {\n  display: inline-block;\n  width: 20px; }\n"

/***/ }),

/***/ "./src/app/pages/progress/progress.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/progress/progress.component.ts ***!
  \******************************************************/
/*! exports provided: ProgressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressComponent", function() { return ProgressComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app.context */ "./src/app/app.context.ts");
/* harmony import */ var _text_editor_text_editor_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../text-editor/text-editor.component */ "./src/app/pages/text-editor/text-editor.component.ts");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular-redux/store */ "./node_modules/@angular-redux/store/lib/src/index.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_angular_redux_store__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _core_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/login/login.component */ "./src/app/pages/core/login/login.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProgressComponent = /** @class */ (function () {
    function ProgressComponent(context, change) {
        var _this = this;
        this.context = context;
        this.change = change;
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableDataSource"]([]);
        this._filterType = 4;
        this._progress = -1;
        this.displayedColumns = [
            "tree",
            "name",
            "type",
            "progress",
            "description",
            "note"
        ];
        this.filterCount = 0;
        this.isElevated$.subscribe(function (s) {
            _this.isElevated = s;
            _this.change.markForCheck();
        });
    }
    Object.defineProperty(ProgressComponent.prototype, "filterText", {
        get: function () {
            return this._filterText;
        },
        set: function (value) {
            var _this = this;
            if (this._filterTimeout) {
                clearTimeout(this._filterTimeout);
            }
            if (value.length > 0 && value.length < 4)
                return;
            this._filterTimeout = setTimeout(function () {
                _this._filterText = value;
                _this._filterRegex = new RegExp(value, "i");
                _this.filterItems();
            }, 250);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressComponent.prototype, "filterType", {
        get: function () {
            return this._filterType;
        },
        set: function (value) {
            this._filterType = value;
            this.filterItems();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressComponent.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        set: function (value) {
            this._progress = value;
            this.filterItems();
        },
        enumerable: true,
        configurable: true
    });
    ProgressComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.context.store.getState().user.isLoggedIn) {
            this.context.router.navigateByUrl("/");
            this.context.alert("Please log in.");
            var dialog = this.context.dialog.open(_core_login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"]);
            dialog.afterClosed().subscribe(function (value) {
                if (value) {
                    _this.context.router.navigateByUrl("/progress");
                    _this.init();
                }
            });
        }
        else {
            this.init();
        }
    };
    ProgressComponent.prototype.init = function () {
        var _this = this;
        this.context.navigation.loading(true);
        this.context.service
            .getItems()
            .toPromise()
            .then(function (items) {
            var itemIds = items
                .filter(function (f) { return !!f.ownerItemId; })
                .map(function (m) { return m.ownerItemId; })
                .sort();
            itemIds = itemIds.filter(function (v, i, a) { return i === 0 || v !== a[i - 1]; });
            var _loop_1 = function (item) {
                item.isOpen = false;
                item.hasChildren = _this.binaryIndexOf(itemIds, item.id) > -1;
                if (item.ownerItemId) {
                    item.owner = items.find(function (f) { return f.id == item.ownerItemId; });
                    if (!item.owner.children) {
                        item.owner.children = [item];
                    }
                    else {
                        item.owner.children.push(item);
                    }
                }
            };
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                _loop_1(item);
            }
            items = items.sort(function (item1, item2) {
                return (item1.owner
                    ? item1.owner.name + "   $$$" + item1.name
                    : item1.name + "   $$$").localeCompare(item2.owner ? item2.owner.name + "   $$$" + item2.name : item2.name + "   $$$");
            });
            _this.items = items;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableDataSource"](_this.items);
            var defaultAccessor = _this.dataSource.sortingDataAccessor;
            _this.dataSource.sortingDataAccessor = function (item, sort) {
                if (sort === "name") {
                    return item.owner ? item.owner.name + "   $$$" + item.name : item.name + "   $$$";
                }
                else {
                    return defaultAccessor(item, sort);
                }
            };
            _this.dataSource.sort = _this.sort;
            _this.dataSource.filterPredicate = function (i, t) { return _this.filterByCount(i, t); };
            _this.filterItems();
            _this.context.navigation.loading(false);
            _this.change.markForCheck();
        })
            .catch(function (err) {
            _this.context.alert(err.message || err);
            _this.context.navigation.loading(false);
        });
    };
    ProgressComponent.prototype.ngAfterViewInit = function () { };
    ProgressComponent.prototype.binaryIndexOf = function (array, searchElement) {
        var minIndex = 0;
        var maxIndex = array.length - 1;
        var currentIndex;
        var currentElement;
        while (minIndex <= maxIndex) {
            currentIndex = ((minIndex + maxIndex) / 2) | 0;
            currentElement = array[currentIndex];
            if (currentElement < searchElement) {
                minIndex = currentIndex + 1;
            }
            else if (currentElement > searchElement) {
                maxIndex = currentIndex - 1;
            }
            else {
                return currentIndex;
            }
        }
        return -1;
    };
    ProgressComponent.prototype.filterItems = function () {
        this.filterCount = 0;
        this.dataSource.filter = this.dataSource.filter === "1" ? "2" : "1";
    };
    ProgressComponent.prototype.filterByCount = function (item, text) {
        // if (this.filterCount > 100) {
        //   return false;
        // }
        var filter = this.filterItem(item, text);
        if (filter) {
            this.filterCount++;
        }
        return filter;
    };
    ProgressComponent.prototype.filterItem = function (item, text) {
        if (item.owner && !item.owner.isOpen) {
            return false;
        }
        if (this._progress !== -1 && (item.progress || 0) !== this._progress) {
            return false;
        }
        if (this._filterType !== -1 && item.type !== this._filterType) {
            return false;
        }
        if (this._filterRegex) {
            if (item.name && this._filterRegex.test(item.name)) {
                return true;
            }
            if (item.description && this._filterRegex.test(item.description)) {
                return true;
            }
            if (item.note && this._filterRegex.test(item.note)) {
                return true;
            }
        }
        else {
            return true;
        }
        return false;
    };
    ProgressComponent.prototype.setProgress = function (item, checked, value) {
        var _this = this;
        item.progress = value;
        this.context.service
            .setProgress(item.id, checked ? value : value - 1)
            .toPromise()
            .then(function () {
            if (checked && item.children) {
                for (var _i = 0, _a = item.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    if (child.progress != child.maxProgress) {
                        child.progress = child.maxProgress;
                        _this.context.service
                            .setProgress(child.id, value)
                            .toPromise()
                            .catch(function (err) {
                            _this.context.alert(err.message || err);
                            _this.init();
                        });
                    }
                }
            }
        })
            .catch(function (err) {
            _this.context.alert(err.message || err);
            _this.init();
        });
    };
    ProgressComponent.prototype.editNote = function (item) {
        var _this = this;
        this.context.dialog
            .open(_text_editor_text_editor_component__WEBPACK_IMPORTED_MODULE_2__["TextEditorComponent"], {
            width: "50%",
            data: { title: "Note", text: item.note }
        })
            .afterClosed()
            .subscribe(function (res) {
            if (res !== false) {
                item.note = res;
                _this.context.service
                    .setNote(item.id, res)
                    .toPromise()
                    .catch(function (err) {
                    _this.context.alert(err.message || err);
                });
                _this.change.markForCheck();
            }
        });
    };
    ProgressComponent.prototype.editDescription = function (item) {
        var _this = this;
        this.context.dialog
            .open(_text_editor_text_editor_component__WEBPACK_IMPORTED_MODULE_2__["TextEditorComponent"], {
            width: "50%",
            data: { title: "Description", text: item.description }
        })
            .afterClosed()
            .subscribe(function (res) {
            if (res !== false) {
                item.description = res;
                _this.context.service
                    .setDescription(item.id, res)
                    .toPromise()
                    .catch(function (err) {
                    _this.context.alert(err.message || err);
                });
                _this.change.markForCheck();
            }
        });
    };
    __decorate([
        Object(_angular_redux_store__WEBPACK_IMPORTED_MODULE_3__["select"])(["user", "isElevated"]),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_6__["Observable"])
    ], ProgressComponent.prototype, "isElevated$", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSort"])
    ], ProgressComponent.prototype, "sort", void 0);
    ProgressComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "wfp-progress",
            template: __webpack_require__(/*! ./progress.component.html */ "./src/app/pages/progress/progress.component.html"),
            styles: [__webpack_require__(/*! ./progress.component.scss */ "./src/app/pages/progress/progress.component.scss")],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            host: {
                class: "fill scrollable"
            }
        }),
        __metadata("design:paramtypes", [_app_context__WEBPACK_IMPORTED_MODULE_1__["AppContext"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], ProgressComponent);
    return ProgressComponent;
}());



/***/ }),

/***/ "./src/app/pages/text-editor/text-editor.component.html":
/*!**************************************************************!*\
  !*** ./src/app/pages/text-editor/text-editor.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{title}}</h1>\n<mat-dialog-content>\n  <mat-form-field class=\"width-100\">\n    <textarea matInput [(ngModel)]=\"text\"></textarea>\n  </mat-form-field>\n</mat-dialog-content>\n<mat-dialog-actions align=\"end\">\n  <button mat-button [mat-dialog-close]=\"false\">Cancel</button>\n  <button mat-raised-button color=\"primary\" (click)=\"ok()\">Ok</button>\n</mat-dialog-actions>"

/***/ }),

/***/ "./src/app/pages/text-editor/text-editor.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/pages/text-editor/text-editor.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/text-editor/text-editor.component.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/text-editor/text-editor.component.ts ***!
  \************************************************************/
/*! exports provided: TextEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextEditorComponent", function() { return TextEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app.context */ "./src/app/app.context.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var TextEditorComponent = /** @class */ (function () {
    function TextEditorComponent(context, change, dialog, data) {
        this.context = context;
        this.change = change;
        this.dialog = dialog;
        this.data = data;
        this.title = data.title;
        this.text = data.text;
    }
    TextEditorComponent.prototype.ngOnInit = function () {
    };
    TextEditorComponent.prototype.ok = function () {
        this.dialog.close(this.text);
    };
    TextEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'wfp-text-editor',
            template: __webpack_require__(/*! ./text-editor.component.html */ "./src/app/pages/text-editor/text-editor.component.html"),
            styles: [__webpack_require__(/*! ./text-editor.component.scss */ "./src/app/pages/text-editor/text-editor.component.scss")],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
        }),
        __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_app_context__WEBPACK_IMPORTED_MODULE_1__["AppContext"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], TextEditorComponent);
    return TextEditorComponent;
}());



/***/ }),

/***/ "./src/app/pipes/item-type.pipe.ts":
/*!*****************************************!*\
  !*** ./src/app/pipes/item-type.pipe.ts ***!
  \*****************************************/
/*! exports provided: ItemTypePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemTypePipe", function() { return ItemTypePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _data_progress_ItemType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/progress/ItemType */ "./src/data/progress/ItemType.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ItemTypePipe = /** @class */ (function () {
    function ItemTypePipe() {
    }
    ItemTypePipe.prototype.transform = function (value, args) {
        return _data_progress_ItemType__WEBPACK_IMPORTED_MODULE_1__["ItemType"][value];
    };
    ItemTypePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'itemType'
        })
    ], ItemTypePipe);
    return ItemTypePipe;
}());



/***/ }),

/***/ "./src/app/pipes/new-line.pipe.ts":
/*!****************************************!*\
  !*** ./src/app/pipes/new-line.pipe.ts ***!
  \****************************************/
/*! exports provided: NewLinePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewLinePipe", function() { return NewLinePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NewLinePipe = /** @class */ (function () {
    function NewLinePipe() {
    }
    NewLinePipe.prototype.transform = function (value) {
        if (value) {
            return value.replace(/\n/g, '<br/>');
        }
        return value;
    };
    NewLinePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'newLine'
        })
    ], NewLinePipe);
    return NewLinePipe;
}());



/***/ }),

/***/ "./src/app/pipes/number-to-array.pipe.ts":
/*!***********************************************!*\
  !*** ./src/app/pipes/number-to-array.pipe.ts ***!
  \***********************************************/
/*! exports provided: NumberToArrayPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberToArrayPipe", function() { return NumberToArrayPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NumberToArrayPipe = /** @class */ (function () {
    function NumberToArrayPipe() {
    }
    NumberToArrayPipe.prototype.transform = function (value) {
        var arr = [];
        for (var i = 0; i < value; ++i) {
            arr.push(i);
        }
        return arr;
    };
    NumberToArrayPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'numberToArray'
        })
    ], NumberToArrayPipe);
    return NumberToArrayPipe;
}());



/***/ }),

/***/ "./src/data/core/user.ts":
/*!*******************************!*\
  !*** ./src/data/core/user.ts ***!
  \*******************************/
/*! exports provided: Role */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Role", function() { return Role; });
var Role;
(function (Role) {
    Role[Role["User"] = 0] = "User";
    Role[Role["Elevated"] = 512] = "Elevated";
    Role[Role["Administrator"] = 1024] = "Administrator";
})(Role || (Role = {}));


/***/ }),

/***/ "./src/data/progress/ItemType.ts":
/*!***************************************!*\
  !*** ./src/data/progress/ItemType.ts ***!
  \***************************************/
/*! exports provided: ItemType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemType", function() { return ItemType; });
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
})(ItemType || (ItemType = {}));


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");


setTimeout(function () { return Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_0__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"]); });


/***/ }),

/***/ "./src/services/core/service.ts":
/*!**************************************!*\
  !*** ./src/services/core/service.ts ***!
  \**************************************/
/*! exports provided: UserAction, Service */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAction", function() { return UserAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Service", function() { return Service; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserAction;
(function (UserAction) {
    UserAction[UserAction["role"] = 0] = "role";
    UserAction[UserAction["pass"] = 1] = "pass";
})(UserAction || (UserAction = {}));
var Service = /** @class */ (function () {
    function Service(http) {
        this.http = http;
    }
    Service.prototype.login = function (id, pass) {
        return this.http.put('api/login', { id: id, pass: pass });
    };
    Service.prototype.relogin = function (id) {
        return this.http.put('api/relogin', { id: id });
    };
    Service.prototype.getUser = function (id) {
        return this.http.get('api/users/' + id);
    };
    Service.prototype.addUser = function (user, pass) {
        return this.http.post('api/users', { user: user, pass: pass });
    };
    Service.prototype.updateUser = function (id, action, value) {
        return this.http.put('api/users', {
            userId: id,
            action: UserAction[action],
            value: value
        });
    };
    Service.prototype.search = function (value) {
        return this.http.get('api/users?search=' + encodeURIComponent(value));
    };
    Service.prototype.getItems = function () {
        return this.http.get('api/item');
    };
    Service.prototype.setProgress = function (itemId, value) {
        return this.http.put('api/item/progress', { id: itemId, value: value });
    };
    Service.prototype.setNote = function (itemId, value) {
        return this.http.put('api/item/note', { id: itemId, value: value });
    };
    Service.prototype.setDescription = function (itemId, value) {
        return this.http.put('api/item/description', { id: itemId, value: value });
    };
    Service = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], Service);
    return Service;
}());



/***/ }),

/***/ "./src/store/action/core/navigation.action.ts":
/*!****************************************************!*\
  !*** ./src/store/action/core/navigation.action.ts ***!
  \****************************************************/
/*! exports provided: NavigationActions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationActions", function() { return NavigationActions; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular-redux/store */ "./node_modules/@angular-redux/store/lib/src/index.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_angular_redux_store__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NavigationActions = /** @class */ (function () {
    function NavigationActions(store) {
        this.store = store;
    }
    NavigationActions_1 = NavigationActions;
    NavigationActions.prototype.session = function (session) {
        this.store.dispatch({ type: NavigationActions_1.NAVIGATION_SESSION, address: session });
    };
    /** Change address */
    NavigationActions.prototype.go = function (address) {
        this.store.dispatch({ type: NavigationActions_1.NAVIGATION_GO, address: address });
    };
    /** Go back to the previous screen+page or until the address reached */
    NavigationActions.prototype.back = function (address) {
        if (address === void 0) { address = null; }
        this.store.dispatch({ type: NavigationActions_1.NAVIGATION_BACK, address: address });
    };
    NavigationActions.prototype.reload = function () {
        location.reload();
    };
    NavigationActions.prototype.loading = function (value) {
        this.store.dispatch({ type: NavigationActions_1.NAVIGATION_LOADING, loading: value });
    };
    var NavigationActions_1;
    NavigationActions.NAVIGATION_SESSION = "NAVIGATION_SESSION";
    NavigationActions.NAVIGATION_GO = "NAVIGATION_GO";
    NavigationActions.NAVIGATION_BACK = "NAVIGATION_BACK";
    NavigationActions.NAVIGATION_LOADING = "NAVIGATION_LOADING";
    NavigationActions = NavigationActions_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_redux_store__WEBPACK_IMPORTED_MODULE_1__["NgRedux"]])
    ], NavigationActions);
    return NavigationActions;
}());



/***/ }),

/***/ "./src/store/action/core/user.action.ts":
/*!**********************************************!*\
  !*** ./src/store/action/core/user.action.ts ***!
  \**********************************************/
/*! exports provided: UserActions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserActions", function() { return UserActions; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular-redux/store */ "./node_modules/@angular-redux/store/lib/src/index.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_angular_redux_store__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserActions = /** @class */ (function () {
    function UserActions(store) {
        this.store = store;
    }
    UserActions_1 = UserActions;
    UserActions.prototype.set = function (user) {
        this.store.dispatch({ type: UserActions_1.USER_SET, user: user });
    };
    var UserActions_1;
    UserActions.USER_SET = "USER_SET";
    UserActions = UserActions_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_redux_store__WEBPACK_IMPORTED_MODULE_1__["NgRedux"]])
    ], UserActions);
    return UserActions;
}());



/***/ }),

/***/ "./src/store/reducer/core/navigation.reducer.ts":
/*!******************************************************!*\
  !*** ./src/store/reducer/core/navigation.reducer.ts ***!
  \******************************************************/
/*! exports provided: INITIAL_STATE, navigationReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INITIAL_STATE", function() { return INITIAL_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigationReducer", function() { return navigationReducer; });
/* harmony import */ var _action_core_navigation_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../action/core/navigation.action */ "./src/store/action/core/navigation.action.ts");
/* harmony import */ var _state_core_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../state/core/navigation */ "./src/store/state/core/navigation.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);



var _ = lodash__WEBPACK_IMPORTED_MODULE_2___default.a || window._;
var INITIAL_STATE = new _state_core_navigation__WEBPACK_IMPORTED_MODULE_1__["NavigationState"]('connect');
function navigationReducer(state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    if (action === void 0) { action = null; }
    if (!action)
        return state;
    switch (action.type) {
        case _action_core_navigation_action__WEBPACK_IMPORTED_MODULE_0__["NavigationActions"].NAVIGATION_GO:
            state = _.cloneDeep(state);
            state.address = action.address;
            break;
        case _action_core_navigation_action__WEBPACK_IMPORTED_MODULE_0__["NavigationActions"].NAVIGATION_SESSION:
            state = _.cloneDeep(state);
            state.session = action.address;
            break;
        case _action_core_navigation_action__WEBPACK_IMPORTED_MODULE_0__["NavigationActions"].NAVIGATION_BACK:
            state = _.cloneDeep(state);
            do {
                state.address = state.history.pop();
            } while (action.address && state.address !== action.address && state.history.length > 0);
            if (action.address && state.address != action.address) {
                state.address = action.address;
            }
            break;
        case _action_core_navigation_action__WEBPACK_IMPORTED_MODULE_0__["NavigationActions"].NAVIGATION_LOADING:
            state = _.cloneDeep(state);
            state.isLoading = action.loading;
            break;
    }
    return state;
}


/***/ }),

/***/ "./src/store/reducer/core/user.reducer.ts":
/*!************************************************!*\
  !*** ./src/store/reducer/core/user.reducer.ts ***!
  \************************************************/
/*! exports provided: INITIAL_STATE, userReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INITIAL_STATE", function() { return INITIAL_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userReducer", function() { return userReducer; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _action_core_user_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../action/core/user.action */ "./src/store/action/core/user.action.ts");
/* harmony import */ var _state_core_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../state/core/user */ "./src/store/state/core/user.ts");



var _ = lodash__WEBPACK_IMPORTED_MODULE_0___default.a || window._;
var INITIAL_STATE = new _state_core_user__WEBPACK_IMPORTED_MODULE_2__["UserState"]();
function userReducer(state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    if (action === void 0) { action = null; }
    if (!action)
        return state;
    switch (action.type) {
        case _action_core_user_action__WEBPACK_IMPORTED_MODULE_1__["UserActions"].USER_SET:
            state = _.cloneDeep(state);
            state.user = action.user;
            break;
    }
    return state;
}


/***/ }),

/***/ "./src/store/root.reducer.ts":
/*!***********************************!*\
  !*** ./src/store/root.reducer.ts ***!
  \***********************************/
/*! exports provided: INITIAL_STATE, rootReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INITIAL_STATE", function() { return INITIAL_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rootReducer", function() { return rootReducer; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _reducer_core_navigation_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducer/core/navigation.reducer */ "./src/store/reducer/core/navigation.reducer.ts");
/* harmony import */ var _reducer_core_user_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducer/core/user.reducer */ "./src/store/reducer/core/user.reducer.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);




var _ = lodash__WEBPACK_IMPORTED_MODULE_3___default.a || window._;
console.log(lodash__WEBPACK_IMPORTED_MODULE_3___default.a);
var INITIAL_STATE = {
    navigation: _.cloneDeep(Object(_reducer_core_navigation_reducer__WEBPACK_IMPORTED_MODULE_1__["navigationReducer"])()),
    user: _.cloneDeep(Object(_reducer_core_user_reducer__WEBPACK_IMPORTED_MODULE_2__["userReducer"])())
};
var combined = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
    navigation: _reducer_core_navigation_reducer__WEBPACK_IMPORTED_MODULE_1__["navigationReducer"],
    user: _reducer_core_user_reducer__WEBPACK_IMPORTED_MODULE_2__["userReducer"]
});
var rootReducer = function (state, action) {
    return combined(state, action);
};


/***/ }),

/***/ "./src/store/state/core/navigation.ts":
/*!********************************************!*\
  !*** ./src/store/state/core/navigation.ts ***!
  \********************************************/
/*! exports provided: NavigationState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationState", function() { return NavigationState; });
var NavigationState = /** @class */ (function () {
    function NavigationState(address) {
        if (address === void 0) { address = null; }
        this.history = [];
        this._loading = 0;
        this.address = address;
    }
    Object.defineProperty(NavigationState.prototype, "address", {
        get: function () { return this._address; },
        set: function (value) {
            if (this._address === value)
                return;
            var screen = this._screen;
            var page = this._page;
            this._address = value;
            if (value) {
                var index = value.indexOf(':');
                if (index > -1) {
                    this._screen = value.substr(0, index);
                    this._page = value.substr(index + 1);
                }
                else {
                    this._screen = value;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationState.prototype, "screen", {
        get: function () { return this._screen; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationState.prototype, "page", {
        get: function () { return this._page; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationState.prototype, "isLoading", {
        get: function () { return this._loading > 0; },
        set: function (value) { value ? this._loading++ : this._loading--; },
        enumerable: true,
        configurable: true
    });
    return NavigationState;
}());



/***/ }),

/***/ "./src/store/state/core/user.ts":
/*!**************************************!*\
  !*** ./src/store/state/core/user.ts ***!
  \**************************************/
/*! exports provided: UserState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserState", function() { return UserState; });
/* harmony import */ var _data_core_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../data/core/user */ "./src/data/core/user.ts");

var UserState = /** @class */ (function () {
    function UserState() {
    }
    Object.defineProperty(UserState.prototype, "isAdministrator", {
        get: function () {
            return this.user && this.user.role === _data_core_user__WEBPACK_IMPORTED_MODULE_0__["Role"].Administrator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserState.prototype, "isElevated", {
        get: function () {
            return this.user && (this.user.role === _data_core_user__WEBPACK_IMPORTED_MODULE_0__["Role"].Administrator || this.user.role === _data_core_user__WEBPACK_IMPORTED_MODULE_0__["Role"].Elevated);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserState.prototype, "isLoggedIn", {
        get: function () {
            return !!this.user;
        },
        enumerable: true,
        configurable: true
    });
    return UserState;
}());



/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Work\Codemancer\Projects\WarframeProgress\client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map