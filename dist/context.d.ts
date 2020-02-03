/// <reference types="node" />
import { IncomingMessage } from 'http';
import { Logger } from './logger';
export declare type UrlQuery = {
    [key: string]: string;
};
export declare type PathParams = {
    [key: string]: string;
};
export default class Context {
    constructor(request: IncomingMessage, loggers: Logger[], params: PathParams);
    readonly request: IncomingMessage;
    readonly params: PathParams;
    private readonly loggers;
    private queryObj?;
    query(): UrlQuery;
    body(): Promise<object>;
    pathname(): string;
    logDebug(...msg: any[]): void;
    logInfo(...msg: any[]): void;
    logNotice(...msg: any[]): void;
    logWarning(...msg: any[]): void;
    logError(...msg: any[]): void;
    logCritical(...msg: any[]): void;
    logAlert(...msg: any[]): void;
    logEmergency(...msg: any[]): void;
    private log;
}
