/**
 * enterNameScreen.js
 *
 * Enter your name.
 *
 */

define(['./screen'
        , 'doT!/templates/enterNameScreen'

], function(Screen
            , template
) {

    var enterNameScreen = Screen.extend({
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
            Screen.prototype.initialize();

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

            this.$("#nameInput").focus();
        }

        /**
         * render()
         *
         * draw the view
         * @return {html}
         */
        , render: function() {
            return $(this.el).html(this.template({
                name: this.model.get('name')
            }));
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

        , submit: function() {
            var name = $("#nameInput").val()
                , screen = this;
            this.model.save({
                'name': name
            }
            , {
                success: function(model, response, options) {
                    if (response.success === "true") {
                        screen.next();
                    } else {
                        $("#nameError").html(response.error);
                    }
                }
                , error: function(model, response, options) {
                    $("#nameError").html(response.responseText);
                }
            });
        }
    });

    return enterNameScreen;
});
