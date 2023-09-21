const webpack = require('webpack');

module.exports = [new webpack.DefinePlugin({
    ...require('./database/index.cjs'),
})];