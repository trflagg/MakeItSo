/**
 * editOptionsMode.js
 *
 * Mode for the user to select options to set up his new ship.
 *
 */

var Mode = require('./mode')
, EnterNameScreen = require('../screens/enterNameScreen')
, AskHandinessScreen = require('../screens/askHandinessScreen')
, AskSexScreen = require('../screens/askSexScreen')
, ShipNameScreen = require('../screens/shipNameScreen')
, StartingLevelsScreen = require('../screens/startingLevelsScreen')
, ShipCrewScreen = require('../screens/shipCrewScreen')
, template = require('../../../templates/modes/editOptionsMode.dot')

module.exports = editOptionsMode = Mode.extend({

    events: {
        "focusin .highlightLabel": "highlightLabel"
        , "focusout .highlightLabel": "highlightLabel"
    }

    /**
        * init()
        *
        * initialize this mode
        * @return {None}
        */
    , init: function() {
        this.screens = [];
        this.template = template;
        this.endFunction = null;
    }

    , render: function() {
        $(this.el).html(this.template());

        return this;
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
        var windowWidth = $(window).width()
            , $prevScreen
            , $nextScreen;

        this.currentScreen++;
        if (this.currentScreen < this.screens.length) {
            $prevScreen = this.screens[this.currentScreen-1].$el;
            $nextScreen = this.screens[this.currentScreen].$el;
            $prevScreen.animate({
                left: -windowWidth
            }, 'slow', 'linear');
            $nextScreen.animate({
                left: 0
            }, 'slow', 'linear');

            $("#starBackground")
            .css('width', "+=" + (windowWidth * (2/9)))
            .animate({
                left: "-=" + (windowWidth * (2/9))
            }, 'slow', 'linear');
            $("#starMidfield")
            .css('width', "+=" + (windowWidth * (2/6)))
            .animate({
                left: "-=" + (windowWidth * (2/6))
            }, 'slow', 'linear');
            $("#starForward")
            .css('width', "+=" + (windowWidth * (2/3)))
            .animate({
                left: "-=" + (windowWidth * (2/3))
            }, 'slow', 'linear');

            this.displayScreen(this.screens[this.currentScreen]);
        }
        else {
            if (this.endFunction) {
                this.endFunction.call(this);
            }
        }
    }

    , setEndFunction: function(func) {
        this.endFunction = func;
    }

    , newProfile: function() {
        this.addScreen(EnterNameScreen);
        this.addScreen(AskSexScreen);
        this.addScreen(AskHandinessScreen);

        this.currentScreen = 0;

        this.setEndFunction(function() {
            this.model.set('mode', 'selectShip');
        });

        // start with the first one.
        this.displayScreen(this.screens[0]);
    }

    , newShip: function() {
        this.addScreen(ShipNameScreen);
        this.addScreen(StartingLevelsScreen);
        this.addScreen(ShipCrewScreen);

        this.currentScreen = 0;

        this.setEndFunction(function() {
            this.model.set('mode', 'startGame');
        });

        this.displayScreen(this.screens[0]);
    }

    /**
        * add highlightLabel to an input's classes and any item labeled
        * for the input's id will get 'hightlight' class added when input
        * is in focus.
        * @param  {jquery event} event
        * @return {None}
        */
    , highlightLabel: function(event) {
        // all elements with <label for="[id of focused item"]>
        this.$("label[for*='"+event.target.id+"']").toggleClass('highlight');
    }

});
