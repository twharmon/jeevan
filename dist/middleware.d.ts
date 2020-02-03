import { HttpHandler } from './route';
import Engine from './engine';
import Context from './context';
import { Response } from './response';
export declare type MiddlewareHandler = (req: Context) => Promise<Response | void>;
export default class Middleware {
    constructor(engine: Engine, ...middlewares: MiddlewareHandler[]);
    private readonly middlewares;
    private readonly engine;
    get(path: string, handler: HttpHandler): void;
    put(path: string, handler: HttpHandler): void;
    post(path: string, handler: HttpHandler): void;
    patch(path: string, handler: HttpHandler): void;
    delete(path: string, handler: HttpHandler): void;
    options(path: string, handler: HttpHandler): void;
    head(path: string, handler: HttpHandler): void;
}
