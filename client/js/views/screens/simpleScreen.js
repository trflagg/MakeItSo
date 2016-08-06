

define(['./gameScreen'
        , 'views/commandHolderView'
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
        , el: this.$("#rootCommands")
      });
      this.listenTo(this.rootCommands, 'run', this.runCommand);
      this.listenTo(this.model.get('ship'), 'change:children', this.commandsChanged);
      this.outputLastResult();
    }

    , render: function() {
      $(this.el).html(this.template({}));

      // TODO: unbind this event handler in an onClose() method
      // Probably also need to call that onClose() from the mode's
      // onClose()
      $("#simpleScreen").height($(window).height());
      $(window).resize(function() {
          $("#simpleScreen").height($(window).height());
      })

    }
        , onClose: function() {

            this.rootCommands.close();
            $(window).off('resize');
        }

    , runCommand: function(command) {
      this.model.get('ship').runCommand(command.get('text'));
    }

    , commandsChanged: function() {
      this.rootCommands.render();
    }

    , outputDone: function() {
      this.$("#commands").show();
    }
  });

  return simpleScreen;
});
