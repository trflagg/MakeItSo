if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function(require, exports, module) {
  regExList = [
  {
    functionName: 'clearScreen'
    , placeholder: '{% CLEAR_SCREEN %}'
    , regEx: /^{% CLEAR_SCREEN %}/
    , functionBody: function(args) {
      console.dir('clear screen');
      return false;
    }
  }

  , {
    functionName: 'wait'
    , placeholder: '{% WAIT(%d) %}'
    , regEx: /^{% WAIT\((\d+)\) %}/
    , functionBody: function(args) {
      console.dir('wait '+args[1]);
      return false;
    }
  }];

  return regExList;
});
