import 'react-native-polyfill';
import 'core-js/actual/url';

import { AccountManager, AccountClass } from './account/index.js';
import { ItemManager } from './media/index.js';
import Player from './player/index.js';
import { PluginManager } from './plugin/index.js';
import SessionManager from './session/index.js';
import { LoggerClass } from './util/logging.js';
import { Database } from './storage/index.js';

export class MusicCore {
    readonly Logger: LoggerClass;

    readonly DB: Database;

    readonly session: SessionManager;

    readonly accounts!: AccountManager;
    readonly current_account!: AccountClass;

    readonly plugins: PluginManager;

    readonly player: Player;

    readonly sources: ItemManager;
    readonly tracks: ItemManager;
    readonly artists: ItemManager;
    readonly albums: ItemManager;
    readonly playlists: ItemManager;

    async startup () {
        // await this.session.startup();
    }

    constructor() {
        this.Logger = new LoggerClass('Core', true);

        this.DB = new Database();

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
music.core = new MusicCore();