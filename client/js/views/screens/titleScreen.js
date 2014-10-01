

define(['./gameScreen'
        , 'doT!/templates/screens/TitleScreen'

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
      console.log('continue');
    }
  });

  return titleScreen;
});
