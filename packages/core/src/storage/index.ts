import { RawData } from "../plugin/index.js";
import { PrismaClient } from '@prisma/client';

export class Database {
    public internal = new PrismaClient({ log: [{ level: 'query', emit: 'event' }] });

    public readonly server_address: URL;

    public readonly migrations = database_migrations();

    /**
     * Requests 
     * @param request_type The type of Data you are requesting, eg. track
     * @param args Any arguments you want passed with the request, eg. a track id
     */
    async request (request_type: string, ...args: string[]): Promise<RawData> {
        return {};
    }

    constructor () {
        

        this.server_address = new URL("http://localhost:4829");
    }
}

export const DB = new Database();