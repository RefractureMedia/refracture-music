import { io, Socket } from "../../node_modules/socket.io-client/build/esm/index";
import { MusicCore } from "../index";
import { RawData } from "../plugin/index";
import { DB } from "../storage/index";

export default class SessionManager {
    core: MusicCore;

    socket: Socket;

    async _rawRequest (path: string, params: URLSearchParams): Promise<RawData> {
        const request_id = /*uuid()*/ '';
        this.socket.send('query', request_id, path, params);
        return await new Promise((resolve, reject) => {
            this.socket.onAny(/*'query',*/ res => {
                if (res.request_id === request_id) {
                    resolve(res.query);
                } else return;
            });
        });
    }

    async startup () {
        this.socket = io(`wss://${DB.address.origin}:${DB.address.port}`);
        await new Promise((resolve, reject) => {
            this.socket.onAny(/*'connect',*/ () => {
                resolve(true);
            });
        });
    }

    constructor (core: MusicCore) {
        this.core = core;
    }
}