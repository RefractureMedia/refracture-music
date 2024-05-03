export {}
declare global {
    /**
     * @param message Must be valid JSON; '"Helooo"', JSON.stringify({blah: 'foo'}), etc.
     * @returns A string, usually a JSON encoded object.
     */
    function sendMessage(channel_name: string, message: string): string;

    const music: {
        readonly versions: Record<string, number>
        readonly core: import("./index.js").MusicCore
    }
}