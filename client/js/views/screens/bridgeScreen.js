define(['./gameScreen'
        , 'views/commandHolderView'
        , 'doT!/templates/screens/bridgeScreen'

], function(GameScreen
            , CommandHolderView
            , template
) {

  var bridgeScreen = GameScreen.extend({
    events: {
    }

    , initialize: function() {
      GameScreen.prototype.initialize.apply(this);

      this.template = template;

      this.render();

      this.model.get('ship').set('show_children', true);
      this.setNewCommands();

      this.listenTo(this.rootCommands, 'run', this.runCommand);
      this.listenTo(this.model.get('ship'), 'change:children', this.commandsChanged);
      this.outputLastResult();
    }

    , render: function() {
      $(this.el).html(this.template({
        ship: this.model.get('ship')
      }));

      // TODO: unbind this event handler in an onClose() method
      // Probably also need to call that onClose() from the mode's
      // onClose()
      $("#bridgeScreen").height($(window).height());
      $(window).resize(function() {
          $("#bridgeScreen").height($(window).height());
      })
    }

    , runCommand: function(commandText) {
      this.model.get('ship').runCommand(commandText);
    }

    , commandsChanged: function() {
      this.setNewCommands();
    }

    , setNewCommands: function() {
      //TODO: avoid memory leak
      // probably have view reload if it already exists
      // rather than recreate it every time
      this.rootCommands = new CommandHolderView({
        model: this.model.get('ship')
        , el: this.$("#rootCommands")
      });

      this.shipCommands = new CommandHolderView({
        model: this.model.get('ship').get('shipControls')
        , el: this.$("#shipCommands")
      });
    }

    , outputDone: function() {
      this.$("#commands").show();
    }
  });

  return bridgeScreen;
});
