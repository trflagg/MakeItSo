

var dot = require('dot')
, GameScreen = require('./gameScreen')
    , template = require('../../../templates/screens/titleScreen.dot');

  module.exports = titleScreen = GameScreen.extend({
    events: {
      'click .continue': 'continue'
    }

      , initialize: function() {
      GameScreen.prototype.initialize.apply(this);

        this.template = dot.template(template);
      this.render();
    }

    , render: function() {
      $(this.el).html(this.template({
      }));
      return this;
    }

    , outputLastResult: function() {
        this.$el.html(this.template({
            content: this.model.get('ship').get('lastResult')
        }));
    }

    , continue: function() {
      // ship MUST have a root message named 'Continue'
      // when it sets screen = 'TITLE'
      this.model.get('ship').runCommand('Continue');
    }
  });
