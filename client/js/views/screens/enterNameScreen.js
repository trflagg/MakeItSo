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
         * render()
         *
         * draw the view
         * @return {html}
         */
        , render: function() {
            return $(this.el).html(this.template());
        }

        /**
         *  keyDown()
         *
         * keyDown handler for text input
         * @param  {event} event keydown event
         * @return {Boolean} if the event should bubble down to subclass
         */
        , keyDown: function(event) {
            if (Screen.prototype.keyDown(event)) {
                if(this.valid()) {
                    $("#nameInstructions").fadeIn(2000);
                }
                else {
                    $("#nameInstructions").fadeOut(2000);
                }
            }
        }

        /**
         * valid()
         *
         * return true if form is valid
         * @return {Boolean} form is valid
         */
        , valid: function() {
            var name = $("#nameInput").val();

            return name.length >= 3;
        }
    });

    return enterNameScreen;
});
