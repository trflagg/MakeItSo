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

        }


        /**
         * keyDown()
         *
         * generic keydown handler
         * @param  {event} event keydown event
         * @return {Boolean} if the event should bubble down to subclass
         */
        , keyDown: function(event) {

            // enter key
            if (event.keyCode === 13) {
                if (this.valid()) {
                    // submit and move on
                }
                else {

                }

                return false;
            }

            return true;
        }

        /**
         * valid()
         *
         * generic validation function to be implemented by subclass
         * @return {Boolean} true if screen is valid
         */
        , valid: function() {
            return true;
        }

    });

    return screen;
});
