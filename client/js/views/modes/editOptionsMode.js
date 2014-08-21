/**
 * editOptionsMode.js
 *
 * Mode for the user to select options to set up his new ship.
 *
 */

define(['./mode'
        , '../screens/enterNameScreen'
        , 'doT!/templates/editOptionsMode'

], function(Mode
            , EnterNameScreen
            , template
) {

    var editOptionsMode = Mode.extend({

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
                , model: this.model
            });
            this.screens.push(newScreen);
            $newScreen.attr('id','screen'+this.screens.length);

            this.$("#screens").append($newScreen);

            // for now (because we only have 1) activate right away
            newScreen.activate();
        }


    });

    return editOptionsMode;
});