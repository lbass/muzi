const path = require('path');
const package = require('./package.json');
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dir_js = path.resolve(__dirname, 'src');
const dir_build = path.resolve(__dirname, 'build');

module.exports = {
  entry: {
    main: dir_js + '/index.js'
  },
  output: {
    path: dir_build,
    filename: 'app.js'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.BannerPlugin('http://www.futurestream.co.kr/ (c) FuturestreamNetworks Corp')
  ],
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"]
  }
}
