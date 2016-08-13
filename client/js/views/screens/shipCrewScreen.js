/**
 * ShipNameScreen.js
 *
 * name your ship.
 */

var dot = require('dot')
, Screen = require('./screen')
    , template = require('../../../templates/screens/shipCrewScreen.dot')

    module.exports =  shipNameScreen = Screen.extend({
        events: {
            'keydown .crewInput': 'keyDown'
        }

        /**
         * init()
         *
         * initialize this mode
         * @return {None}
         */
        , initialize: function() {
            Screen.prototype.initialize.apply(this);
            this.template = dot.template(template);
            this.render();
        }

        /**
         * activate()
         *
         * called when screen is shown to user
         * @return {None}
         */
        , activate: function() {
            Screen.prototype.activate();

            // fires too soon
            // this.$(".crewInput")[0].focus();
        }

        /**
         * render()
         *
         * draw the view
         * @return {html}
         */
        , render: function() {
            var shipName = this.model.get('ship') ?
                                this.model.get('ship').get('shipName') :
                                ''
            $(this.el).html(this.template({
                name: this.model.get('profile').get('name')
            }));

            return this;
        }

        /**
         *  keyDown()
         *
         * keyDown handler for text input
         * @param  {event} event keydown event
         * @return {Boolean} if the event should bubble down to subclass
         */
        , keyDown: function(event) {

            if (event.keyCode === 13) {
                this.submit();
            }
        }

        /**
         * submit()
         *
         * submit data to server and deal with response
         * @return {None}
         */
        , submit: function() {
            var screen = this;

            var security = $("#security").val()
                , medical = $("#medical").val()
                , info = $("#info").val()
                , empat = $("#empat").val()
                , engineering = $("#engineering").val()
                , cultural = $("#cultural").val();

            this.reset();
            this.model.get('ship').get('crew').getChildById('security')
                                  .set('name', security);
            this.model.get('ship').get('crew').getChildById('medical')
                                  .set('name', medical);
            this.model.get('ship').get('crew').getChildById('info')
                                  .set('name', info);
            this.model.get('ship').get('crew').getChildById('empat')
                                  .set('name', empat);
            this.model.get('ship').get('crew').getChildById('engineering')
                                  .set('name', engineering);
            this.model.get('ship').get('crew').getChildById('cultural')
                                  .set('name', cultural);

            this.model.get('ship').save({
            }
            , {
                success: function(model, response, options) {
                    if (response.error) {
                        screen.showError(response.error);
                    } else {
                        screen.next();
                    }
                }
                , error: function(model, response, options) {
                    screen.showError(response.responseText)
                }
            });
        }

        /**
         * call before each submission to reset error message
         * @return {None}
         */
        , reset: function() {
            $("#nameError").html("");
        }

        /**
         * showError()
         *
         * display error on screen
         * @param  {String} message string to display
         * @return {None}
         */
        , showError: function(message) {
            this.$("#nameError").html(message);
        }
    });
