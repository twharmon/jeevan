import { Response } from './response';
import Context from './context';
import { MiddlewareHandler } from './middleware';
export declare type HttpHandler = (req: Context) => Promise<Response>;
export declare enum HttpMethod {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Patch = "PATCH",
    Delete = "DELETE",
    Options = "OPTIONS",
    Head = "HEAD"
}
export default class Route {
    constructor(method: HttpMethod, path: string, handler: HttpHandler);
    use(...middlewares: MiddlewareHandler[]): void;
    readonly params: string[];
    readonly regexp: RegExp;
    readonly handler: HttpHandler;
    readonly method: HttpMethod;
    middlewares: MiddlewareHandler[];
}
