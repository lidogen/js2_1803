const miniCss = require('mini-css-extract-plugin')
const htmlPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                      loader: miniCss.loader,
                      options: {
                        publicPath: '../',
                        hmr: process.env.NODE_ENV === 'development',
                      },
                    },
                    'css-loader',
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new miniCss({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }), 
        new htmlPlugin({
            template: './src/public/index.html'
        }),
        new CopyPlugin([
            { from: './src/public/assets', to: './' },
        ]),
        new VueLoaderPlugin()
    ],
    devServer: {
        open: true,
        hot: true,
        port: 3000
    }
}
