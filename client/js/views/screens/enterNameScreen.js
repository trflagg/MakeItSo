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
            if (Screen.prototype.keyDown.call(this, event)) {
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

        , submit: function() {
            var name = $("#nameInput").val();

            $.ajax({
                url: '/profile'
                , type: 'PUT'
                , contentType: 'application/json'
                , data: JSON.stringify({
                    'name': name
                })
            });
        }
    });

    return enterNameScreen;
});
