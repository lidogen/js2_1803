const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const htmlPlugin = require('html-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // context: path.join(__dirname, 'your-app'),
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/static',
      to: 'static'},
      { from: './src/**/*.json',
      to: 'api/[name].[ext]'},
      { from: './src/**/*.jpg',
        to: 'img/[name].[ext]'},
      { from: './src/**/*.png',
        to: 'img/[name].[ext]'}
    ]),
    new miniCss({
        filename: 'css/[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false
      }
    ),
    new vueLoaderPlugin(),
    new htmlPlugin(
      {
        template: './src/index.html',
      }
    ),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: miniCss.loader,
          options: {
            publicPath: "../",
            hmr: process.env.NODE_ENV === "development",
            esModule: true
          }
        }, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      }
    ],
  },
  devServer: {
    open: true,
    hot: true,
    port: 5432
  }
}
