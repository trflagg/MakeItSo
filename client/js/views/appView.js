/**
 * appView.js
 *
 * View that runs the application level.
 * Responsible for switching between modes.
 *
 */

define(['backbone'
        , '../models/appModel'
        , '../views/modes/newShipMode'

], function(Backbone
            , AppModel
            , NewShipMode
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
            this.listenTo(this.model, 'change:mode', this.modeChanged);

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
         * modeChanged()
         *
         * fired when the mode changes
         * @return {None}
         */
        , modeChanged: function() {


            switch(this.model.get('mode')) {
                case 'newProfile':

                    // fade out old mode.
                    $('#contents').fadeOut('slow', function() {
                        this.mode = new NewShipMode({
                            el: $("#contents")
                        });

                        $("#contents").fadeIn('slow');
                    });
                    break;
            }
        }


    })

    return appView;
})
