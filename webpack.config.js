var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/js/main.js',
    output: {
      filename: 'main.min.js',
      path: path.resolve(__dirname, 'client/build/js'),
    },
    module: {
      rules: [
        {
          test: /.dot$/,
          use: 'dot-loader',
        }
      ]
    },
};
