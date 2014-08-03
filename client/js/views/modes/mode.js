/**
 * mode.js
 *
 * Superclass for application modes.
 * Modes are a high-level organization of related UX.
 * The application can only be in one mode at a time.
 *
 */

define(['backbone'], function(Backbone) {

    var mode = Backbone.View.extend({

        /**
         * initialize()
         *
         * general initialization for all modes
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

    return mode;
});
