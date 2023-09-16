import { v4 as uuid } from 'uuid';
import { PluginData } from "../plugin/index.js";

export class AccountManager {
    private account_map: Map<AccountIdentifier, AccountClass> = new Map();

    private current_account!: AccountIdentifier;

    constructor() {
    }
}

export type AccountIdentifier = 'default' | string;

export class AccountClass {
    avatar: string;

    name: string;

    id: AccountIdentifier;

    plugin_data!: PluginData; // TODO

    plugins_resolved: Promise<PromiseSettledResult<'resolved' | 'rejected'>[]>;

    constructor(name: string, avatar: string, imports?: PluginData) {
        this.name = name;

        this.avatar = avatar;

        this.id = uuid();

        const resolving_plugins: Promise<any>[] = [];

        if (imports)
            for (const plugin of Music.plugins.plugin_map.entries())
                if (plugin[1].resolveImport) {
                    resolving_plugins.push(plugin[1].resolveImport(this.plugin_data.get(plugin[0]), imports.get(plugin[0])));
                }

        // Lets us provide an event.
        // TypeScript doesn't enforce those results... w h y
        this.plugins_resolved = Promise.allSettled(resolving_plugins);
    }
}
