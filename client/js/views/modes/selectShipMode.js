/**
 * selectShipMode.js
 *
 * Mode for the user to select his ship.
 *
 */

define(['./mode'
        , 'doT!/templates/modes/selectShipMode'

], function(Mode
            , template
) {

    var selectShipMode = Mode.extend({

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

        , render: function() {
            $(this.el).html(this.template({
                name: this.model.get('profile').get('name')
                , ships: this.model.get('ships')
            }));
        }

    });

    return selectShipMode;
});
