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

      this.rootCommands = new CommandHolderView({
        model: this.model.get('ship')
        , el: this.$("#rootCommands")
      });

      this.shipCommands = new CommandHolderView({
        model: this.model.get('ship').get('shipControls')
        , el: this.$("#shipCommands")
      });

      this.crewCommands = new CommandHolderView({
        model: this.model.get('ship').get('crew')
        , el: this.$('#crewCommands')
      });

      this.listenTo(this.rootCommands, 'run', this.runCommand);
      this.listenTo(this.shipCommands, 'run', this.runCommand);
      this.listenTo(this.crewCommands, 'run', this.runCommand);

      this.model.get('ship').set('show_children', true);

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

      , onClose: function() {
          this.rootCommands.close();
          this.shipCommands.close();
          this.crewCommands.close();
          $(window).off('resize');
      }

    , runCommand: function(command) {
      this.model.get('ship').runCommand(command.full_path());
    }

    , commandsChanged: function() {
      this.rootCommands.render();
      this.shipCommands.render();
      this.crewCommands.render();
    }

    , outputDone: function() {
      this.$("#commands").show();
    }
  });

  return bridgeScreen;
});
