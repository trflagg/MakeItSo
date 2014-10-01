

define(['./gameScreen'
        , 'views/CommandHolderView'
        , 'doT!/templates/screens/simpleScreen'

], function(GameScreen
            , CommandHolderView
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

      this.rootCommands = new CommandHolderView({
        model: this.model.get('ship')
        , el: this.$("#commands")
      });
    }

    , render: function() {
      return this.outputLastResult();
    }
  });

  return simpleScreen;
});
