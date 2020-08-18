import { IncomingMessage } from 'http'
import * as url from 'url'
import * as querystring from 'querystring'
import { Logger, LogLevel } from './logger'
import Cookies from './cookies'

export type PathParams = { [key: string]: string }

export default class Context {
    constructor(request: IncomingMessage, loggers: Logger[], params: PathParams) {
        this.request = request
        this.loggers = loggers
        this._params = params
        this.cookies = new Cookies(request.headers.cookie)
    }

    readonly request: IncomingMessage
    private readonly _params: PathParams
    private store: { [key: string]: any } = {}
    readonly cookies: Cookies
    private readonly loggers: Logger[]

    query<T>(): T {
        const queryString = url.parse(this.request.url || '').query || ''
        const query: { [key: string]: any } = {}
        const queryObj = querystring.parse(queryString)
        const keys = Object.keys(queryObj)
        for (let i = keys.length - 1; i >= 0; i--) {
            if (typeof queryObj[keys[i]] === 'string') {
                query[keys[i]] = queryObj[keys[i]] as string
                continue
            }
            query[keys[i]] = queryObj[keys[i]][0]
        }
        return query as T
    }

    set(key: string, val: any) {
        this.store[key] = val
    }

    get<T>(key: string): T {
        return this.store[key]
    }

    params() {
        return this._params
    }

    body<T>(): Promise<T> {
        let body = ''
        this.request.on('readable', () => {
            body += this.request.read() || ''
        })
        return new Promise<T>(resolve => {
            this.request.on('end', () => {
                resolve(JSON.parse(body) as T)
            })
        })
    }

    pathname(): string {
        return url.parse(this.request.url || '').pathname || ''
    }

    logDebug(...msg: any[]) {
        this.log(LogLevel.Debug, ...msg)
    }

    logInfo(...msg: any[]) {
        this.log(LogLevel.Info, ...msg)
    }

    logNotice(...msg: any[]) {
        this.log(LogLevel.Notice, ...msg)
    }

    logWarning(...msg: any[]) {
        this.log(LogLevel.Warning, ...msg)
    }

    logError(...msg: any[]) {
        this.log(LogLevel.Error, ...msg)
    }

    logCritical(...msg: any[]) {
        this.log(LogLevel.Critical, ...msg)
    }

    logAlert(...msg: any[]) {
        this.log(LogLevel.Alert, ...msg)
    }

    logEmergency(...msg: any[]) {
        this.log(LogLevel.Emergency, ...msg)
    }

    private log(level: LogLevel, ...msg: any[]) {
        for (let i = this.loggers.length - 1; i >= 0; i--) {
            this.loggers[i].log(this, level, ...msg)
        }
    }
}
