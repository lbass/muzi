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
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'inline-source-map',
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"]
  }
}
