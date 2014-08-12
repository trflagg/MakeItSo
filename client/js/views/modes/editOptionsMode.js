/**
 * editOptionsMode.js
 *
 * Mode for the user to select options to set up his new ship.
 *
 */

define(['./mode'
        , '../screens/enterNameScreen'
        , '../screens/askHandinessScreen'
        , 'doT!/templates/editOptionsMode'

], function(Mode
            , EnterNameScreen
            , AskHandinessScreen
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
            this.currentScreen = 0;
            this.template = template;
            this.render();

            // default list of screens.
            this.addScreen(EnterNameScreen);
            this.addScreen(AskHandinessScreen);

            // start with the first one.
            this.displayScreen(this.screens[this.currentScreen]);
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
            newScreen.setMode(this);
            this.screens.push(newScreen);
            $newScreen.attr('id','screen'+this.screens.length);
        }

        , displayScreen: function(nextScreen) {
            this.$("#screens").append(nextScreen.el);
            nextScreen.activate();
        }

        , nextScreen: function() {
            this.currentScreen++;
            if (this.currentScreen < this.screens.length) {
                this.displayScreen(this.screens[this.currentScreen]);
            }
        }

    });

    return editOptionsMode;
});
