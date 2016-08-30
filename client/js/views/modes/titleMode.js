/**
 * titleMode.js
 *
 * Mode for the user to select his ship.
 *
 */

    var Mode = require('./mode')
    , _ = require('underscore')
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

            var music = this.model.get('music');
            music.set({source: 'sounds/titleScreen//ProducerBass.m4a'});
            music.set({update: _.bind(this.musicUpdate,this)});
            music.play();

            this.first = true
            titleMode = this;
            //setTimeout(titleMode.showContinueMessage.bind(titleMode), messageDelay);
        }

        , musicUpdate: function() {
            var messageDelay = 1000;
            setTimeout(this.showContinueMessage.bind(this), messageDelay);
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
            if (!this.first) {
                this.model.set('mode', 'newProfile');
            }
            this.first = false;
        }

        , onClose: function() {
            this.model.get('music').stop();
        }
    });
