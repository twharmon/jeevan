import { IncomingMessage } from 'http'
import * as url from 'url'
import * as querystring from 'querystring'
import { Logger, LogLevel } from './logger'

export type UrlQuery = { [key: string]: string }
export type PathParams = { [key: string]: string }

export default class Context {
    constructor(request: IncomingMessage, loggers: Logger[], params: PathParams) {
        this.request = request
        this.loggers = loggers
        this.params = params
    }

    readonly request: IncomingMessage
    readonly params: PathParams
    private readonly loggers: Logger[]
    private queryObj?: UrlQuery

    query(): UrlQuery {
        if (this.queryObj) return this.queryObj
        const queryString = url.parse(this.request.url || '').query || ''
        const query: UrlQuery = {}
        const queryObj = querystring.parse(queryString)
        const keys = Object.keys(queryObj)
        for (let i = keys.length - 1; i >= 0; i--) {
            if (typeof queryObj[keys[i]] === 'string') {
                query[keys[i]] = queryObj[keys[i]] as string
                continue
            }
            query[keys[i]] = queryObj[keys[i]][0]
        }
        this.queryObj = query
        return query
    }

    body(): Promise<object> {
        let body = ''
        this.request.on('readable', () => {
            body += this.request.read() || ''
        })
        return new Promise(resolve => {
            this.request.on('end', () => {
                resolve(JSON.parse(body))
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
