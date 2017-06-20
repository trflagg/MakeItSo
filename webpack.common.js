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
      },
      {
        test: /.js$/,
        include: [
          path.resolve(__dirname, 'client/js/react'),
          path.resolve(__dirname, 'client/js/views/modes/gameMode.js')
        ],
        use: [
          {
            loader: 'babel-loader',
          },
        ]
      },
    ]
  },
};
