"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Middleware = (function () {
    function Middleware(engine) {
        var middlewares = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            middlewares[_i - 1] = arguments[_i];
        }
        this.engine = engine;
        this.middlewares = middlewares;
    }
    Middleware.prototype.get = function (path, handler) {
        var _a;
        (_a = this.engine.get(path, handler)).use.apply(_a, this.middlewares);
    };
    Middleware.prototype.put = function (path, handler) {
        var _a;
        (_a = this.engine.put(path, handler)).use.apply(_a, this.middlewares);
    };
    Middleware.prototype.post = function (path, handler) {
        var _a;
        (_a = this.engine.post(path, handler)).use.apply(_a, this.middlewares);
    };
    Middleware.prototype.patch = function (path, handler) {
        var _a;
        (_a = this.engine.patch(path, handler)).use.apply(_a, this.middlewares);
    };
    Middleware.prototype.delete = function (path, handler) {
        var _a;
        (_a = this.engine.delete(path, handler)).use.apply(_a, this.middlewares);
    };
    Middleware.prototype.options = function (path, handler) {
        var _a;
        (_a = this.engine.options(path, handler)).use.apply(_a, this.middlewares);
    };
    Middleware.prototype.head = function (path, handler) {
        var _a;
        (_a = this.engine.head(path, handler)).use.apply(_a, this.middlewares);
    };
    return Middleware;
}());
exports.default = Middleware;
//# sourceMappingURL=middleware.js.map