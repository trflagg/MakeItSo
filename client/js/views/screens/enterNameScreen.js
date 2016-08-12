/**
 * enterNameScreen.js
 *
 * Enter your name.
 *
 */
var dot = require('dot')
, Screen = require('./screen')
    , template = require('../../../templates/screens/enterNameScreen.dot');

    module.exports = enterNameScreen = Screen.extend({
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
            else {
                if (this.model.get('profile').isValid()) {
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
            var name = $("#nameInput").val()
                , screen = this;

            this.reset();

            this.model.get('profile').save({
                'name': name
            }
            , {
                success: function(model, response, options) {
                    if (response.success === "true") {
                        screen.next();
                    } else {
                        screen.showError(response.error);
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
