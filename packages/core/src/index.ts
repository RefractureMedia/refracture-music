import 'react-native-polyfill';
import 'core-js/actual/url';

import { AccountManager, AccountClass } from './account/index.js';
import { ItemManager } from './media/index.js';
import Player from './player/index.js';
import { PluginManager } from './plugin/index.js';
import SessionManager from './session/index.js';
import { Logger } from './util/logging.js';

export class MusicCore {
    session: SessionManager;

    accounts!: AccountManager;
    current_account!: AccountClass;

    plugins: PluginManager;

    player: Player;

    sources: ItemManager;
    tracks: ItemManager;
    artists: ItemManager;
    albums: ItemManager;
    playlists: ItemManager;

    async startup () {
        // await this.session.startup();
    }

    constructor() {
        this.session = new SessionManager();

        this.plugins = new PluginManager();

        this.player = new Player();
        
        this.sources = new ItemManager('source');
        this.tracks = new ItemManager('track');
        this.artists = new ItemManager('artist');
        this.albums = new ItemManager('album');
        this.playlists = new ItemManager('playlist');
    }
}

// Warning: Do not access the global Music within a constructor
/* @ts-ignore */
Music = new MusicCore();

Logger.info('Hello World!!')