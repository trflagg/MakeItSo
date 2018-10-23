
var Backbone = require('backbone')
, _ = require('lodash')
, GameScreen = require('./gameScreen')
, template = require('../../../templates/screens/directMessageScreen.dot')

module.exports = directMessageScreen = GameScreen.extend({

    events: {
        'click .directMessageLink': 'showMessage'
        // probably should have separate logic instead of rerendering, but not dealing with it right now
        , 'click #directMessagesBackButton': 'render'
    }

    , initialize: function() {
        GameScreen.prototype.initialize.apply(this);
        this.template = template;
        this.render();
    }

    , render: function() {
        $(this.el).html(this.template({
            messages: this.model.get('ship').get('directMessages').get('children').toJSON()
        }));

        this.tableDisplayed = true;
        this.$("#directMessagesOutput").hide();
    }

    , showMessage: function(event) {
        var messageText = event.target.text;
        this.model.get('ship').runCommand('direct_messages.' + messageText);
    }

    , toggleTable: function() {
        if (this.tableDisplayed) {
            this.tableDisplayed = false;
            this.$("#directMessagesTable").hide();
            this.$("#directMessagesOutput").show();
        } else {
            this.tableDisplayed = true;
            this.$("#directMessagesOutput").hide();
            this.$("#directMessagesTable").show();
        }
    }

    , outputLastResult: function() {
        var lastresult = this.model.get('ship').get('lastResult');
        var $outputDiv = this.$("#directMessagesOutput > .output");
        var lines = [];

        if (lastresult) {
            lines = lastresult.split('\n');

            // for now, append line by line
            // but left open for more functionality
            _.each(lines, function(line) {
                var $newText = $("<p></p>").addClass("outputText").html(line);
                $outputDiv.append($newText);
            });
        }

        this.toggleTable();
    }

});
