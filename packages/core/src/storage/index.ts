import { RawData } from "../plugin/index.js";
import { PrismaClient } from '@prisma/client/edge.js';
import { LoggerClass } from "../util/logging.js";

export class Database {
    public internal!: PrismaClient;

    public readonly server_address: URL;

    /**
     * Requests 
     * @param request_type The type of Data you are requesting, eg. track
     * @param args Any arguments you want passed with the request, eg. a track id
     */
    async request (request_type: string, ...args: string[]): Promise<RawData> {
        return {};
    }

    async init() {
        const test = this.internal.track.findFirst();

        const { Logger } = music.core;

        test.catch((e) => Logger.error(e));

        test.then((f) => Logger.info(f));
    }

    constructor () {
        this.internal = new PrismaClient({ datasourceUrl: 'prisma://core.app.music/core?api_key=43278ykjsd', log: [{ level: 'query', emit: 'event' }] });

        this.server_address = new URL("http://localhost:4829");
    }
}