import Context  from './context'

export enum LogLevel {
    Debug,
    Info,
    Notice,
    Warning,
    Error,
    Critical,
    Alert,
    Emergency,
}

export interface Logger {
    log: (ctx: Context, level: LogLevel, ...msg: any[]) => void
}
