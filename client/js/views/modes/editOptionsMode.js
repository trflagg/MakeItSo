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
            this.displayScreen(this.screens[0]);
        }

        , render: function() {
            $(this.el).html(this.template());
        }

        , addScreen: function(screenClass) {
            var $newScreen = $('<div>')
                .addClass('screen')
                .css('position', 'absolute')
                .css('width', '100%')
                .css('top', '0px')
                .css('left', "0px")
                .css('display', 'none');
            var newScreen = new screenClass({
                el: $newScreen
                , model: this.model
            });
            newScreen.setMode(this);
            this.screens.push(newScreen);

            // any screen after the first one is positioned off to the left
            if (this.screens.length > 1) {
                $newScreen.css('left', $(window).width() + "px");
            }
            $newScreen.attr('id','screen'+this.screens.length);
            this.$("#screens").append($newScreen);
        }

        , displayScreen: function(nextScreen) {
            nextScreen.$el.css('display', 'block');
            nextScreen.activate();
        }

        , nextScreen: function() {
            var $prevScreen
                , $nextScreen;

            this.currentScreen++;
            if (this.currentScreen < this.screens.length) {
                $prevScreen = this.screens[this.currentScreen-1].$el;
                $nextScreen = this.screens[this.currentScreen].$el;
                var amount = -$(window).width();
                $prevScreen.animate({
                    left: amount
                });
                $nextScreen.animate({
                    left: 0
                });

                this.displayScreen(this.screens[this.currentScreen]);
            }
        }

    });

    return editOptionsMode;
});
