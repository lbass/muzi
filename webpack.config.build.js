const path = require('path');
const package = require('./package.json');
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dir_js = path.resolve(__dirname, 'src');
const dir_build = path.resolve(__dirname, 'build');
const dir_public = path.resolve(__dirname, 'public');

module.exports = {
  entry: [
    dir_js + '/app.js'
  ],
  output: {
    path: dir_public,
    filename: 'app.js'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    },{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          "presets": ["env","es2015"]
        }
      }
    },
    {
      test: /\.js$/,
      loader: [ 'angular-template-url-loader' ],
      exclude: /node_modules/
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
      exclude: /node_modules/ }],
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.BannerPlugin('http://www.futurestream.co.kr/ (c) FuturestreamNetworks Corp')
  ],
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"]
  }
}
