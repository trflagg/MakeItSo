

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
      this.listenTo(this.rootCommands, 'run', this.runCommand);
    }

    , render: function() {
      return this.outputLastResult();
    }

    , runCommand: function(commandText) {
      this.model.get('ship').runCommand(commandText);
    }
  });

  return simpleScreen;
});
