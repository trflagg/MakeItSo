/**
 * newShipMode.js
 *
 * Mode for the user to select options to set up his new ship.
 *
 */

define(['./mode'
        , '../screens/enterNameScreen'

], function(Mode
            , EnterNameScreen
) {

    var newShipMode = Mode.extend({

        /**
         * init()
         *
         * initialize this mode
         * @return {None}
         */
        init: function() {
            // start with enterName
            this.screen = new EnterNameScreen({
                el: this.el
            });

            this.render();
        }

        /**
         * render()
         *
         * draw current screen.
         * @return {html}
         */
        , render: function() {
            return this.screen.render();
        }

    });

    return newShipMode;
});
