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
            this.listenTo(this.model.get('ship'), 'change:screen', this.render);
            this.template = dot.template(template);
            this.showHeader = false;
        }

        , screens: {
          TITLE: TitleScreen
          , SIMPLE: SimpleScreen
          , BRIDGE: BridgeScreen
        }

        , render: function() {
            var screenName = this.model.get('ship').get('screen');
            var showHeader = true;

            // set screen-specific options
            switch(screenName) {
              case 'TITLE':
                showHeader = false;
                break;
            }

            // render self
            $(this.el).html(this.template({
                showHeader: showHeader
                , ship: this.model.get('ship')
            }));

            // render screen
            if (this.screen) {
              this.screen.close();
            }
            if (this.screens[screenName]) {

              this.screen = new this.screens[screenName]({
                model: this.model
                , el: this.$("#screen")
              });

            }

            return this;
        }

    });
