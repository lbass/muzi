const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dir_js = path.resolve(__dirname, 'src');
const dir_public = path.resolve(__dirname, 'public');
module.exports = {
  entry: [
    dir_js + '/app.js',
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server'
  ],
  output: {
    path: '/',
    filename: 'app.js'
  },
  devServer: {
    inline: true,
    hot: true,
    filename: 'app.js',
    publicPath: '/',
    contentBase: './public',
    proxy: {
        "**": "http://localhost:3000"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: [ 'angular-template-url-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/ }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"]
  }
}
