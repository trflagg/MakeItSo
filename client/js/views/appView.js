/**
 * appView.js
 *
 * View that runs the application level.
 * Responsible for switching between modes.
 *
 */

var Backbone = require('backbone')
, StateMachine = require('javascript-state-machine')
, $ = require('jquery')
, MusicView = require('./musicView')
, AppModel = require('../models/appModel')
, ShipModel = require('../models/shipModel')
, EditOptionsMode = require('../views/modes/editOptionsMode')
, SelectShipMode = require('../views/modes/selectShipMode')
, GameMode = require('../views/modes/gameMode')
, TitleMode = require('../views/modes/titleMode')

module.exports =  appView = Backbone.View.extend({

    /**
        * initialize()
        *
        * initialize the view
        * @return {None}
        */
    initialize: function() {
        this.model = new AppModel();
        this.listenTo(this.model, 'change:mode', this.updateMode);

        this.fsm = this.createFSM();

        this.musicView = new MusicView({model: this.model});

        // start the app
        this.start();
    }

    /**
        * start()
        *
        * start the application
        * @return {None}
        */
    , start: function() {

        // start the app by having the model get the starting mode
        this.model.setStartMode();
    }

    /**
        * updateMode()
        *
        * fired when the mode changes
        * @return {None}
        */
    , updateMode: function() {
        // use the mode name as state-change function
        this.fsm[this.model.get('mode')](this.model);
    }

    , createFSM: function() {
        var appModel = this.model
            , appView = this;
        var fsm = StateMachine.create({
            events: [
                { name: 'title', from: 'none', to: 'title' }
                , { name: 'newProfile', from: 'title', to: 'newProfile' }
                , { name: 'selectShip', from: ['none', 'newProfile'], to: 'selectShip'}
                , { name: 'newShip', from: 'selectShip', to: 'newShip' }
                , { name: 'startGame', from: ['selectShip', 'newShip'], to: 'startGame'}
            ]
            , callbacks: {
                onentertitle: function(event, from, to) {
                    appView.setMode(new TitleMode({
                            el: $("<div></div>")
                            , model: appModel
                    }));
                    appView.mode.render();
                    return StateMachine.ASYNC;
                }
                , onenternewProfile: function(event, from, to) {
                    // fade out old mode.
                    $('#contents').fadeOut('slow', function() {
                        appView.setMode(new EditOptionsMode({
                            el: $("<div></div>")
                            , model: appModel
                        }));

                        appView.mode.newProfile();

                        $("#contents").fadeIn('slow');
                    });
                    return StateMachine.ASYNC;
                }
                , onenternewShip: function(event, from, to) {
                    $("#contents").fadeOut('slow', function() {

                        appModel.set('ship', new ShipModel());

                        appView.setMode(new EditOptionsMode({
                            el: $("<div></div>")
                            , model: appModel
                        }));

                        appView.mode.newShip();

                        $("#contents").fadeIn('slow');
                    });
                    return StateMachine.ASYNC;
                }
                , onenterselectShip: function(event, from, to) {
                    appModel.loadProfile();
                    appModel.getShipList();

                    $("#contents").fadeOut('slow', function() {
                        appView.setMode(new SelectShipMode({
                            el: $("<div></div>")
                            , model: appModel
                        }));

                        appView.mode.render();

                        $("#contents").fadeIn('slow');
                    });
                    return StateMachine.ASYNC;
                }
                , onenterstartGame: function(event, from, to, model) {
                    // fetch ship from server
                    appModel.get('ship').fetch();

                    $("#contents").fadeOut('slow', function() {
                        appView.setMode(new GameMode({
                            el: $("<div></div>")
                            , model: appModel
                        }));

                        appView.mode.render();

                        $("#contents").fadeIn('slow');
                    });

                    return StateMachine.ASYNC;
                }
                , onbeforeevent: function(event, from, to) {
                }
            }
        });

        return fsm;
    }

    , setMode: function(newMode) {
        if (this.mode) {
            this.mode.close();
        }
        else {
            $("#contents").empty();
        }

        this.mode = newMode;
        $("#contents").append(newMode.$el);
    }

})
