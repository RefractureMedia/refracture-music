export {}
declare global {
    /**
     * @param message Must be valid JSON; '"Helooo"', JSON.stringify({blah: 'foo'}), etc.
     * @returns A string, usually a JSON encoded object.
     */
    function sendMessage(channel_name: string, message: string): string;

    function database_migrations(): Array<[number, string]>

    const database_version: number

    const music: {
        readonly core: import("./index.js").MusicCore
    }
}