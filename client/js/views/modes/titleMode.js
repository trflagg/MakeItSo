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
            var bufferTime = 0.40;
            var messageDelay = 1000;
            this.template = dot.template(template);


            // the buffered event listener starts the loop a _little_ bit
            // before it ends, trying to reduce the gap that happens with
            // html5 looping
            var audio_file = new Audio('sounds/titleScreen/ProducerBass.m4a')
            var titleMode = this;
            audio_file.addEventListener('timeupdate', function(){
                var buffer = bufferTime;
                if(this.currentTime > this.duration - buffer){
                    this.currentTime = 0
                    this.play()
                    setTimeout(titleMode.showContinueMessage.bind(titleMode), messageDelay);
                }
            }, false);
            var audioDiv = $("<div></div>");
            audioDiv.html(audio_file);
            var $body = $("body");
            $body.append(audioDiv);
            audio_file.play();
            setTimeout(titleMode.showContinueMessage.bind(titleMode), messageDelay);
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
                    // this.interval = setTimeout(function() {
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
                    // }.bind(this), 1);
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
