import { io, Socket } from "socket.io-client";
import { MusicCore } from "../index.js";
import { RawData } from "../plugin/index.js";
import { DB } from "../storage/index.js";

export default class SessionManager {
    core: MusicCore;

    socket!: Socket;

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
        this.socket = io(`wss://${DB.server_address.origin}:${DB.server_address.port}`);
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