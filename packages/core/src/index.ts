import { AccountManager, AccountClass } from './account/index';
import { ItemManager } from './media/index';
import Player from './player/index';
import { PluginManager } from './plugin/index';
import SessionManager from './session/index';

export class MusicCore {
    session: SessionManager;

    accounts: AccountManager;
    current_account: AccountClass;

    plugins: PluginManager;

    player: Player;

    sources: ItemManager;
    tracks: ItemManager;
    artists: ItemManager;
    albums: ItemManager;
    playlists: ItemManager;

    async startup () {
        await this.session.startup();
    }

    constructor() {
        this.session = new SessionManager(this);

        this.plugins = new PluginManager();

        this.player = new Player(this);
        
        this.sources = new ItemManager('source');
        this.tracks = new ItemManager('track');
        this.artists = new ItemManager('artist');
        this.albums = new ItemManager('album');
        this.playlists = new ItemManager('playlist');
    }
}

export const Music = new MusicCore();

console.log('[Music Core] Hello world!!!!!!!!');

declare function sendMessage(channel_name: string, message: any): any;

sendMessage('test', '[Music Core] Hello? *tap tap* Is this thing on?');

export default Music;