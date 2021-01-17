const path = require('path');

module.exports = {
    entry: './src/index.ts',
    devtool: 'source-map',
    watch: true,
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
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