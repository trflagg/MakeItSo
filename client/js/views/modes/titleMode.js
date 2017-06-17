/**
 * titleMode.js
 *
 * Mode for the user to select his ship.
 *
 */

    var Mode = require('./mode')
    , blast = require('blast-text')
    , template = require('../../../templates/modes/titleMode.dot');

    module.exports = titleMode = Mode.extend({
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
            var bufferTime = 0.40;
            var messageDelay = 2000;
            this.template = template;

            titleMode = this;
            setInterval(titleMode.showContinueMessage.bind(titleMode), messageDelay);
        }

        , render: function() {
            $(this.el).html(this.template());
            // I want to use this.$('#continue...').blast() but blast installs
            // itself on the global $, which apparently is not the same one
            // installed on this.$
            this.continueChars = $("#continueMessage p")
                                    .blast({delimiter: "character"})
                                    .addClass('messageOut');
            return this;
        }

        , showContinueMessage: function() {
            var letterSpacingMS = 30;
            this.$("#continueMessage").show();
            for(var i=0, ll=this.continueChars.length; i<ll; i++) {
                // need intermediate function to avoid sharing 'i'
                (function(index) {
                    // every 4 secondsj
                    this.interval = setTimeout(function() {
                        // 20ms between each letter showing
                        setTimeout(function() {
                            $(this.continueChars[index]).addClass('messageIn');
                            $(this.continueChars[index]).removeClass('messageOut');
                        }.bind(this), index * letterSpacingMS);

                        // and wait 1700ms before hiding each letter
                        // (again with 20ms between each letter hiding)
                        setTimeout(function() {
                            $(this.continueChars[index]).removeClass('messageIn');
                            $(this.continueChars[index]).addClass('messageOut');
                        }.bind(this), (index * letterSpacingMS) + 500);
                    }.bind(this), 1);
                }).call(this, i);
            }
        }

        , keyPressed: function(k) {
           this.model.set('mode', 'newProfile');
        }
    });
