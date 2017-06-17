const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  watch: true,
  watchOptions: {
    poll: 1000,
  }
});
