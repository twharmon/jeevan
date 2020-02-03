"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["BadRequest"] = 400] = "BadRequest";
    HttpStatus[HttpStatus["NotFound"] = 404] = "NotFound";
    HttpStatus[HttpStatus["Conflict"] = 409] = "Conflict";
    HttpStatus[HttpStatus["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    HttpStatus[HttpStatus["InternalServerError"] = 500] = "InternalServerError";
})(HttpStatus = exports.HttpStatus || (exports.HttpStatus = {}));
var TextResponse = (function () {
    function TextResponse(text, status) {
        if (status === void 0) { status = HttpStatus.OK; }
        this.text = text;
        this.status = status;
    }
    TextResponse.prototype.send = function (res) {
        res.writeHead(this.status, { 'Content-Type': 'text/plain' });
        res.end(this.text);
    };
    return TextResponse;
}());
exports.TextResponse = TextResponse;
var JSONResponse = (function () {
    function JSONResponse(obj, status) {
        if (status === void 0) { status = HttpStatus.OK; }
        this.obj = obj;
        this.status = status;
    }
    JSONResponse.prototype.send = function (res) {
        res.writeHead(this.status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(this.obj));
    };
    return JSONResponse;
}());
exports.JSONResponse = JSONResponse;
var FileResponse = (function () {
    function FileResponse(path) {
        this.path = path;
    }
    FileResponse.prototype.send = function (res) {
        fs.readFile(process.cwd() + this.path, function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end('Page not found');
                return;
            }
            res.writeHead(200);
            res.end(data);
        });
    };
    return FileResponse;
}());
exports.FileResponse = FileResponse;
var EmptyResponse = (function () {
    function EmptyResponse(status) {
        if (status === void 0) { status = HttpStatus.OK; }
        this.status = status;
    }
    EmptyResponse.prototype.send = function (res) {
        res.writeHead(this.status);
        res.end();
    };
    return EmptyResponse;
}());
exports.EmptyResponse = EmptyResponse;
//# sourceMappingURL=response.js.map