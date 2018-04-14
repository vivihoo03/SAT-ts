var path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: {
        view:'./src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        libraryTarget:'umd',
        library:'SAT-ts',
        umdNamedDefine: true
    },
    resolve:{
        extensions: ['.ts', '.tsx', '.js']
    },
    //devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            include: /\.js$/,
        }),
        function() {
            this.plugin('done', function() {
                setTimeout(() => {
                    console.log(`\n[${new Date().toLocaleString()}] End a compilation.\n`);
                }, 100);
            });
        },
    ],
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    query: {
                        presets: [['es2015', {modules: 'umd'}], 'stage-0'],
                        plugins: [
                            'transform-runtime',
                            'transform-es2015-spread',
                        ],
                    },
                },
                {
                    loader: 'awesome-typescript-loader',
                    query: { "declaration": true }
                }
            ]
        }]
    }
}