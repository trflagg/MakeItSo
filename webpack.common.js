var path = require('path');
var webpack = require('webpack');

module.exports = {
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
          path.resolve(__dirname, 'client/js/gameModeEntry.js'),
          path.resolve(__dirname, 'client/js/views/modes/gameMode.js'),
        ],
        use: [
          {
            loader: 'babel-loader',
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          }
        ],
      },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: '$',
        }]
      }
    ]
  },
};
