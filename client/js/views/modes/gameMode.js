/**
 * gameMode.js
 *
 * Mode for the user to select his ship.
 *
 */


var dot = require('dot')
    , StateMachine = require('javascript-state-machine')
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
            this.fsm = this.createFSM();
            this.listenTo(this.model.get('ship'), 'change:screen', this.changeScreen);
            this.template = dot.template(template);
        }

        , createFSM: function() {
            // using fsm to hold state & use transition functions.
            // each screen is the name of the event to transition to that screen.
            // Right now, you can transition from any screen to any other.
            var SCREEN_LIST = [
                'none' // default starting state for javascript-state-machine
                , 'CRAWL'
                , 'TITLE'
                , 'SIMPLE'
                , 'BRIDGE'
            ];

            var fsm = StateMachine.create({
                events: [
                    {name: 'CRAWL', from: SCREEN_LIST, to: 'CRAWL'}
                    , {name: 'TITLE', from: SCREEN_LIST, to: 'TITLE'}
                    , {name: 'SIMPLE', from: SCREEN_LIST, to: 'SIMPLE'}
                    , {name: 'BRIDGE', from: SCREEN_LIST, to: 'BRIDGE'}
                ]
                , callbacks: {
                    onenterstate: function() {
                        //header on by default
                        this.showHeader();
                    }.bind(this)

                    , onleavestate: function() {
                        if (this.screen) {
                            this.screen.close()
                        }
                        this.screen = null;
                    }.bind(this)

                    , onenterCRAWL: function() {
                        this.hideHeader();
                        this.screen = new CrawlScreen({
                            model: this.model
                            , el: this.$("#screen")
                        });
                    }.bind(this)

                    , onenterTITLE: function() {
                        this.hideHeader();
                        this.screen = new TitleScreen({
                            model: this.model
                            , el: this.$("#screen")
                        });
                    }.bind(this)

                    , onenterSIMPLE: function() {
                        this.screen = new SimpleScreen({
                            model: this.model
                            , el: this.$("#screen")
                        });
                    }.bind(this)

                    , onenterBRIDGE: function() {
                        this.screen = new BridgeScreen({
                            model: this.model
                            , el: this.$("#screen")
                        });
                    }.bind(this)
                }
            });

            return fsm;
        }

        , render: function() {

            // render self
            $(this.el).html(this.template({
                ship: this.model.get('ship')
            }));

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

            this.changeScreen();
            return this;
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

        , changeScreen: function() {
            var screenName = this.model.get('ship').get('screen');

            this.fsm[screenName]();
        }

        , hideHeader: function() {
            this.$("#header").hide();
        }

        , showHeader: function() {
            this.$("#header").show();
        }

    });
