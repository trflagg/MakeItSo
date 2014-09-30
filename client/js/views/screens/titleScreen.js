

define(['./gameScreen'
        , 'doT!/templates/screens/TitleScreen'

], function(GameScreen
            , template
) {

  var shipNameScreen = GameScreen.extend({
    initialize: function() {
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

  return shipNameScreen;
});
