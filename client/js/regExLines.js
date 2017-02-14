
  module.exports =regExLines = [
  {
    regEx: /^(\[Rdml. Collins\]:)(.*)$/
    , transformLine: function(currentLine, args) {
      return "<span class='collins'>" + args[1] + "</span>" + args[2];
    }
  }, {
    regEx: /^(\[Cpt. MacKenzie\]:)(.*)$/
    , transformLine: function(currentLine, args) {
      return "<span class='mackenzie'>" + args[1] + "</span>" + args[2];
    }
  }, {
    regEx: /^(\[Cpt. Hawkins\]:)(.*)$/
    , transformLine: function(currentLine, args) {
      return "<span class='hawkins'>" + args[1] + "</span>" + args[2];
    }
  }, {
    regEx: /^(\[Cpt. Golz\]:)(.*)$/
    , transformLine: function(currentLine, args) {
      return "<span class='golz'>" + args[1] + "</span>" + args[2];
    }
  }, {
    regEx: /^(\[Cpt. Banerjee\]:)(.*)$/
    , transformLine: function(currentLine, args) {
      return "<span class='banerjee'>" + args[1] + "</span>" + args[2];
    }

  }

  ];
