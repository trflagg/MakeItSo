/**
 * titleMode.js
 *
 * Mode for the user to select his ship.
 *
 */

define(['./mode'
        , 'doT!/templates/modes/titleMode'
        , 'blast'

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
            this.timeout = setTimeout(this.showContinueMessage.bind(this), 1000);
        }

        , render: function() {
            $(this.el).html(this.template());
            this.continueChars = this.$("#continueMessage p")
                                    .blast({delimiter: "character"})
                                    .hide()

            return this;
        }

        , showContinueMessage: function() {
            this.$("#continueMessage").show();
            for(var i=0, ll=this.continueChars.length; i<ll; i++) {
                // need intermediate function to avoid sharing 'i'
                (function(index) {
                    setTimeout(function() {
                        $(this.continueChars[index]).show();
                    }.bind(this), index * 20);
                }).call(this, i);
            }
        }

        , keyPressed: function() {
            clearTimeout(this.timeout);
            this.model.set('mode', 'newProfile');
        }

    });

    return titleMode;
});
