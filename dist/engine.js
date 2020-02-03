"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var url = require("url");
var route_1 = require("./route");
var context_1 = require("./context");
var response_1 = require("./response");
var middleware_1 = require("./middleware");
var Engine = (function () {
    function Engine() {
        this.getRoutes = [];
        this.putRoutes = [];
        this.patchRoutes = [];
        this.postRoutes = [];
        this.deleteRoutes = [];
        this.optionsRoutes = [];
        this.headRoutes = [];
        this.getRoutes = [];
        this.loggers = [];
    }
    Engine.prototype.serve = function (port) {
        var _this = this;
        var requestListener = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var u, routes, i, matches, params, j, ctx, j, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        u = url.parse(req.url || '');
                        switch (req.method) {
                            case route_1.HttpMethod.Get:
                                routes = this.getRoutes;
                                break;
                            case route_1.HttpMethod.Put:
                                routes = this.putRoutes;
                                break;
                            case route_1.HttpMethod.Patch:
                                routes = this.patchRoutes;
                                break;
                            case route_1.HttpMethod.Post:
                                routes = this.postRoutes;
                                break;
                            case route_1.HttpMethod.Delete:
                                routes = this.deleteRoutes;
                                break;
                            case route_1.HttpMethod.Options:
                                routes = this.optionsRoutes;
                                break;
                            case route_1.HttpMethod.Head:
                                routes = this.headRoutes;
                                break;
                            default:
                                throw Error("unrecognized method '" + req.method + "'");
                        }
                        i = routes.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3, 8];
                        matches = routes[i].regexp.exec(u.pathname || '');
                        if (!matches) {
                            return [3, 7];
                        }
                        params = {};
                        for (j = matches.length - 1; j > 0; j--) {
                            params[routes[i].params[j - 1]] = matches[j];
                        }
                        ctx = new context_1.default(req, this.loggers, params);
                        j = routes[i].middlewares.length - 1;
                        _a.label = 2;
                    case 2:
                        if (!(j >= 0)) return [3, 5];
                        return [4, routes[i].middlewares[j](ctx)];
                    case 3:
                        r = _a.sent();
                        if (r)
                            return [2, r.send(res)];
                        _a.label = 4;
                    case 4:
                        j--;
                        return [3, 2];
                    case 5: return [4, routes[i].handler(ctx)];
                    case 6: return [2, (_a.sent()).send(res)];
                    case 7:
                        i--;
                        return [3, 1];
                    case 8:
                        res.writeHead(response_1.HttpStatus.NotFound);
                        res.end('Page not found');
                        return [2];
                }
            });
        }); };
        var server = http.createServer(requestListener);
        server.listen(port);
    };
    Engine.prototype.middleware = function () {
        var middlewares = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middlewares[_i] = arguments[_i];
        }
        return new (middleware_1.default.bind.apply(middleware_1.default, __spreadArrays([void 0, this], middlewares)))();
    };
    Engine.prototype.get = function (path, handler) {
        var route = new route_1.default(route_1.HttpMethod.Get, path, handler);
        this.getRoutes = __spreadArrays([route], this.getRoutes);
        return route;
    };
    Engine.prototype.put = function (path, handler) {
        var route = new route_1.default(route_1.HttpMethod.Put, path, handler);
        this.putRoutes = __spreadArrays([route], this.putRoutes);
        return route;
    };
    Engine.prototype.patch = function (path, handler) {
        var route = new route_1.default(route_1.HttpMethod.Post, path, handler);
        this.patchRoutes = __spreadArrays([route], this.patchRoutes);
        return route;
    };
    Engine.prototype.post = function (path, handler) {
        var route = new route_1.default(route_1.HttpMethod.Patch, path, handler);
        this.postRoutes = __spreadArrays([route], this.postRoutes);
        return route;
    };
    Engine.prototype.delete = function (path, handler) {
        var route = new route_1.default(route_1.HttpMethod.Delete, path, handler);
        this.deleteRoutes = __spreadArrays([route], this.deleteRoutes);
        return route;
    };
    Engine.prototype.options = function (path, handler) {
        var route = new route_1.default(route_1.HttpMethod.Options, path, handler);
        this.optionsRoutes = __spreadArrays([route], this.optionsRoutes);
        return route;
    };
    Engine.prototype.head = function (path, handler) {
        var route = new route_1.default(route_1.HttpMethod.Head, path, handler);
        this.headRoutes = __spreadArrays([route], this.headRoutes);
        return route;
    };
    Engine.prototype.logger = function (logger) {
        this.loggers.push(logger);
    };
    return Engine;
}());
exports.default = Engine;
//# sourceMappingURL=engine.js.map