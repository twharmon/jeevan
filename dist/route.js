"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["Get"] = "GET";
    HttpMethod["Post"] = "POST";
    HttpMethod["Put"] = "PUT";
    HttpMethod["Patch"] = "PATCH";
    HttpMethod["Delete"] = "DELETE";
    HttpMethod["Options"] = "OPTIONS";
    HttpMethod["Head"] = "HEAD";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var PATH_PARAM_REGEXP = new RegExp(/{([^/]+?)}/g);
var Route = (function () {
    function Route(method, path, handler) {
        this.middlewares = [];
        this.handler = handler;
        this.method = method;
        this.params = [];
        if (path === '*') {
            this.regexp = new RegExp(/.*/);
            return;
        }
        var pathMatches = path.match(PATH_PARAM_REGEXP);
        if (pathMatches === null) {
            this.regexp = new RegExp('^' + path + '$', 'i');
            return;
        }
        for (var i = pathMatches.length - 1; i >= 0; i--) {
            this.params.push(pathMatches[i].replace('{', '').replace('}', ''));
        }
        var reStr = path.replace(PATH_PARAM_REGEXP, '([^/]+?)');
        this.regexp = new RegExp('^' + reStr + '$', 'i');
    }
    Route.prototype.use = function () {
        var middlewares = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middlewares[_i] = arguments[_i];
        }
        this.middlewares = middlewares;
    };
    return Route;
}());
exports.default = Route;
//# sourceMappingURL=route.js.map