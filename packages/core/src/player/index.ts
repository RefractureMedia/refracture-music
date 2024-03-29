import { AccessIdentifierType, ItemClass, ItemIdentifierType } from "../media/index.js";

interface PlayerSession {
    active: boolean;
    current_track: ItemIdentifierType;
}

export default class Player {
    _access_id?: AccessIdentifierType;

    current_track?: ItemClass | false;

    async startup () {
        const synced_player = await music.core.DB.request('player', music.core.current_account.id) as unknown as PlayerSession;

        if (synced_player.active) {
            const access = await music.core.tracks.access(synced_player.current_track);
            this.current_track = access[0];
            this._access_id = access[1];
        }
    }
}