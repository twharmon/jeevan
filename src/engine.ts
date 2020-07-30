import * as http from 'http'
import { IncomingMessage, ServerResponse } from 'http'
import * as url from 'url'
import Route, { HttpHandler, HttpMethod } from './route'
import Context, { PathParams } from './context'
import { Response, HttpStatus, TextResponse } from './response'
import { Logger } from './logger'
import Middleware, { MiddlewareHandler } from './middleware'
import * as WebSocket from 'ws'

export default class Engine {
    constructor() {
        this.getRoutes = []
        this.putRoutes = []
        this.patchRoutes = []
        this.postRoutes = []
        this.deleteRoutes = []
        this.optionsRoutes = []
        this.headRoutes = []
        this.getRoutes = []
        this.loggers = []
        this.errorHandler = () => new TextResponse('Internal Server Error')

        this.server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
            const u = url.parse(req.url || '')
            let routes: Route[]
            switch (req.method) {
                case HttpMethod.Get:
                    routes = this.getRoutes
                    break
                case HttpMethod.Put:
                    routes = this.putRoutes
                    break
                case HttpMethod.Patch:
                    routes = this.patchRoutes
                    break
                case HttpMethod.Post:
                    routes = this.postRoutes
                    break
                case HttpMethod.Delete:
                    routes = this.deleteRoutes
                    break
                case HttpMethod.Options:
                    routes = this.optionsRoutes
                    break
                case HttpMethod.Head:
                    routes = this.headRoutes
                    break
                default:
                    throw Error(`unrecognized method '${req.method}'`)
            }
            for (let i = routes.length - 1; i >= 0; i--) {
                const matches = routes[i].regexp.exec(u.pathname || '')
                if (!matches) {
                    continue
                }
                let params: PathParams = {}
                for (let j = matches.length - 1; j > 0; j--) {
                    params[routes[i].params[j-1]] = matches[j]
                }
                const ctx = new Context(req, this.loggers, params)
                for (let j = routes[i].middlewares.length - 1; j >= 0; j--) {
                    let r = await routes[i].middlewares[j](ctx)
                    if (r) return r.send(res)
                }
                try {
                    var response = await routes[i].handler(ctx)
                } catch (err) {
                    console.log(err)
                    return this.errorHandler(err.message ?? err.toString()).send(res)
                }
                return response.send(res)
            }
            res.writeHead(HttpStatus.NotFound)
            res.end('Page not found')
        })
    }

    private getRoutes: Route[]
    private putRoutes: Route[]
    private patchRoutes: Route[]
    private postRoutes: Route[]
    private deleteRoutes: Route[]
    private optionsRoutes: Route[]
    private headRoutes: Route[]
    private errorHandler: (msg: string) => Response
    private readonly loggers: Logger[]
    private readonly server: http.Server

    serve(port: number) {
        this.server.listen(port)
    }

    middleware(...middlewares: MiddlewareHandler[]) {
        return new Middleware(this, ...middlewares)
    }

    onError(handler: (msg: string) => Response) {
        this.errorHandler= handler
    }

    get(path: string, handler: HttpHandler) {
        const route = new Route(HttpMethod.Get, path, handler)
        this.getRoutes = [route, ...this.getRoutes]
        return route
    }

    put(path: string, handler: HttpHandler) {
        const route = new Route(HttpMethod.Put, path, handler)
        this.putRoutes = [route, ...this.putRoutes]
        return route
    }

    patch(path: string, handler: HttpHandler) {
        const route = new Route(HttpMethod.Post, path, handler)
        this.patchRoutes = [route, ...this.patchRoutes]
        return route
    }

    post(path: string, handler: HttpHandler) {
        const route = new Route(HttpMethod.Patch, path, handler)
        this.postRoutes = [route, ...this.postRoutes]
        return route
    }

    delete(path: string, handler: HttpHandler) {
        const route = new Route(HttpMethod.Delete, path, handler)
        this.deleteRoutes = [route, ...this.deleteRoutes]
        return route
    }

    options(path: string, handler: HttpHandler) {
        const route = new Route(HttpMethod.Options, path, handler)
        this.optionsRoutes = [route, ...this.optionsRoutes]
        return route
    }

    head(path: string, handler: HttpHandler) {
        const route = new Route(HttpMethod.Head, path, handler)
        this.headRoutes = [route, ...this.headRoutes]
        return route
    }

    logger(logger: Logger) {
        this.loggers.push(logger)
    }

    ws(path: string) {
        return new WebSocket.Server({ path, server: this.server })
    }
}
