/**
* screen.js
*
* Superclass for different form items shown one screen at a time.
*
*/

var Backbone = require('backbone')
, _ = require('underscore')
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
        var lastresult = this.model.get('ship').get('lastResult')
        , lines = ''
        // grab the existing output
        , $outputdiv = $("div.output > div");

        if (lastresult) {
            lines = lastresult.split('\n')
        }

        this.outputLines(lines, $outputdiv)
            .then(_.bind(function() {
                this.trigger('output_done');
            }, this));

        this.$(".output").html($outputdiv);
    }

    , outputDone: function() {
        // noop
    }

    // outputLines
    // Responsible for taking in an array of string and
    // outputting them to the $output.
    // Because lines may take a while to print each character
    // individually, and because of the wait command, it builds
    // a series of Promises which operate one after another.
    , outputLines: function(lines, $output) {
        var p = Promise.resolve($output)
        , gameScreen = this;

        lines.forEach(function(line) {
            p = p.then(function($nextOutput) {
                var scroll = false;
                if (gameScreen.isScrolledToBottom($('.output'))) {
                    scroll = true;
                }

                var nextPromise =  gameScreen.funcForLine(line)($nextOutput);

                if(scroll) {
                    gameScreen.scrollToBottom($('.output'));
                }
                return nextPromise;
            });
        }, this);

        return p;
    }

    // Returns a function that returns a promise for dealing
    // with the line provided. Necessary for handling the
    // promises in series and not evaluating them automatically.
    , funcForLine: function(line) {
        var gameScreen = this;

        return function($output){
            return gameScreen.promiseForLine(line, $output);
        }
    }

    // Returns a promise that will handle the line given
    // either by printing the line to the screen or
    // preforming an action in regExList.
    // Necessary because it takes a little bit to output
    // lines and there are waiters and such to add delays.
    , promiseForLine: function(line, $output) {

        var promiseResult = null
        , print = true;

        // first check if it is regExList
        _.each(regExList, function(regEx) {
            regExResultsArray = regEx.regEx.exec(line);
            if (regExResultsArray != null) {
                promiseResult = regEx.promiseForLine.call(this, line, $output, regExResultsArray);
                print = false;
            }
        }, this);

        // not a regEx, so make a promise to print it
        if (print) {
            promiseResult = new Promise(_.bind(function(resolve, reject) {
                // need to check if we're at the bottom before we print
                var atBottom = this.isScrolledToBottom($output);

                // match against regExLines which may modify our output line
                _.each(regExLines, function(regEx) {
                    regExResultsArray = regEx.regEx.exec(line);
                    if (regExResultsArray != null) {
                        line = regEx.transformLine.call(this, line, regExResultsArray);
                    }
                }, this);

                // print it!
                $newDiv = $("<p></p>").addClass("outputText");
                $newDiv.append(line);
                $output.append($newDiv);

                resolve($output);
            }, this));
        }

        return promiseResult;
    }

    , printLine: function(line, $outputDiv) {
        return new Promise(function(resolve, reject) {
            $newDiv = $("<p></p>").addClass("outputText");
            $newDiv.append(line);
            $outputDiv.append($newDiv);
            resolve($outputDiv);
        });
    }

    , isScrolledToBottom: function(output) {
        return (output.prop('scrollHeight') - output.prop('clientHeight')) <= output.scrollTop() + 1;
    }

    , scrollToBottom: function(output) {
        output.scrollTop(output.prop('scrollHeight'));
    }
});
