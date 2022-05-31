import { v4 as uuid } from 'uuid';
class MusicCore {
    accounts: AccountManager;

    plugins: PluginManager;

    tracks: ItemManager<'track'>;

    artists: ItemManager<'artist'>;

    albums: ItemManager<'albums'>;

    playlists: ItemManager<'playlist'>;

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

    // TypeScript doesn't enforce those results... w h y
    plugins_resolved: Promise<PromiseSettledResult<'resolved' | 'rejected' | 'this_sucks'>[]>

    constructor (name: string, avatar: string, imports?: PluginData) {
        this.name = name;

        this.avatar = avatar;

        this.id = uuid();
        
        const resolving_plugins = [];

        if (imports) for (const plugin of Music.plugins.plugin_map.entries()) if (plugin[1].resolveImport) {
            resolving_plugins.push(plugin[1].resolveImport(this.plugin_data[plugin[0]], imports[plugin[0]]));
        }

        // Lets us provide an event.
        this.plugins_resolved = Promise.allSettled(resolving_plugins);
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
    resolveImport: (existing: RawData, importing: RawData) => ({} | Promise<any>);
}

function getItem<ItemType, ItemIdentifierType> (item_type: ItemType, item_id: ItemIdentifierType) {
    return (async () => {
        this.item_map[item_id] = new ItemClass(item_type, item_id, JSON.parse(await DB.request(item_type, item_id)));
        return this.item_map[item_id] as ItemClass<ItemType, ItemIdentifierType>;
    });
}

type ItemTypes = 'track' | 'artist' | 'album' | 'playlist';

class ItemManager<ItemType = ItemTypes> {
    type: ItemTypes;

    item_map: ItemMap<ItemType>;

    accessed_items: Map<ItemIdentifierType, AccessIdentifierType[]>;

    async access (item_id: ItemIdentifierType, access_id?: AccessIdentifierType) {
        if (!access_id) access_id = uuid();

        if (this.item_map[item_id]) {
            this.accessed_items[item_id].push(access_id);

            return this.item_map[item_id];
        } else {
            this.accessed_items[item_id] = [ access_id ];

            const resolved_item = new ItemClass(this.type, item_id, JSON.parse(await DB.request(this.type, item_id)));

            this.item_map[item_id] = resolved_item;

            return this.item_map[item_id];
        }
    }

    async accessFromAll (sort_order: string /* TODO: Wrapper class for complex sorting */, count: number, start_at: number, access_id?: AccessIdentifierType) {
        if (!access_id) access_id = uuid();
        
        const results: ItemClass<ItemType, unknown>[] = [];

        JSON.parse(await DB.request(`${this.type}_sorted`, count, start_at, sort_order)).forEach((id: string, data: RawData) => {
            if (this.item_map[id]) {
                this.accessed_items[id].push(access_id)
                this.item_map[id] = new ItemClass(this.type, id, data);

                results.push(this.item_map[id]);
            } else {
                this.accessed_items[id] = [ access_id ];
                results.push(this.item_map[id]);
            }
        });

        // TypeScript why
        return [results, access_id] as [ItemClass<ItemType, unknown>[], AccessIdentifierType];
    }


    // In progress TODO
    async accessSet (item_ids: ItemIdentifierType[], access_id?: AccessIdentifierType) {
        if (!access_id) access_id = uuid();

        const results: ItemClass<ItemType, unknown>[] = [];

        JSON.parse(await DB.request('item_set', JSON.stringify(
            item_ids.filter(id => ![...this.item_map.keys()].includes(id))
        ))).map(item => cache[item[0]] = new ItemClass(item[1]));

        if (cache_count > item_list.length) for (const [i, item_id] of item_list.entries()) {
            if (i < cache_count) this.item_map[item_id] = cache[item_id];
            else this.item_map[item_id] = getResolveItem(item_id);
        }
    }

    /**
     * 
     * @param access_id The database access id of the current scope received from `ItemManager.access[0]`.
     * @param item_id Optional. If a single item has been accessed provide this to optimize logic.
     */
    free (access_id: AccessIdentifierType, item_id?: ItemIdentifierType) {
        if (item_id) {
            // uhhhhh, duh!? wtf typescript
            this.accessed_items[item_id] = (this.accessed_items[item_id] as AccessIdentifierType[]).filter((id) => id !== item_id);
            
            if (!this.accessed_items[item_id].length) {
                delete this.accessed_items[item_id];
                this.item_map[item_id] = getItem(this.type, item_id);
            }
        }
        else for (const [item, access] of this.accessed_items.entries()) {
            const access_index = access.indexOf(access_id);

            if (access_index !== -1) {
                this.accessed_items[item].splice(access_index, 1);
        
                if (!this.accessed_items[item].length) {
                    delete this.accessed_items[item];
                    this.item_map[item] = getItem(this.type, item);
                }
            }
        }
    }

    constructor (type: ItemTypes) {
        this.type = type;

        this.item_map = new Map();

        this.accessed_items = new Map();
    }
}

type AccessIdentifierType = string;

type ItemMap<T> = Map<ItemIdentifierType, ItemClass<T, ItemIdentifierType>>;

type ItemIdentifierType = string;

// TODO: Fix TypeScript being garbage
class ItemClass<ItemType = ItemTypes, ItemIdentifier = ItemIdentifierType> {
    type: ItemType;

    id: ItemIdentifierType;

    constructor (type: ItemType, id: ItemIdentifier, data: RawData) {

    }
}


const Music = new MusicCore();

export default Music;