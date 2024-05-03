import { RuntimeBundle } from "../plugin/index.js";

/**
 * Embedded webpage overlay
 */
export class InterfaceWebview {
    readonly origin: URL;
    readonly cookies: Map<string, string> = new Map();
    readonly storage: Map<string, string> = new Map();

    route: URL;

    enable_javascript = true;
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
        /* @ts-ignore */
        return;
    }
    /**
     * Recommended that you do not deserialize, instead do string parsing to find your result
     * @returns Stringified DOM
     */
    get_dom(): string {
        /* @ts-ignore */
        return;
    }

    constructor(origin: URL) {
        this.origin = origin;
        this.route = origin;
    }
}