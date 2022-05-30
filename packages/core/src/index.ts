import { v4 as uuid } from 'uuid';
class MusicCore {
    accounts: AccountManager;

    plugins: PluginManager;

    tracks: TrackManager;

    constructor() {

    }
}

class AccountManager {
    private account_map: Map<AccountIdentifier, AccountClass>;

    private current_account: AccountIdentifier;

    constructor() {

    }
}

export type AccountIdentifier = "default" | string;

export class AccountClass {
    avatar: string;

    name: string;

    id: AccountIdentifier;

    plugin_data: PluginData;

    constructor (name: string, avatar: string, imports?: PluginData) {
        this.name = name;

        this.avatar = avatar;

        this.id = uuid();

        if (imports) for (const plugin of Music.plugins.plugin_map.entries()) {
            plugin[1].resolveImport(this.plugin_data[plugin[0]], imports[plugin[0]]);
        }
    }
}

type PluginData = Map<PluginIdentifier, RawData>;

type RawData = string | number | boolean | string[] | number[] |  boolean[] | RawData[] | { [type: string]: RawData };

class PluginManager {
    plugin_map: Map<PluginIdentifier, PluginClass>;

    access (plugin: PluginIdentifier) {
        return this.plugin_map[plugin];
    }
}

export type PluginIdentifier = string;

export class PluginClass {
    name: string;

    id: PluginIdentifier;

    /**
     * Resolves plugin account data imports (ie. during account creation or in account settings)
     */
    resolveImport: (existing: RawData, importing: RawData) => {};
}

function getResolveTrack (track_id: TrackIdentifier) {
    return (async () => {
        this.track_map[track_id] = new TrackClass(JSON.parse(await DB.request('track', track_id)));
        return this.track_map[track_id];
    }) as ResolveTrack<TrackIdentifier>;
}

class TrackManager {
    track_map: TrackMap;

    accessed_tracks: Map<TrackIdentifier, AccessIdentifier[]>;

    async access (track_id: TrackIdentifier, access_id: AccessIdentifier) {
        const track = this.track_map[track_id];

        if (this.accessed_tracks[track_id]) this.accessed_tracks[track_id].push(access_id);
        else this.accessed_tracks[track_id] = [ access_id ];

        if (track instanceof TrackClass) return track;
        else {
            const resolved_track = await track();
            this.track_map[track_id] = resolved_track;
            return resolved_track;
        }
    }

    free (access_id: AccessIdentifier, track_id?: TrackIdentifier) {
        if (track_id) {
            // uhhhhh, duh!? wtf typescript
            this.accessed_tracks[track_id] = (this.accessed_tracks[track_id] as AccessIdentifier[]).filter((id) => id !== track_id);
            
            if (!this.accessed_tracks[track_id].length) {
                delete this.accessed_tracks[track_id];
                this.track_map[track_id] = getResolveTrack(track_id);
            }
        }
        else for (const [track, access] of this.accessed_tracks.entries()) {
            if (access.includes(track_id)) {
                this.accessed_tracks[track] = (this.accessed_tracks[track] as AccessIdentifier[]).filter((id) => id !== track);
        
                if (!this.accessed_tracks[track].length) {
                    delete this.accessed_tracks[track];
                    this.track_map[track] = getResolveTrack(track);
                }
            }
        }
    }

    async build(track_list: TrackIdentifier[], sort_order, cache_count: number) {
        this.track_map = new Map() as TrackMap;

        const cache = new Map<TrackIdentifier, TrackClass<TrackIdentifier>>();

        JSON.parse(await DB.request('tracks', sort_order, cache_count)).map(track => cache[track[0]] = new TrackClass(track[1]));

        if (cache_count > track_list.length) for (const [i, track_id] of track_list.entries()) {
            if (i < cache_count) this.track_map[track_id] = cache[track_id];
            else this.track_map[track_id] = getResolveTrack(track_id);
        }
    }
}

type AccessIdentifier = string;

type TrackMap = Map<TrackIdentifier, TrackClass<TrackIdentifier> | ResolveTrack<TrackIdentifier>>;

type TrackIdentifier = string;

type ResolveTrack<T> = () => Promise<TrackClass<T>>;

class TrackClass<TrackIdentifier> {
    id: TrackIdentifier

    constructor (data: RawData) {

    }
}


const Music = new MusicCore();

export default Music;