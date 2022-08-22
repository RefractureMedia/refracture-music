import SettingsInstance from "../account/settings/index";
import { ItemClass, ItemIdentifierType } from "../media/index";
import { RuntimeBundle } from "../plugin/index";
import { TranslatableString } from "../translate/index";

class InterfaceItem {

}

/**
 * Header for a group page, eg. Album
 */
export class InterfaceMediaGroupHeader extends InterfaceItem {
    art: URL;
    title: string;
    artists: ItemClass[];
}
/**
 * List of Tracks
 */
export class InterfaceMediaTrackList extends InterfaceItem {
    tracks: ItemClass[];
    track_map: Map<ItemIdentifierType, ItemClass>

    /**
     * Whether the User can sort and remove tracks from the list
     */
    user_mutable: boolean;
    /**
     * Whether to display item count
     */
    display_count: boolean;
}
/**
 * List of Groups (Artists/Albums/Playlists)
 */
export class InterfaceMediaGroupList extends InterfaceItem {
    groups: ItemClass[];
    group_map: Map<ItemIdentifierType, ItemClass>;

    /**
     * Whether to display item count
     */
    display_count: boolean;
}
/**
 * Section header in mixed lists
 */
export class InterfaceMediaListSection extends InterfaceItem {
    title: TranslatableString;
    tracks: ItemClass[];

    /**
     * Whether to display item count
     */
    display_count: boolean;
    /**
     * Whether the header has additional items in the list that are not shown that can be expanded to view
     */
    truncate_to: number | false;
}
/**
 * List of mixed content; for a global Search
 */
export class InterfaceMediaMixedList extends InterfaceItem {
    sections: Map<InterfaceMediaListSection, InterfaceMediaTrackList | InterfaceMediaGroupList>
}
/**
 * List of settings
 */
export class InterfaceSettingsList extends InterfaceItem {
    settings: SettingsInstance
}
/**
 * Page inside a section or window of the app
 */
export class InterfacePage {
    items: InterfaceItem[];
}
/**
 * Section of the app
 */
export class InterfaceSection {
    pages: Map<string, InterfacePage>;
}
/**
 * Sidebar in the app
 */
export class InterfaceSidebar {

}
/**
 * Embedded webpage view
 */
export class InterfaceWebview {
    origin: URL;
    readonly cookies: Map<string, string>;
    readonly storage: Map<string, string>;

    enable_javascript: boolean;
    inject_javascript: RuntimeBundle | undefined;
    inject_styles: string | undefined;
    inject_cookies: Map<string, string> | undefined;
    inject_storage: Map<string, string> | undefined;
    /**
     * If left unset will use `Refracture Music Client`
     */
    useragent: string | undefined;
    /**
     * Whether the user can open it in a native browser
     */
    can_external: boolean = false;
    /**
     * Whether/which domains can be redirected to from the origin
     */
    can_redirect: string[] | boolean = false;
    /**
     * Intercept, modify, cancel, and/or view contents of any network requests
     */
    network_intercepts: Map<URL | RegExp, () => Promise<string | boolean> | string | boolean> = new Map();

    /**
     * Recommended that you do not deserialize, instead do string parsing to find your result
     * @returns Paths and stringified bundles for the page's source
     */
    get_sources(): Map<string, string | RuntimeBundle> {
        return;
    }
    /**
     * Recommended that you do not deserialize, instead do string parsing to find your result
     * @returns Stringified DOM
     */
    get_dom(): string {
        return;
    }
}
/**
 * Window/Instance of the app
 */
export class InterfaceWindow {
    sidebar: InterfaceSidebar | false;
    content: InterfacePage | InterfaceSection | InterfaceWebview;
}