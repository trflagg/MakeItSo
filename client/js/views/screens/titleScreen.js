

define(['./gameScreen'
        , 'doT!/templates/screens/titleScreen'

], function(GameScreen
            , template
) {

  var titleScreen = GameScreen.extend({
    events: {
      'click .continue': 'continue'
    }

    , initialize: function() {
      GameScreen.prototype.initialize.apply(this);

      this.template = template;
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

  return titleScreen;
});
