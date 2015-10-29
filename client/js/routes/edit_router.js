define(['backbone'
        , '../views/edit/modes/listMessagesMode'

], function(Backbone
            , ListMessagesMode
) {

  var EditRouter = Backbone.Router.extend({

    initialize: function(options) {
      this.appView = options.appView;
    },

    routes: {
      "":            "index",
      "messages":     "view_messages",
    },

    view_messages: function() {
      this.appView.setMode(new ListMessagesMode({
        el: $("<div></div>")
      }));
      this.appView.mode.render();
    },

    index: function() {
      Backbone.history.navigate("messages", {trigger: true});
    }
  });

return EditRouter;

});
