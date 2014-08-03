/**
 * newShipMode.js
 *
 * Mode for the user to select options to set up his new ship.
 *
 */

define(['./mode'
        , 'doT!/templates/newShip'

], function(Mode
            , template
) {

    var newShipMode = Mode.extend({

        /**
         * init()
         *
         * initialize this mode
         * @return {None}
         */
        init: function() {
            this.template = template;
            this.render();
        }

        /**
         * render()
         *
         * draw the view
         * @return {html}
         */
        , render: function() {
            return $(this.el).html(this.template());
        }
    });

    return newShipMode;
});
