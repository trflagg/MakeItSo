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

            this.init();
        }

        /**
         * init()
         *
         * to be overridden by subclasses
         * @return {None}
         */
        , init: function() {
            // noop
        }

    });

    return screen;
});
