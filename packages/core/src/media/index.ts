import { v4 as uuid } from 'uuid';
import { PluginIdentifier, RawData, PluginData } from '../plugin/index.js';

function getItem(item_type: ItemTypes, item_id: ItemIdentifierType, instance: ItemManager) {
    return (async () => {
        instance.item_map.set(item_id, new ItemClass(item_id, await music.core.DB.request(item_type, item_id)));
        return instance.item_map.get(item_id) as ItemClass<ItemIdentifierType>;
    });
}
type ManagerUpdate = () => void;

export class ItemManager {
    type: ItemTypes;

    item_map: ItemMap;

    accessed_items: Map<ItemIdentifierType, AccessIdentifierType[]>;

    // We need to check if the plugin is still loaded
    update_listeners: Map<PluginIdentifier, ManagerUpdate>;

    async access(item_id: ItemIdentifierType, access_id?: AccessIdentifierType) {
        if (!access_id)
            access_id = uuid();

        if (this.item_map.get(item_id))
            this.accessed_items.get(item_id)!.push(access_id);
        else {
            this.accessed_items.set(item_id, [access_id]);

            this.item_map.set(item_id, new ItemClass(item_id, await music.core.DB.request(this.type, item_id)));
        }

        return [this.item_map.get(item_id), access_id] as [ItemClass<ItemIdentifierType>, AccessIdentifierType];
    }

    /**
     * Access a sorted set of items from the complete list. (eg. for library view)
     * @param sort_order TODO: Wrapper class for complex sorting.
     * @param count Pagination length.
     * @param start_at Pagination starting point.
     * @param manager_update A notification of any item(s) being removed or added from the manager (ie. to call this method again in order to refresh the page)
     * @param access_id When you have multiple accesses in a context and need to manage them together.
     */
    async accessFromAll(sort_order: string | undefined, count: number, start_at: number, manager_update: [PluginIdentifier, ManagerUpdate] | false, access_id?: AccessIdentifierType) {
        if (!access_id)
            access_id = uuid();

        const results: ItemClass<ItemIdentifierType>[] = [];

        ((await music.core.DB.request(`${this.type}_sorted`, `${count}`, `${start_at}`, sort_order!)) as RawData[]).forEach((_id, i, data: RawData[]) => {
            const id = _id as unknown as string
            const current = this.item_map.get(id);
            if (current) {
                this.accessed_items.get(id)!.push(access_id!);
                this.item_map.set(id, new ItemClass(id, data));

                results.push(current);
            } else {
                this.accessed_items.set(id, [access_id!]);
                results.push(current!); // TODO: This probably is bad
            }
        });

        if (manager_update)
            this.update_listeners.set(manager_update[0], manager_update[1]);

        // TypeScript why
        return [results, access_id] as [ItemClass<ItemIdentifierType>[], AccessIdentifierType];
    }


    /**
     * Access a set of specified items. (eg. for an album)
     * @param item_ids
     * @param access_id When you have multiple accesses in a context and need to manage them together.
     */
    async accessSet(item_ids: ItemIdentifierType[], access_id?: AccessIdentifierType) {
        if (!access_id)
            access_id = uuid();

        const results: (ItemClass<string> | false)[] = [];

        const add_items: [number[], ItemIdentifierType[]] = [[], []];

        for (const [i, id] of item_ids.entries()) {
            const current = this.item_map.get(id)
            if (current) {
                results.push(current);
                this.accessed_items.get(id)!.push(access_id);
            } else {
                add_items[0].push(i);
                add_items[1].push(id);
                results.push(false);
            }
        }

        for (const [i, data] of ((await music.core.DB.request(`${this.type}_set`, JSON.stringify(add_items[1]))) as RawData[]).entries()) {
            const id = add_items[1][i];

            // TypeScript Funny
            this.item_map.set(id, new ItemClass(id, data));
            this.accessed_items.set(id, [access_id]);
            results[add_items[0][i]] = this.item_map.get(id)!;
        }

        return results as ItemClass<ItemIdentifierType>[];
    }

    /**
     *
     * @param access_id The database access id of the current scope received from `ItemManager.access[0]`.
     * @param item_id Optional. If a single item has been accessed provide this to optimize logic.
     */
    async free(access_id: AccessIdentifierType, item_id?: ItemIdentifierType) {
        if (item_id) {
            this.accessed_items.set(item_id, this.accessed_items.get(item_id)!.filter((id) => id !== item_id));

            if (this.accessed_items.get(item_id)!.length === 0) {
                this.accessed_items.delete(item_id);
                this.item_map.set(item_id, await getItem(this.type, item_id, this)());
            }
        }
        else
            for (const [item, access] of this.accessed_items.entries()) {
                const access_index = access.indexOf(access_id);

                if (access_index !== -1) {
                    const current = this.accessed_items.get(item)!;
                    this.accessed_items.set(item, current.splice(access_index, 1));

                    if (current.length === 0) {
                        this.accessed_items.delete(item);
                        this.item_map.set(item, await getItem(this.type, item, this)());
                    }
                }
            }
    }

    constructor(type: ItemTypes) {
        this.type = type;

        this.item_map = new Map();

        this.accessed_items = new Map();

        this.update_listeners = new Map();
    }
}

export type AccessIdentifierType = string;
type ItemMap = Map<ItemIdentifierType, ItemClass<ItemIdentifierType>>;
export type ItemIdentifierType = string;
type ItemTypes = 'source' | 'track' | 'artist' | 'album' | 'playlist';
export class ItemClass<ItemIdentifier extends ItemIdentifierType = ItemIdentifierType> {
    id: ItemIdentifier;

    data!: PluginData; // TODO

    // serializers: Map<PluginIdentifier, DataSerializer>;

    // accessors: Map<PluginIdentifier, DataAccessor>;

    constructor(id: ItemIdentifier, data: RawData) {
        this.id = id;
    }
}
