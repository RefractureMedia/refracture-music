export async function webpackDB(pkg_dir: string) {
    const migrations: { date: number, sql: string }[] = [];

    const output = 
`const webpack = require('webpack');

export default new webpack.DefinePlugin({
    database_migrations: {
        index: [ ${migrations.map(m => m.date).join(', ')} ],
        entries: {
${migrations.map(m => `            ${m.date}: \`${m.sql}\`,`).join('\n')}
        }
    }
})`
}