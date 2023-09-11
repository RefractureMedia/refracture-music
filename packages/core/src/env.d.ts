/**
 * @param message Must be valid JSON; '"Helooo"', JSON.stringify({blah: 'foo'}), etc.
 */
declare function sendMessage(channel_name: string, message: string): any;

declare function database_migrations(): {entries: Record<number, string>}