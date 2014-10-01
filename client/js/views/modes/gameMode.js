/**
 * gameMode.js
 *
 * Mode for the user to select his ship.
 *
 */

define(['./mode'
        , '../screens/titleScreen'
        , '../screens/simpleScreen'
        , 'doT!/templates/modes/gameMode'

], function(Mode
            , TitleScreen
            , SimpleScreen
            , template
) {

    var gameMode = Mode.extend({

        init: function() {
            this.listenTo(this.model.get('ship'), 'change:screen', this.screenChanged);
            this.template = template;
        }

        , render: function() {
            $(this.el).html(this.template());
            this.setScreen(this.model.get('ship').get('screen'));

            return this;
        }

        , screenChanged: function() {
            this.setScreen(this.model.get('ship').get('screen'));
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

                case 'SIMPLE':
                    this.screen = new SimpleScreen({
                        model: this.model
                        , el: this.$("#screen")
                    })
                    break;
            }
        }

    });

    return gameMode;
});
