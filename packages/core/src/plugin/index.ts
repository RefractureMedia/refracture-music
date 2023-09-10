export type PluginData = Map<PluginIdentifier, /*DataEntryClass*/ any>;
export type RawData = string | number | boolean | string[] | number[] | boolean[] | RawData[] | { [type: string]: RawData; };

export class RuntimeBundle {
    protected raw_script: string;

    constructor(bundle: string) {
        this.raw_script = bundle;
    }
}
export class PluginManager {
    plugin_map: Map<PluginIdentifier, PluginClass> = new Map();

    access(plugin: PluginIdentifier) {
        return this.plugin_map.get(plugin)!;
    }
}

export type PluginIdentifier = string;

export class PluginClass {
    name: string;

    id: PluginIdentifier;

    /**
     * Resolves plugin account data imports (ie. during account creation or in account settings)
     */
    resolveImport?: (existing: RawData, importing: RawData) => Promise<any>;

    constructor(name: string, id: PluginIdentifier) {
        this.name = name;
        this.id = id;
    }
}
