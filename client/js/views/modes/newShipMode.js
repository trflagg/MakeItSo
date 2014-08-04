/**
 * newShipMode.js
 *
 * Mode for the user to select options to set up his new ship.
 *
 */

define(['./mode'
        , '../screens/enterNameScreen'
        , 'doT!/templates/newShipMode'

], function(Mode
            , EnterNameScreen
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
            this.screens = [];
            this.template = template;
            this.render();

            // start with enterName
            this.addScreen(EnterNameScreen);
        }

        /**
         * render()
         *
         * draw current screen.
         * @return {html}
         */
        , render: function() {
            $(this.el).html(this.template());
        }

        , addScreen: function(screenClass) {
            var $newScreen = $('<div>');
            var newScreen = new screenClass({
                el: $newScreen
            });
            this.screens.push(newScreen);
            $newScreen.attr('id','screen'+this.screens.length);

            this.$("#screens").append($newScreen);
        }


    });

    return newShipMode;
});
