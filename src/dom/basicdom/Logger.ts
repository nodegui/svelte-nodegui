export enum LogLevel {
    Debug,
    Info,
    Warn,
    Error
}

type LoggerCallback = (message: () => string, level: LogLevel) => void

class Logger {
    onLog: LoggerCallback

    constructor() {
        this.onLog = null;
    }

    setHandler(logger: LoggerCallback): void {
        this.onLog = logger
    }

    log(message: () => string, level: LogLevel) {
        if (this.onLog) this.onLog(message, level);
    }

    debug(message: () => string): void {
        this.log(message, LogLevel.Debug);
    }

    info(message: () => string): void {
        this.log(message, LogLevel.Info);
    }

    warn(message: () => string): void {
        this.log(message, LogLevel.Warn);
    }

    error(message: () => string): void {
        this.log(message, LogLevel.Error);
    }
}

export const logger = new Logger();