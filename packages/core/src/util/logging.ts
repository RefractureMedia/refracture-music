export class LoggerClass {
    protected unit: string;

    protected provider: (message: string) => void;

    constructor(unit: string, initialize = false) {
        this.unit = unit;

        /* @ts-ignore */
        if (console.info && console.info.toString() !== '() => {}') {
            this.provider = (message) => console.log(message);
        } else {
            this.provider = (message) => sendMessage('print', `"${message}"`);
        }
    }

    /**
     * Normal operation.
     */
    public info(...args: any) {
        this.provider(`[Music ${this.unit}: INFO] ${args.map((a: any) => `${a}`).join(' ')}`);
    }

    /**
     * Debug logging 
     */
    public debug(...args: any) {
        this.provider(`[Music ${this.unit}: DEBUG] ${args.map((a: any) => `${a}`).join(' ')}`); // TODO: Hide in production
    }

    /**
     * Unexpected/unideal result of function; this should usually not be used.
     */
    public warn(...args: any) {
        this.provider(`[Music ${this.unit}: WARN] ${args.map((a: any) => `${a}`).join(' ')}`);
    }

    /**
     * Failure of function; user should expect broken features.
     */
    public error(...args: any) {
        this.provider(`[Music ${this.unit}: ERROR] ${args.map((a: any) => `${a}`).join(' ')}`);
    }

    /**
     * Unable to operate; user should expect an unresponsive app.
     */
    public fatal(...args: any) {
        this.provider(`[Music ${this.unit}: FATAL] ${args.map((a: any) => `${a}`).join(' ')}`);
    }
}