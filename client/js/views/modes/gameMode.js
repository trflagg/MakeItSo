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
    , template = require('../../../templates/modes/gameMode.dot');

    module.exports = gameMode = Mode.extend({

        init: function() {
            this.listenTo(this.model.get('ship'), 'change:screen', this.screenChanged);
            this.template = dot.template(template);

          this.directMessagesVisible = false;
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
            this.listenTo(this.screen, 'toggleDirectMessages', this.toggleDirectMessages);
        }

        , toggleDirectMessages: function() {
          if (!this.directMessagesVisible) {
            this.directMessageScreen = new DirectMessageScreen({
              model: this.model
              , el: this.$("#directMessageScreen")
            });
            this.directMessagesVisible = true;
          } else {
            this.directMessageScreen.undelegateEvents();
            this.$("#directMessageScreen").children().remove();
            this.directMessageScreen = null;
            this.directMessagesVisible = false;
          }
        }

    });
