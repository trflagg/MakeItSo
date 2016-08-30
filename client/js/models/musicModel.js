
var Backbone = require('backbone');

module.exports = musicModel = Backbone.Model.extend({

    defaults: {
        source: ''
        , state: 'stopped'
        , update: this.update
    }

    , initialize: function() {
    }

    , play: function() {
        if (this.get('source') !== '') {
            this.set({state: 'playing'});
        }
    }

    , stop: function() {
        this.set({state: 'stopped'});
    }

    , update: function() {
        var updateFunc = this.get('update');
        if (updateFunc && typeof updateFunc === 'function') {
            updateFunc();
        }
    }
});
