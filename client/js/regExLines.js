define([], function() {

  regExLines = [
  {
    regEx: /^(\[Rdml. Collins\]:)(.*)$/
    , functionBody: function(currentLine, args) {
      return "<span class='collins'>" + args[1] + "</span>" + args[2];
    }
  }, {
    regEx: /^(\[Cpt. MacKenzie\]:)(.*)$/
    , functionBody: function(currentLine, args) {
      return "<span class='mackenzie'>" + args[1] + "</span>" + args[2];
    }
  }, {
    regEx: /^(\[Cpt. Hawkins\]:)(.*)$/
    , functionBody: function(currentLine, args) {
      return "<span class='hawkins'>" + args[1] + "</span>" + args[2];
    }
  }, {
    regEx: /^(\[Cpt. Golz\]:)(.*)$/
    , functionBody: function(currentLine, args) {
      return "<span class='golz'>" + args[1] + "</span>" + args[2];
    }
  }, {
    regEx: /^(\[Cpt. Banerjee\]:)(.*)$/
    , functionBody: function(currentLine, args) {
      return "<span class='banerjee'>" + args[1] + "</span>" + args[2];
    }

  }

  ];

  return regExLines;
});
