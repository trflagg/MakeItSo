

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

    , runCommand: function(commandText) {
      this.model.get('ship').runCommand(commandText);
    }

    , commandsChanged: function() {
      //TODO: avoid memory leak
      // probably have view reload rather than recreate it every time
      this.rootCommands = new CommandHolderView({
        model: this.model.get('ship')
        , el: this.$("#rootCommands")
      });
    }

    , outputDone: function() {
      this.$("#commands").show();
    }
  });

  return simpleScreen;
});
