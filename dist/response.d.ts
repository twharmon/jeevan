/// <reference types="node" />
import { ServerResponse } from 'http';
export declare enum HttpStatus {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
    Conflict = 409,
    UnprocessableEntity = 422,
    InternalServerError = 500
}
export interface Response {
    send: (res: ServerResponse) => void;
}
export declare class TextResponse {
    constructor(text: string, status?: HttpStatus);
    private readonly text;
    private readonly status;
    send(res: ServerResponse): void;
}
export declare class JSONResponse {
    constructor(obj: object, status?: HttpStatus);
    private readonly obj;
    private readonly status;
    send(res: ServerResponse): void;
}
export declare class FileResponse {
    constructor(path: string);
    private readonly path;
    send(res: ServerResponse): void;
}
export declare class EmptyResponse {
    constructor(status?: HttpStatus);
    private readonly status;
    send(res: ServerResponse): void;
}
