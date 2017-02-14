var Backbone = require('backbone');

module.exports = musicView = Backbone.View.extend({

    initialize: function(options) {
        this.source = "";
        if (options && options.source) {
            this.source = options.source;
        }

        this.render();
    }

    , render: function() {
        // the buffered event listener starts the loop a _little_ bit
        // before it ends, trying to reduce the gap that happens with
        // html5 looping
        var audio_file = new Audio(this.source);
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
        this.audio_file = audio_file;
    }

    , play: function() {
        this.audio_file.play();
    }

    , stop: function() {
        this.audio_file.stop();
    }
});
