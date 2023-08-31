import * as child from 'child_process'
import fs from 'fs-extra'
import path from 'path'
import { lexer } from 'marked'
import { Releases } from '../common.js'

export async function webpackCI(pkg_dir: string, release: boolean, releases: Releases, dist: string, pkg: string) {
    const exec = (cmd: string) => child.execSync(cmd, { cwd: pkg_dir })

    exec('pnpm i')
    exec('pnpm webpack')

    let version = process.env.COMMIT_HASH;

    if (release) version = JSON.parse(await fs.readFile(path.join(pkg_dir, 'package.json'), { encoding: 'utf-8' })).version

    const asset = path.join(dist, `${pkg}-${version}.js`)

    releases.push({ pkg, assets: { bundle: asset }, version })

    await fs.rename(path.join(pkg_dir, 'dist', 'bundle.js'), asset)

    if (release) {
        const lexed = lexer(await fs.readFile(path.join(pkg_dir, 'changelog.md'), { encoding: 'utf-8' })).slice(1)

        const second_heading = lexed.findIndex((c) => c.type === 'heading' && c.raw.startsWith('# '))

        return `## /music-${pkg} v${version}\n` +
            `${lexed.slice(0, second_heading === -1 ? undefined : second_heading).map((c) => c.raw).join('\n')}\n\n`
    }

    return false
}