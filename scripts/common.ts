import fs from 'fs-extra'
import path from 'path'
import { Path as PathParser } from 'path-parser'
import { fileURLToPath } from 'url'
import * as child from 'child_process'
import { setOutput } from '@actions/core'
import { lexer } from 'marked'

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

const release = process.env.COMMIT_MESSAGE.startsWith('🚀');

(async () => {
    const dir = path.join(__dirname, '..', 'packages')

    const dist = path.join(__dirname, '..', 'dist')

    await fs.ensureDir(dist)

    const assets: string[] = []

    let changelog = ''

    for await (const pkg of pkgs) {
        const pkg_dir = path.join(dir, pkg)
        const files = await fs.readdir(pkg_dir)

        if (files.includes('webpack.config.js')) {
            const exec = (cmd: string) => child.execSync(cmd, { cwd: pkg_dir })

            exec('pnpm i')
            exec('pnpm webpack')

            const asset = path.join(dist, `${pkg}-${process.env.COMMIT_HASH}.js`)

            assets.push(asset)

            await fs.rename(path.join(pkg_dir, 'dist', 'bundle.js'), asset)

            if (release) {
                const lexed = lexer(await fs.readFile(path.join(pkg_dir, 'changelog.md'), { encoding: 'utf-8' })).slice(1)

                const second_heading = lexed.findIndex((c) => c.type === 'heading' && c.raw.startsWith('# '))

                changelog += 
                    `# /music-${pkg}\n` +
                    `${lexed.slice(0, second_heading).map((c) => c.raw).join('\n')}\n\n`
            }
        }
    }

    setOutput('assets', assets.length === 0 ? 'false' : assets.join('\n'))

    setOutput('changelog', release ? changelog : 'false')

    if (release) setOutput('release', process.env.COMMIT_MESSAGE.split(' ').slice(1).join(' '))
})()