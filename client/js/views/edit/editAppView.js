define(['backbone'
        , '../../routes/edit_router'

], function(Backbone
            , EditRouter
) {

    var editAppView = Backbone.View.extend({

      initialize: function() {
        new EditRouter({appView: this});
        if (Backbone.history.start({pushState: true, root: "/edit/"})) {
          console.log('Router created');
        } else {
          console.log('history.start error');
        }
      },

      setMode: function(newMode) {
        if (this.mode) {
            this.mode.close();
        }
        else {
            $("#contents").empty();
        }

        this.mode = newMode;
        $("#contents").append(newMode.$el);
    }
    });

    return editAppView;
});
