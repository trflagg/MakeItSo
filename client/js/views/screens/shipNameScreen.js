/**
 * ShipNameScreen.js
 *
 * name your ship.
 */
var dot = require('dot')
, Screen = require('./screen')
    , template = require('../../../templates/screens/ShipNameScreen.dot');

    module.exports = shipNameScreen = Screen.extend({
        events: {
            'keydown #nameInput': 'keyDown'
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

            this.$("#nameInput").focus();
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
                , shipName: shipName
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
            else {
                if (this.model.isValid()) {
                    $("#nameInstructions").fadeIn(2000);
                }
                else {
                    $("#nameInstructions").fadeOut(2000);
                }
            }
        }

        /**
         * submit()
         *
         * submit data to server and deal with response
         * @return {None}
         */
        , submit: function() {
            var shipName = $("#nameInput").val()
                , screen = this;

            this.reset();
            this.model.get('ship').save({
                'profile_id': screen.model.get('profile').get('id')
                , 'shipName': shipName
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
