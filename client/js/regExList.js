if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function(require, exports, module) {
  regExList = [
  {
    functionName: 'clearScreen'
    , placeholder: '{% CLEAR_SCREEN %}'
    , regEx: /^{% CLEAR_SCREEN %}/
    , functionBody: function(lines, $output, args) {
      console.dir('clear screen');
      return lines;
    }
  }

  , {
    functionName: 'wait'
    , placeholder: '{% WAIT(%d) %}'
    , regEx: /^{% WAIT\((\d+)\) %}/
    , functionBody: function(lines, $output, args) {
      console.dir('wait '+args[1]);
      var gameScreen = this;
      setTimeout(function() {
        gameScreen.outputLines(lines, $output)
      }, args[1])
      return [];
    }
  }];

  return regExList;
});
