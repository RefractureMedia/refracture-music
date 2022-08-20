import { v4 as uuid } from 'uuid';
import { Music } from '../index';
import { PluginData } from "../plugin/index";

export class AccountManager {
    private account_map: Map<AccountIdentifier, AccountClass>;

    private current_account: AccountIdentifier;

    constructor() {
    }
}

export type AccountIdentifier = 'default' | string;

export class AccountClass {
    avatar: string;

    name: string;

    id: AccountIdentifier;

    plugin_data: PluginData;

    plugins_resolved: Promise<PromiseSettledResult<'resolved' | 'rejected' | 'this_sucks'>[]>;

    constructor(name: string, avatar: string, imports?: PluginData) {
        this.name = name;

        this.avatar = avatar;

        this.id = uuid();

        const resolving_plugins = [];

        if (imports)
            for (const plugin of Music.plugins.plugin_map.entries())
                if (plugin[1].resolveImport) {
                    resolving_plugins.push(plugin[1].resolveImport(this.plugin_data[plugin[0]], imports[plugin[0]]));
                }

        // Lets us provide an event.
        // TypeScript doesn't enforce those results... w h y
        this.plugins_resolved = Promise.allSettled(resolving_plugins);
    }
}
