const webpack = require('webpack');

module.exports = [new webpack.DefinePlugin({
    ...require('./polyfill/index.cjs'),
    ...require('./database/index.cjs'),
})];