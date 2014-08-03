/**
 * appView.js
 *
 * View that runs the application level.
 * Responsible for switching between modes.
 *
 */

define(['backbone'
        , '../models/appModel'

], function(Backbone
            , AppModel
) {

    var appView = Backbone.View.extend({

        /**
         * initialize()
         *
         * initialize the view
         * @return {None}
         */
        initialize: function() {
            this.model = new AppModel();
            this.listenTo(this.model, 'change', this.modelChanged);

            // start the app
            this.start();
        }

        /**
         * start()
         *
         * start the application
         * @return {None}
         */
        , start: function() {

            // start the app by having the model get the starting mode
            this.model.setStartMode();
        }

        /**
         * modelChanged()
         *
         * fired when the model changes
         * @return {None}
         */
        , modelChanged: function() {

            if (this.model.hasChanged('mode')) {
                console.log(this.model.get('mode'));
            }
        }


    })

    return appView;
})
