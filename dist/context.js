"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var url = require("url");
var querystring = require("querystring");
var logger_1 = require("./logger");
var Context = (function () {
    function Context(request, loggers, params) {
        this.request = request;
        this.loggers = loggers;
        this.params = params;
    }
    Context.prototype.query = function () {
        if (this.queryObj)
            return this.queryObj;
        var queryString = url.parse(this.request.url || '').query || '';
        var query = {};
        var queryObj = querystring.parse(queryString);
        var keys = Object.keys(queryObj);
        for (var i = keys.length - 1; i >= 0; i--) {
            if (typeof queryObj[keys[i]] === 'string') {
                query[keys[i]] = queryObj[keys[i]];
                continue;
            }
            query[keys[i]] = queryObj[keys[i]][0];
        }
        this.queryObj = query;
        return query;
    };
    Context.prototype.body = function () {
        var _this = this;
        var body = '';
        this.request.on('readable', function () {
            body += _this.request.read() || '';
        });
        return new Promise(function (resolve) {
            _this.request.on('end', function () {
                resolve(JSON.parse(body));
            });
        });
    };
    Context.prototype.pathname = function () {
        return url.parse(this.request.url || '').pathname || '';
    };
    Context.prototype.logDebug = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArrays([logger_1.LogLevel.Debug], msg));
    };
    Context.prototype.logInfo = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArrays([logger_1.LogLevel.Info], msg));
    };
    Context.prototype.logNotice = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArrays([logger_1.LogLevel.Notice], msg));
    };
    Context.prototype.logWarning = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArrays([logger_1.LogLevel.Warning], msg));
    };
    Context.prototype.logError = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArrays([logger_1.LogLevel.Error], msg));
    };
    Context.prototype.logCritical = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArrays([logger_1.LogLevel.Critical], msg));
    };
    Context.prototype.logAlert = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArrays([logger_1.LogLevel.Alert], msg));
    };
    Context.prototype.logEmergency = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArrays([logger_1.LogLevel.Emergency], msg));
    };
    Context.prototype.log = function (level) {
        var _a;
        var msg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            msg[_i - 1] = arguments[_i];
        }
        for (var i = this.loggers.length - 1; i >= 0; i--) {
            (_a = this.loggers[i]).log.apply(_a, __spreadArrays([this, level], msg));
        }
    };
    return Context;
}());
exports.default = Context;
//# sourceMappingURL=context.js.map