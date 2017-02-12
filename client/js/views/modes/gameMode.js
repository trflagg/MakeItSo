/**
 * gameMode.js
 *
 * Mode for the user to select his ship.
 *
 */


var dot = require('dot')
, Mode = require('./mode')
    , TitleScreen = require('../screens/titleScreen')
    , CrawlScreen = require('../screens/crawlScreen')
    , SimpleScreen = require('../screens/simpleScreen')
    , BridgeScreen = require('../screens/bridgeScreen')
    , DirectMessageScreen = require('../screens/directMessageScreen')
    , DirectMessagesButton = require('../directMessagesButton')
    , template = require('../../../templates/modes/gameMode.dot');

    module.exports = gameMode = Mode.extend({

        init: function() {
            this.listenTo(this.model.get('ship'), 'parse_done', this.shipChanged);
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
                , el: this.$("#buttons")
            });
            this.directMessageScreen = new DirectMessageScreen({
                model: this.model
                , el: this.$("#directMessageScreen")
            })
            this.directMessagesVisible = false;
            this.listenTo(this.directMessagesButton, 'toggleDirectMessages', this.toggleDirectMessages);

            return this;
        }

        , shipChanged: function() {
            var ship = this.model.get('ship');

            // check screen first
            if (ship.hasChanged('screen')) {
                this.renderScreen();
            }

            // now look for new output
            if (ship.hasChanged('lastResult')) {
                this.screen.outputLastResult();
            }
        }

        , toggleDirectMessages: function() {
            if (!this.directMessagesVisible) {
                this.$("#directMessageScreen").addClass('visible');
                this.$(".gameScreen").addClass('moveDown');
                this.directMessagesVisible = true;
            } else {
                this.$("#directMessageScreen").removeClass('visible');
                this.$(".gameScreen").removeClass('moveDown');
                this.directMessagesVisible = false;
            }
            console.log('toggleDirectMessages');
        }

        , onClose: function() {
            this.stopListening(this.directMessagesButton);
        }

        , screens: {
            TITLE: TitleScreen
            , CRAWL: CrawlScreen
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
                if (screenName === "TITLE"
                 || screenName == "CRAWL") {
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
