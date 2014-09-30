module.exports.regExList = [
{
  functionName: 'setScreen'
  , placeholder: '{% SET_SCREEN(%s) %}'
  , regEx: /^{% SET_SCREEN\((\s+)\) %}$/
  , functionBody: function(screen) {
    console.dir('set screen:' + screen);
  }
}];
