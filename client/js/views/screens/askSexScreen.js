/**
 * askSexScreen.js
 *
 * Male or Female?
 *
 */

define(['./screen'
        , 'doT!/templates/askSexScreen'

], function(Screen
            , template
) {

    var askSexScreen = Screen.extend({
        events: {
            'click #male': function() { this.buttonClicked('male'); }
            , 'click #female': function() { this.buttonClicked('female'); }
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
            return $(this.el).html(this.template({
                name: this.model.get('name')
                , sex: this.model.get('sex')
            }));
        }

        , buttonClicked: function(sex) {
            this.submit(sex);
        }

        , submit: function(sex) {
            var screen = this;

            this.reset();

            this.model.save({
                'sex': sex
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
            $("#sexError").html("");
        }

        /**
         * showError()
         *
         * display error on screen
         * @param  {String} message string to display
         * @return {None}
         */
        , showError: function(message) {
            this.$("#sexError").html(message);
        }
    });

    return askSexScreen;
});
