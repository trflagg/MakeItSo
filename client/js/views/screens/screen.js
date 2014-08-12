/**
 * screen.js
 *
 * Superclass for different form items shown one screen at a time.
 *
 */

define(['backbone'], function(Backbone) {

    var screen = Backbone.View.extend({

        /**
         * initialize()
         *
         * general initialization for all screens
         * @return {None}
         */
        initialize: function() {
            this.mode = null;

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

        , setMode: function(mode) {
            this.mode = mode;
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

    return screen;
});
