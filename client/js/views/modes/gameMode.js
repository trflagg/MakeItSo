/**
 * gameMode.js
 *
 * Mode for the user to select his ship.
 *
 */

define(['./mode'
        , 'doT!/templates/modes/gameMode'

], function(Mode
            , template
) {

    var gameMode = Mode.extend({

        , init: function() {
            this.template = template;
        }

        , render: function() {
            $(this.el).html(this.template({
            }));

            return this;
        }

    });

    return gameMode;
});
