import { Response } from './response'
import Context from './context'
import { MiddlewareHandler } from './middleware'

export type HttpHandler = (req: Context) => Promise<Response>

export enum HttpMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE',
    Options = 'OPTIONS',
    Head = 'HEAD',
}

const PATH_PARAM_REGEXP = new RegExp(/{([^/]+?)}/g)

export default class Route {
    constructor(method: HttpMethod, path: string, handler: HttpHandler) {
        this.middlewares = []
        this.handler = handler
        this.method = method
        this.params = []
        if (path === '*') {
            this.regexp = new RegExp(/.*/)
            return
        }
        const pathMatches = path.match(PATH_PARAM_REGEXP)
        if (pathMatches === null) {
            this.regexp = new RegExp('^' + path + '$', 'i')
            return
        }
        for (let i = pathMatches.length - 1; i >= 0; i--) {
            this.params.push(pathMatches[i].replace('{', '').replace('}', ''))
        }
        const reStr = path.replace(PATH_PARAM_REGEXP, '([^/]+?)')
        this.regexp = new RegExp('^' + reStr + '$', 'i')
    }

    use(...middlewares: MiddlewareHandler[]) {
        this.middlewares = middlewares
    }

    readonly params: string[]
    readonly regexp: RegExp
    readonly handler: HttpHandler
    readonly method: HttpMethod
    middlewares: MiddlewareHandler[]
}
