

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
      this.listenTo(this.model.get('ship'), 'change:children', this.commandsChanged);
    }

    , render: function() {
      return this.outputLastResult();
    }

    , runCommand: function(commandText) {
      this.model.get('ship').runCommand(commandText);
    }

    , commandsChanged: function() {
      //TODO: avoid memory leak
      // probably have view reload rather than recreate it every time
      this.rootCommands = new CommandHolderView({
        model: this.model.get('ship')
        , el: this.$("#commands")
      });
    }
  });

  return simpleScreen;
});
