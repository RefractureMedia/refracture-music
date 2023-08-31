import fs from 'fs-extra'
import path from 'path'
import { Path as PathParser } from 'path-parser'
import { fileURLToPath } from 'url'
import * as child from 'child_process'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const paths: string[] = process.env.COMMIT_PATHS.split(' ');

const pkgs: string[] = []

const parse = new PathParser('packages/:package');

for (const path of paths) {
    const test = parse.partialTest(path)

    if (test && !pkgs.includes(test.package)) {
        pkgs.push(test.package)
    }
}

(async () => {
    const dir = path.join(__dirname, '..', 'packages')

    const dist = path.join(__dirname, '..', 'dist')

    await fs.ensureDir(dist)

    for (const pkg of pkgs) {
        const pkg_dir = path.join(dir, pkg)
        const files = await fs.readdir(pkg_dir)

        if (files.includes('webpack.config.js')) {
            const exec = (cmd: string) => child.execSync(cmd, { cwd: pkg_dir })

            exec('npm i')
            exec('npm run webpack')

            console.info(`${pkg}-${process.env.COMMIT_HASH}.js`)

            await fs.rename(path.join(pkg_dir, 'dist', 'bundle.js'), path.join(dist, `${pkg}-${process.env.COMMIT_HASH}.js`))
        }
    }
})()