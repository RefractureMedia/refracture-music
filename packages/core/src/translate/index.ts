import localeCodes, { ILocale } from "locale-codes"
import { DB } from "../storage/index.js"

let locale: ILocale = localeCodes.getByTag('en-us');

class TranslateCore {
    get (path: string) {
        return 'foo';
    }
}
const translate = new TranslateCore();

export class TranslatableString {
    _string_path: string;
    _current_locale!: ILocale;
    _cached_value!: string;

    _getString() {
        if (this._current_locale.tag !== locale.tag) this._cached_value = translate.get(this._string_path);
        return this._cached_value;
    }

    toString() {
        return this._getString();
    }

    constructor (string_path: string) {
        this._string_path = string_path;
        this._getString();
    }
}