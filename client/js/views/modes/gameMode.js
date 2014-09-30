/**
 * gameMode.js
 *
 * Mode for the user to select his ship.
 *
 */

define(['./mode'
        , '../screens/titleScreen'
        , 'doT!/templates/modes/gameMode'

], function(Mode
            , TitleScreen
            , template
) {

    var gameMode = Mode.extend({

        init: function() {
            this.template = template;
        }

        , render: function() {
            $(this.el).html(this.template());
            this.setScreen(this.model.get('ship').get('screen'));

            return this;
        }

        , setScreen: function(screenName) {
            // TODO: avoid memory leaks
            switch(screenName) {
                case 'TITLE':
                    this.screen = new TitleScreen({
                        model: this.model
                        , el: this.$("#screen")
                    })
                    break;
            }
        }

    });

    return gameMode;
});
