/**
 * newShipMode.js
 *
 * Mode for the user to select options to set up his new ship.
 *
 */

define(['./mode'], function(Mode) {

    var newShipMode = Mode.extend({

        /**
         * init()
         *
         * initialize this mode
         * @return {None}
         */
        init: function() {
            console.log('Welcome Captain, please enter your name: ');
        }
    });

    return newShipMode;
});
