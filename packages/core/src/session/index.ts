import { io, Socket } from "socket.io-client";
import { RawData } from "../plugin/index.js";

export default class SessionManager {
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
        this.socket = io(`wss://${Music.DB.server_address.origin}:${Music.DB.server_address.port}`);
        await new Promise((resolve, reject) => {
            this.socket.onAny(/*'connect',*/ () => {
                resolve(true);
            });
        });
    }
}