import fs from 'fs-extra'
import path from 'path'
import crypto from 'crypto'
import { Path as PathParser } from 'path-parser'
import { fileURLToPath } from 'url'
import { setOutput } from '@actions/core'
import { webpackCI } from './types/webpack.js'

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

export type Releases = { pkg: string, assets: Record<string, string>, version: string }[]

(async () => {
    const dir = path.join(__dirname, '..', 'packages')

    const dist = path.join(__dirname, '..', 'dist')

    await fs.ensureDir(dist)

    const releases: Releases = []

    let changelog = ''

    for await (const pkg of pkgs) {
        const pkg_dir = path.join(dir, pkg)
        const files = await fs.readdir(pkg_dir)

        if (files.includes('webpack.config.js')) {
            const CI = webpackCI(pkg_dir, release, releases, dist, pkg)

            if (CI) changelog += CI
        }
    }

    if (release) {
        setOutput('release', process.env.COMMIT_MESSAGE.split(' ').slice(1).join(' '))

        let manifest: any = {};

        try {
            manifest = await (await fetch(`https://github.com/${process.env.REPOSITORY}/releases/latest/download/manifest.json`)).json()
        } catch (e) {}

        const mergeManifest = { tag: `v${process.env.COMMIT_HASH}`, previous: undefined }

        if (manifest.tag) {
            mergeManifest.previous = manifest.tag

            changelog += `Compare: https://github.com/${process.env.REPOSITORY}/compare/${manifest.tag}...${mergeManifest.tag}`
        }

        for await (const { pkg, assets, version } of releases) {
            const resolvedAssets: any = {}

            for await (const [ name, asset ] of Object.entries(assets)) {
                resolvedAssets[name] = {
                    src: `https://github.com/${process.env.REPOSITORY}/releases/latest/download/${asset.split('dist/')[1]}`,
                    hash: crypto.createHash('sha512').update(await fs.readFile(asset)).digest('base64')
                }
            }

            mergeManifest[pkg] = {
                assets: resolvedAssets,
                version,
                tag: mergeManifest.tag,
            }
            if (manifest.tag) mergeManifest[pkg].previous = manifest.tag
        }

        const manifestPath = path.join(dist, 'manifest.json')

        await fs.writeFile(manifestPath, JSON.stringify({ ...manifest, ...mergeManifest }))

        releases.push({
            assets: { manifest: manifestPath },
            pkg: '',
            version: '',
        })
    }

    setOutput('assets', releases.length === 0 ? 'false' : releases.flatMap((r) => Object.entries(r.assets).map(([n, s]) => s)).join('\n'))

    setOutput('changelog', release ? changelog : 'false')
})()