import Route, { HttpHandler } from './route';
import { Logger } from './logger';
import Middleware, { MiddlewareHandler } from './middleware';
export default class Engine {
    constructor();
    private getRoutes;
    private putRoutes;
    private patchRoutes;
    private postRoutes;
    private deleteRoutes;
    private optionsRoutes;
    private headRoutes;
    private readonly loggers;
    serve(port: number): void;
    middleware(...middlewares: MiddlewareHandler[]): Middleware;
    get(path: string, handler: HttpHandler): Route;
    put(path: string, handler: HttpHandler): Route;
    patch(path: string, handler: HttpHandler): Route;
    post(path: string, handler: HttpHandler): Route;
    delete(path: string, handler: HttpHandler): Route;
    options(path: string, handler: HttpHandler): Route;
    head(path: string, handler: HttpHandler): Route;
    logger(logger: Logger): void;
}
