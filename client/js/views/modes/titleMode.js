/**
 * titleMode.js
 *
 * Mode for the user to select his ship.
 *
 */

define(['./mode'
        , 'doT!/templates/modes/titleMode'

], function(Mode
            , template
) {

    var titleMode = Mode.extend({
        events: {
            'click': 'keyPressed'
            , 'keyDown': 'keyPressed'
        }

        /**
         * init()
         *
         * initialize this mode
         * @return {None}
         */
        , init: function() {
            this.template = template;
            this.timeout = setTimeout(this.showContinueMessage, 5000);
        }

        , render: function() {
            $(this.el).html(this.template());

            return this;
        }

        , showContinueMessage: function() {
            this.$("#continueMessage").fadeIn('slow');
        }

        , keyPressed: function() {
            clearTimeout(this.timeout);
            this.model.set('mode', 'newProfile');
        }

    });

    return titleMode;
});
