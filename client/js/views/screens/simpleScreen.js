

var dot = require('dot')
, GameScreen = require('./gameScreen')
, CommandHolderView = require('../commandHolderView')
, template = require('../../../templates/screens/simpleScreen.dot');

module.exports = simpleScreen = GameScreen.extend({
    events: {
        'click .continue': 'continue'
    }

    , initialize: function() {
        GameScreen.prototype.initialize.apply(this);

        this.template = dot.template(template);

        this.render();

        this.rootCommands = new CommandHolderView({
            model: this.model.get('ship')
            , el: this.$("#rootCommands")
        });
        this.listenTo(this.rootCommands, 'run', this.runCommand);
        this.model.get('ship').set('show_children', true);

        this.listenTo(this.model.get('ship'), 'change:children', this.commandsChanged);
        this.listenTo(this, 'output_begin', this.outputBegin);
    }

    , render: function() {
        $(this.el).html(this.template({
            ship: this.model.get('ship')
        }));
    }

    , onClose: function() {
        this.rootCommands.close();
        $(window).off('resize');
    }

    , runCommand: function(command) {
        this.model.get('ship').runCommand(command.full_path());
    }

    , commandsChanged: function() {
        this.rootCommands.render();
    }

    , outputBegin: function() {
        this.$("#rootCommands").hide();
    }

    , outputDone: function() {
      this.$("#rootCommands").show();
    }

  });
