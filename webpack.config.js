const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const NodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'production',
    target: 'node',
    devtool: false,
    entry: {
        bench: path.resolve(__dirname, './src/benchmark/index.js'),
        server: path.resolve(__dirname, './src/server/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        library: { type: 'commonjs-module' }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    plugins: ['@vue/babel-plugin-jsx']
                },
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    hotReload: false,
                    optimizeSSR: true,
                    compilerOptions: {
                        preserveWhitespace: false,
                    },
                },
                exclude: /node_modules/,
            },
        ]
    },
    externals: [NodeExternals({ allowlist: [/\.(eot|ttf|woff|woff2|otf|css)$/, /markdown-table/] })],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __VUE_OPTIONS_API__: 'false',
            __VUE_PROD_DEVTOOLS__: 'false',
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
        }),
        new VueLoaderPlugin(),
    ]
}