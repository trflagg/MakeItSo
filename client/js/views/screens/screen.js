/**
 * screen.js
 *
 * Superclass for different form items shown one screen at a time.
 *
 */

var Backbone = require('backbone')

    module.exports =  screen = Backbone.View.extend({

        /**
         * initialize()
         *
         * general initialization for all screens
         * @return {None}
         */
        initialize: function() {
            this.mode = null;
            this.listenTo(this.model, 'invalid', this.invalid);
        }

        /**
         * activate()
         *
         * called when screen is shown to user
         * @return {None}
         */
        , activate: function() {
            // noop
        }

        , setMode: function(mode) {
            this.mode = mode;
        }


        /**
         * invalid()
         *
         * handles invalid events on profile model
         * @return {None}
         */
        , invalid: function() {
            this.showError(this.model.validationError);
        }

        /**
         * next()
         *
         * move to the next screen
         */
        , next: function() {
            this.mode.nextScreen();
        }

    });
