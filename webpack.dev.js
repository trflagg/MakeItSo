var path = require('path');
var webpack = require('webpack');
var Merge = require('webpack-merge');
var CommonConfig = require('./webpack.common');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = Merge(CommonConfig, {
  mode: 'development',
  entry: {
    main: './client/js/main.js',
    gameMode: './client/js/gameModeEntry.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    //new CleanWebpackPlugin(['dist']),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
});
