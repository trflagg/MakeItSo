var Backbone = require('backbone')
    , MusicModel = require('../models/musicModel');

module.exports =  musicView = Backbone.View.extend({

    initialize: function(options) {
        this.model = options.model.get('music');

        if (options && options.source) {
            this.model.set({source: options.source});
        }

        this.listenTo(this.model, 'change:source', this.updateSource);
        this.listenTo(this.model, 'change:state', this.changeState);
        this.render();
    }

    , render: function() {
        // the buffered event listener starts the loop a _little_ bit
        // before it ends, trying to reduce the gap that happens with
        // html5 looping
        var audio_file = new Audio(this.model.get('source'));
        var musicView = this;
        var bufferTime = 0.40;
        audio_file.addEventListener('timeupdate', function(){
            var buffer = bufferTime;
            if(this.currentTime > this.duration - buffer){
                this.currentTime = 0
                this.play()
                musicView.model.update();
            }
        }, false);
        var audioDiv = $("<div></div>");
        audioDiv.html(audio_file);
        var $body = $("body");
        $body.append(audioDiv);
        this.audio_file = audio_file;
    }

    , updateSource: function() {
        this.audio_file.src = this.model.get('source');
    }

    , changeState: function() {
        var state = this.model.get('state');

        if (state === 'playing') {
            this.audio_file.play();
        }
        else if (state === 'stopped') {
            this.audio_file.src = '';
        }
    }

});
