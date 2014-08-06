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
        /**
         * init()
         *
         * initialize this mode
         * @return {None}
         */
        initialize: function() {
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
    });

    return enterNameScreen;
});
