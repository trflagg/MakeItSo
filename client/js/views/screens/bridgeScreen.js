
var GameScreen = require('./gameScreen')
    , CommandHolderView = require('../commandHolderView')
    , template = require('../../../templates/screens/bridgeScreen.dot');
  module.exports = bridgeScreen = GameScreen.extend({
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
      this.listenTo(this, 'output_begin', this.outputBegin);
    }

    , render: function() {
      $(this.el).html(this.template({
            ship: this.model.get('ship')
          , handiness: this.model.get('profile').get('handiness')
      }));
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

    , outputBegin: function() {
        this.$("#rootCommands").hide();
        this.$("#shipCommands").hide();
        this.$("#crewCommands").hide();
    }

    , outputDone: function() {
        this.$("#rootCommands").show();
        this.$("#shipCommands").show();
        this.$("#crewCommands").show();
    }
  });
