/**
 * titleMode.js
 *
 * Mode for the user to select his ship.
 *
 */

    var Mode = require('./mode')
    , blast = require('blast-text')
    , dot = require('dot')
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
            this.template = dot.template(template);
            // this.timeout = setTimeout(this.showContinueMessage.bind(this), 1);
            this.first = true;
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
            this.$("#continueMessage").show();
            for(var i=0, ll=this.continueChars.length; i<ll; i++) {
                // need intermediate function to avoid sharing 'i'
                (function(index) {
                    // every 4 secondsj
                    this.interval = setInterval(function() {
                        // 20ms between each letter showing
                        setTimeout(function() {
                            $(this.continueChars[index]).addClass('messageIn');
                            $(this.continueChars[index]).removeClass('messageOut');
                        }.bind(this), index * 20);

                        // and wait 1700ms before hiding each letter
                        // (again with 20ms between each letter hiding)
                        setTimeout(function() {
                            $(this.continueChars[index]).removeClass('messageIn');
                            $(this.continueChars[index]).addClass('messageOut');
                        }.bind(this), (index * 20) + 1700);
                    }.bind(this), 4000);
                }).call(this, i);
            }
        }

        , keyPressed: function(k) {
            //clearTimeout(this.timeout);
            //this.model.set('mode', 'newProfile');
            console.log(this.first);
            if (this.first) {
                this.showContinueMessage.bind(this)();
            }
            this.first = false;
        }

    });
