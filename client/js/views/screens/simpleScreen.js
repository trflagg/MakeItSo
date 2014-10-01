

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
      $(this.el).html(this.template({
        content: this.model.get('ship').get('lastResult')
      }));
      return this;
    }
  });

  return simpleScreen;
});
