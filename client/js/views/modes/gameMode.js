/**
 * gameMode.js
 *
 * Mode for the user to select his ship.
 *
 */


var dot = require('dot')
, Mode = require('./mode')
    , TitleScreen = require('../screens/titleScreen')
    , SimpleScreen = require('../screens/simpleScreen')
    , BridgeScreen = require('../screens/bridgeScreen')
    , DirectMessageScreen = require('../screens/directMessageScreen')
    , DirectMessagesButton = require('../directMessagesButton')
    , template = require('../../../templates/modes/gameMode.dot');

    module.exports = gameMode = Mode.extend({

        init: function() {
            this.listenTo(this.model.get('ship'), 'change:screen', this.renderScreen);
            this.template = dot.template(template);
        }

        , render: function() {

            // render self
            $(this.el).html(this.template({
                ship: this.model.get('ship')
            }));

            // render screen
            this.renderScreen();

            // render other stuff
            this.directMessagesButton = new DirectMessagesButton({
                model: this.model.get('ship').get('directMessages')
                , el: this.$("#directMessages")
            });
            this.directMessageScreen = new DirectMessageScreen({
                model: this.model
                , el: this.$("#directMessageScreen")
            })
            this.directMessagesVisible = false;

            this.listenTo(this.directMessagesButton, 'toggleDirectMessages', this.toggleDirectMessages);
            console.log('gameMode.render() - memory leak check');

            return this;
        }

        , onClose: function() {
            this.stopListening(this.directMessagesButton);
        }

        , screens: {
            TITLE: TitleScreen
            , SIMPLE: SimpleScreen
            , BRIDGE: BridgeScreen
        }

        , renderScreen: function() {
            var screenName = this.model.get('ship').get('screen');

            if (this.screen) {
                this.screen.close();
            }

            if (this.screens[screenName]) {
                // set screen-specific options
                if (screenName === "TITLE") {
                    this.hideHeader();
                } else {
                    this.showHeader();
                }

                this.screen = new this.screens[screenName]({
                    model: this.model
                    , el: this.$("#screen")
                });
            }
        }

        , hideHeader: function() {
            this.$("#header").hide();
        }

        , showHeader: function() {
            this.$("#header").show();
        }

    });
