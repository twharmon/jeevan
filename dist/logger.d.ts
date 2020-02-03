import Context from './context';
export declare enum LogLevel {
    Debug = 0,
    Info = 1,
    Notice = 2,
    Warning = 3,
    Error = 4,
    Critical = 5,
    Alert = 6,
    Emergency = 7
}
export interface Logger {
    log: (ctx: Context, level: LogLevel, ...msg: any[]) => void;
}
