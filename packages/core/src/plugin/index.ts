export type PluginData = Map<PluginIdentifier, DataEntryClass>;
export type RawData = string | number | boolean | string[] | number[] | boolean[] | RawData[] | { [type: string]: RawData; };

export class RuntimeBundle {
    raw_script: string;
}
export class PluginManager {
    plugin_map: Map<PluginIdentifier, PluginClass>;

    access(plugin: PluginIdentifier) {
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
