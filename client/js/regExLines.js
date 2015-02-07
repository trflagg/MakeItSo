define([], function() {

  regExLines = [
  {
    regEx: /^(\[Rdml. Collins\])(.*)$/
    , functionBody: function(currentLine, args) {
      return "~" + currentLine + "~";
    }
  }];

  return regExLines;
});
