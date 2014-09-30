module.exports.regExList = [
{
  functionName: 'clearScreens'
  , placeholder: '{% CLEAR_SCREEN %}'
  , regEx: /^{% CLEAR_SCREEN %}$/
  , functionBody: function(screen) {
    console.dir('clear screen');
  }
}];
