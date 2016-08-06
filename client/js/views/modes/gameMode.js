/**
 * gameMode.js
 *
 * Mode for the user to select his ship.
 *
 */

define(['./mode'
        , '../screens/titleScreen'
        , '../screens/simpleScreen'
        , '../screens/bridgeScreen'
        , 'doT!/templates/modes/gameMode'

], function(Mode
            , TitleScreen
            , SimpleScreen
            , BridgeScreen
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
            if (this.screen) {
                this.screen.close();
            }

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

                case 'BRIDGE':
                    this.screen = new BridgeScreen({
                        model: this.model
                        , el: this.$("#screen")
                    })
                    break;
            }
        }

    });

    return gameMode;
});
