define(['backbone'
        , '../views/edit/modes/listMessagesMode'
        , '../views/edit/modes/editMessageMode'

], function(Backbone
            , ListMessagesMode
            , EditMessageMode
) {

  var EditRouter = Backbone.Router.extend({

    initialize: function(options) {
      this.appView = options.appView;
    },

    routes: {
      "message/:message_name": "edit_message",
      "messages":               "view_messages",
      "":                       "index"
    },

    view_messages: function() {
      this.appView.setMode(new ListMessagesMode({
        el: $("<div id='editContents'></div>")
      }));
      this.appView.mode.render();
    },

    edit_message: function(message_name) {
      this.appView.setMode(new EditMessageMode({
        el: $("<div id='editContents'></div>"),
        message_name: message_name
      }));
      this.appView.mode.render();
    },

    index: function() {
      Backbone.history.navigate("messages", {trigger: true});
    }
  });

return EditRouter;

});
