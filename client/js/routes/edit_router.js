define(['backbone'

], function(Backbone

) {

  var EditRouter = Backbone.Router.extend({

    routes: {
      "":            "index",
      "messages":     "view_messages",
    },

    view_messages: function() {

    },

    index: function() {
    }
  });

return EditRouter;

});
