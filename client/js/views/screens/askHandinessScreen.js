/**
 * askHandinessScreen.js
 *
 * Right handed or left handed?
 *
 */
    var Screen = require('./screen')
    , template = require('../../../templates/screens/askHandinessScreen.dot');

    module.exports = askHandinessScreen = Screen.extend({
        events: {
            'click #rightHand': function() { this.buttonClicked('right'); }
            , 'click #leftHand': function() { this.buttonClicked('left'); }
        }

        /**
         * init()
         *
         * initialize this mode
         * @return {None}
         */
        , initialize: function() {
            Screen.prototype.initialize.apply(this);

            this.template = template;
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
            this.render();
        }

        /**
         * render()
         *
         * draw the screen
         * @return {html}
         */
        , render: function() {
            $(this.el).html(this.template({
                name: this.model.get('profile').get('name')
                , handiness: this.model.get('profile').get('handiness')
            }));

            return this;
        }

        , buttonClicked: function(handiness) {
            this.submit(handiness);
        }

        , submit: function(handiness) {
            var screen = this;

            this.reset();

            this.model.get('profile').save({
                'handiness': handiness
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
            $("#handinessError").html("");
        }

        /**
         * showError()
         *
         * display error on screen
         * @param  {String} message string to display
         * @return {None}
         */
        , showError: function(message) {
            this.$("#handinessError").html(message);
        }
    });
