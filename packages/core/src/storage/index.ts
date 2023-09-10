import { RawData } from "../plugin/index";
import { PrismaClient } from '@prisma/client'

interface ConnectionData {
    address: string
}

declare const connection_data: ConnectionData

export class Database {
    public internal = new PrismaClient({ log: [{ level: 'query', emit: 'event' }] });

    protected server_address?: URL;

    /**
     * Requests 
     * @param request_type The type of Data you are requesting, eg. track
     * @param args Any arguments you want passed with the request, eg. a track id
     */
    async request (request_type: string, ...args: string[]): Promise<RawData> {
        return {};
    }

    constructor () {
        this.internal.$on('query', (query) => {
            sendMessage('query', JSON.stringify(query));
        })

        if (connection_data) this.server_address = new URL(connection_data.address);
    }
}

export const DB = new Database();