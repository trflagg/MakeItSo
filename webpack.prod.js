const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = Merge(CommonConfig, {
  mode: 'production',
  entry: {
    main: './client/js/main.js',
    gameMode: './client/js/gameModeEntry.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/js/'),
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify('production')
      }
    }),
    new UglifyJsPlugin({
      sourceMap: true
    }),
    new CleanWebpackPlugin(['dist/js']),
  ],
});
