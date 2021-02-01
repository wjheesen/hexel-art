const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'source-map',
    watch: true,
    module: {
        rules: [{
            test: /\.ts$/,
            use: { loader: 'ts-loader', options: {onlyCompileBundledFiles: true}},
            exclude: /node_modules/,
        }, ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'docs'),
    },
};