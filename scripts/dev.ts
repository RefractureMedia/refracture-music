import fs from 'fs-extra'
import path from 'path'
import * as child from 'child_process'
import * as nodemon from 'nodemon'
import { fileURLToPath } from 'url'
import { webpackDB } from './types/database.js'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

var done: void | boolean = (function wait () { if (!done) setTimeout(wait, 1000) })();

const dir = path.join(__dirname, '..', 'packages', 'core');

nodemon.default(`-V -w ${dir} --esm scripts/blank.ts`);

nodemon.default.on('log', ({type, message}) => {
    if (type === 'detail' && message.startsWith('packages/core')) update(message);
});

async function update(file: string) {
    const exec = (cmd: string) => child.execSync(cmd, { cwd: dir })

    if (!(await fs.exists(path.join(dir, 'pack', 'database', 'index.js')))) await webpackDB(dir);

    if (file.endsWith('.prisma')) {
        exec('pnpm prisma migrate dev --create-only -n refracture');

        await webpackDB(dir);
    }

    exec('pnpm i')
    exec('pnpm webpack')

    await fetch('http://127.0.0.1:4578', {
        headers: {
            "Accept": '*/*'  
        },
        method: 'POST',
        body: await fs.readFile(path.join(dir, 'dist', 'bundle.js'), { encoding: 'utf8' })
    })
}