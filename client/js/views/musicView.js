var Backbone = require('backbone')
    , MusicModel = require('../models/musicModel');

module.exports =  musicView = Backbone.View.extend({

    initialize: function() {
        this.sourceChanged = false;

        this.listenTo(this.model, 'change:source', this.updateSource);
        this.listenTo(this.model, 'change:state', this.changeState);
        this.render();
    }

    , render: function() {
        var audio = new Audio('');
        var audioDiv = $("<div></div>");
        var $body = $("body");
        var source = document.createElement('source');
        var musicView = this;

        audio.addEventListener('timeupdate',
                                function() {musicView.updateLoop(this, musicView)},
                                false);
        this.audio = audio;
        source.src = '';
        this.source = source;
        audio.appendChild(source);
        audioDiv.html(audio);
        $body.append(audioDiv);
    }

    // the buffered event listener starts the loop a _little_ bit
    // before it ends, trying to reduce the gap that happens with
    // html5 looping
    , updateLoop: function(audio, musicView) {
        var bufferTime = 0.40;

        if(audio.currentTime > audio.duration - bufferTime){
            // change sources only on loop replay
            if (this.sourceChanged) {
                //this.audio.src = this.model.get('source');
            }
            audio.currentTime = 0
            audio.play()
            musicView.model.update();
        }
    }

    , updateSource: function() {
        // if we're going from nothing, change immediately
        // otherwise, we only want to chane on loop replay
        if (this.source.getAttribute('src') === '') {
            this.source.setAttribute('src', this.model.get('source'));
            this.audio.load();
        } else {
            this.sourceChanged = true;
        }
    }

    , changeState: function() {
        var state = this.model.get('state');

        if (state === 'playing' && this.audio.src !== '') {
            this.audio.play();
        }
        else if (state === 'stopped') {
            this.audio.src = '';
        }
    }

});
