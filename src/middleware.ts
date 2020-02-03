import { HttpHandler } from './route'
import Engine from './engine'
import Context from './context'
import { Response } from './response'

export type MiddlewareHandler = (req: Context) => Promise<Response | void>

export default class Middleware {
    constructor(engine: Engine, ...middlewares: MiddlewareHandler[]) {
        this.engine = engine
        this.middlewares = middlewares
    }

    private readonly middlewares: MiddlewareHandler[]
    private readonly engine: Engine

    get(path: string, handler: HttpHandler) {
        this.engine.get(path, handler).use(...this.middlewares)
    }

    put(path: string, handler: HttpHandler) {
        this.engine.put(path, handler).use(...this.middlewares)
    }

    post(path: string, handler: HttpHandler) {
        this.engine.post(path, handler).use(...this.middlewares)
    }

    patch(path: string, handler: HttpHandler) {
        this.engine.patch(path, handler).use(...this.middlewares)
    }

    delete(path: string, handler: HttpHandler) {
        this.engine.delete(path, handler).use(...this.middlewares)
    }

    options(path: string, handler: HttpHandler) {
        this.engine.options(path, handler).use(...this.middlewares)
    }

    head(path: string, handler: HttpHandler) {
        this.engine.head(path, handler).use(...this.middlewares)
    }
}
