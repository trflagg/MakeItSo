

var dot = require('dot')
, GameScreen = require('./gameScreen')
    , template = require('../../../templates/screens/titleScreen.dot');

  module.exports = titleScreen = GameScreen.extend({
    events: {
      'click .continue': 'continue'
    }

    , initialize: function() {
      GameScreen.prototype.initialize.apply(this);
        // forget the event listeners created by the superclass
        this.stopListening();

        this.template = dot.template(template);
      this.render();
    }

    , render: function() {
      $(this.el).html(this.template({
        content: this.model.get('ship').get('lastResult')
      }));
      return this;
    }

    , continue: function() {
      // ship MUST have a root message named 'Continue'
      // when it sets screen = 'TITLE'
      this.model.get('ship').runCommand('Continue');
    }
  });
