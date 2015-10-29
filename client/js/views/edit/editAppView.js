define(['backbone'
        , '../../routes/edit_router'

], function(Backbone
            , EditRouter
) {

    var editAppView = Backbone.View.extend({

      initialize: function() {
        new EditRouter();
        if (Backbone.history.start({pushState: true, root: "/edit/"})) {
          console.log('Router created');
        } else {
          console.log('history.start error');
        }
      }
    });

    return editAppView;
});
