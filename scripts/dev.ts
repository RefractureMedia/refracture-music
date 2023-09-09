import fs from 'fs-extra'
import path from 'path'
import * as child from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

(async () => {
    const dir = path.join(__dirname, '..', 'packages', 'core')

    const exec = (cmd: string) => child.execSync(cmd, { cwd: dir })

    exec('pnpm i')
    exec('pnpm webpack')

    await fetch('http://localhost:4578', {
        method: 'POST',
        body: await fs.readFile(path.join(dir, 'dist', 'bundle.js'), { encoding: 'utf8' })
    })
})()