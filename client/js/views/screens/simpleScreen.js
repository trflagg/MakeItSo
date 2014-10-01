

define(['./gameScreen'
        , 'doT!/templates/screens/simpleScreen'

], function(GameScreen
            , template
) {

  var simpleScreen = GameScreen.extend({
    events: {
      'click .continue': 'continue'
    }

    , initialize: function() {
      GameScreen.prototype.initialize.apply(this);

      this.template = template;
      this.render();
    }

    , render: function() {
      return this.outputLastResult();
    }
  });

  return simpleScreen;
});
