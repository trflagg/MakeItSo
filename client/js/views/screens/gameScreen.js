/**
* screen.js
*
* Superclass for different form items shown one screen at a time.
*
*/

var Backbone = require('backbone')
, _ = require('underscore')
, Promise = require('promise')
, regExLines = require('../../regExLines')
, regExList = require('../../regExList')

module.exports = screen = Backbone.View.extend({

    initialize: function() {
        this.listenTo(this.model.get('ship'), 'change:lastResult', this.outputLastResult);
        this.listenTo(this, 'output_done', this.outputDone);
    }

    , close: function()  {
        this.stopListening();
        if (this.onClose) {
            this.onClose();
        }
    }

    , outputLastResult: function() {
        this.$("#commands").hide();
        var lastresult = this.model.get('ship').get('lastresult')
        , lines = ''
        // grab the existing output
        , $outputdiv = $("div.output > div");

        if (lastresult) {
            lines = lastresult.split('\n')
        }

        this.waiters = 0;

        this.outputlines(lines, $outputdiv);

        this.$(".output").html($outputdiv);
    }

    , outputDone: function() {
        // noop
    }

    , outputLines: function(lines, $output) {
        while (lines && lines.length > 0) {
            // remove the first one
            var currentLine = lines.shift();
            lines = this.outputLine(currentLine, lines, $output);
        }
        if (this.waiters === 0) {
            this.trigger('output_done');
        }
    }

    , outputLine: function(currentLine, lines, $outputDiv) {
        var print = true;
        var gameScreen = this;

        if (currentLine.length > 0) {
            // match against regEx's
            _.each(regExList, function(regEx) {
                if ((regExArray = regEx.regEx.exec(currentLine)) != null) {
                    // run the regEx
                    lines = regEx.functionBody.call(gameScreen, lines, $outputDiv, regExArray);
                    print = false;
                }
            });

            if (print) {
                // checked if scrolled to bottom before we print line
                var $output = this.$('div.output');
                var isScrolledToBottom = $output.prop('scrollHeight') - $output.prop('clientHeight') <= $output.scrollTop() + 1;

                // match against lineStartRegExs
                _.each(regExLines, function(regEx) {
                    if ((regExArray = regEx.regEx.exec(currentLine)) != null) {
                        currentLine = regEx.functionBody(currentLine, regExArray);
                    }
                });

                var printPromise = this.printLine(currentLine, $outputDiv);
                printPromise.then(_.bind(function() {
                    this.scrollToBottom($output);
                }, this));
            }
        }

        return lines;
    }

    , scrollToBottom: function($output) {
        $output.scrollTop($output.prop('scrollHeight'));
    }

    , printLine: function(line, $outputDiv) {
        return new Promise(function(resolve, reject) {
            $newDiv = $("<p></p>").addClass("outputText");
            $newDiv.append(line);
            $outputDiv.append($newDiv);
            resolve($outputDiv);
        });
    }
});
