import fs from 'fs-extra'
import path from 'path'

function trimCode(input: string) {
    let s = input;

    const leading = new RegExp(`^${s.match(/^\n( +)/g)[0].slice(1)}`,'gm');

    return s.replaceAll(leading, '').trim();
}

export async function webpackDB(pkg_dir: string) {
    const dates: {date: number, index: number}[] = [];
    const sql: string[] = [];

    const dir = path.join(pkg_dir, 'prisma', 'migrations');

   for await (const [index, migration] of (await fs.readdir(dir)).entries()) {
        if (migration !== 'migration_lock.toml') {
            const date = Number(migration.split('_')[0]);

            dates.push({ date, index });

            sql.push(await fs.readFile(path.join(dir, migration, 'migration.sql'), 'utf-8'));
        }
    }

    dates.sort((a, b) => b.date - a.date);

    await fs.ensureDir(path.join(pkg_dir, 'pack', 'database'));

    await fs.writeFile(path.join(pkg_dir, 'pack', 'database', 'index.cjs'), trimCode(`
        function database_migrations() {
            return () => ([
        ${dates.map(({date, index}) => `        [${date}, \`${sql[index]}\`],`).join('\n')}
            ])
        }

        module.exports = {
            database_migrations
        }
    `))
}