import { RawData } from "../plugin/index";

interface ConnectionData {
    address: string
}

export class Database {
    address: URL;

    /**
     * Requests 
     * @param request_type The type of Data you are requesting, eg. track
     * @param args Any arguments you want passed with the request, eg. a track id
     */
    async request (request_type: string, ...args: string[]): Promise<RawData> {
        return {};
    }

    constructor () {
        const connection_data = JSON.parse(localStorage.getItem('connection_data')) as ConnectionData;

        this.address = new URL(connection_data.address);
    }
}

export const DB = new Database();