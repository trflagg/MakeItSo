var path = require('path');
var webpack = require('webpack');
var Merge = require('webpack-merge');
var CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://192.168.99.100:8080',
      './client/js/main.js',
    ],
    gameMode: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://192.168.99.100:8080',
      './client/js/gameModeEntry.js',
    ]
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'client/build/js'),
    publicPath: 'http://192.168.99.100:8080/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    hot: true, // Tell the dev-server we're using HMR
    publicPath: '/',
    headers: { 'Access-Control-Allow-Origin': '*' },
    disableHostCheck: true,
    watchOptions: {
      poll: true
    }
  },
});
