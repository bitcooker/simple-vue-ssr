const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const path = require('path');

const srcPath = path.resolve(process.cwd(), 'src');

module.exports = {
    entry: path.join(srcPath, 'server-entry.js'),
    target: 'node',
    // For bundle renderer source map support
    devtool: 'source-map',
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [ srcPath ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [ srcPath ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[path][name].[hash:7].[ext]',
                            context: srcPath
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[name].[hash:7].[ext]',
                            publicPath: '/'
                        }
                    }
                ]
            },
        ]
    },

    // This tells the server bundle to use Node-style exports
    output: {
        libraryTarget: 'commonjs2'
    },

    // This is the plugin that turns the entire output of the server build
    // into a single JSON file. The default file name will be
    // `vue-ssr-server-bundle.json`
    plugins: [
        new VueSSRServerPlugin(),
        new VueLoaderPlugin(),
    ]
};