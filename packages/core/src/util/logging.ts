class LoggerClass {
    protected provider: (message: string) => void;

    constructor() {
        if (console) {
            this.provider = (message) => console.log(message);
        }
        this.provider = (message) => sendMessage('print', `"${message}"`)
    }

    /**
     * Temporary debug logging; remove before release!
     */
    public debug(message: string) {
        this.provider(`[Music Core: DEBUG] ${message}`)
    }

    /**
     * Unable to operate; user should expect an unresponsive app.
     */
    public fatal(error: string) {
        this.provider(`[Music Core: FATAL] ${error}`)
    }

    /**
     * Failure of function; user should expect broken features.
     */
    public error(error: string) {
        this.provider(`[Music Core: ERROR] ${error}`)
    }

    /**
     * Unexpected/unideal result of function; this should usually not be used.
     */
    public warn(warning: string) {
        this.provider(`[Music Core: WARN] ${warning}`)
    }

    /**
     * Normal operation.
     */
    public info(info: string) {
        this.provider(`[Music Core: INFO] ${info}`)
    }
}

export const Logger = new LoggerClass()