/**
* screen.js
*
* Superclass for different form items shown one screen at a time.
*
*/

var Backbone = require('backbone')
, _ = require('lodash')
, regExLines = require('../../regExLines')
, regExList = require('../../regExList')

module.exports = screen = Backbone.View.extend({

    initialize: function() {
        this.listenTo(this, 'output_done', this.outputDone);

        // set to false to stop printing lines
        // character by character
        this.revealLines = true;
    }

    , close: function()  {
        this.stopListening();
        if (this.onClose) {
            this.onClose();
        }
    }

    , outputLastResult: function() {
        // this.$("#commands").hide();
        var lastresult = this.model.get('ship').get('lastResult')
        , lines = ''
        , $outputdiv = $("div.output > div"); // grab the existing output

        this.trigger('output_begin');

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

        lines.filter(function(line) {
            return line.length > 0;
        }).forEach(function(line) {
            p = p.then(function($nextOutput) {

                var nextPromise =  gameScreen.funcForLine(line)($nextOutput);

                gameScreen.scrollToBottom($('.output'));

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

            // match against regExLines which may modify our output line
            _.each(regExLines, function(regEx) {
                regExResultsArray = regEx.regEx.exec(line);
                if (regExResultsArray != null) {
                    line = regEx.transformLine.call(this, line, regExResultsArray);
                }
            }, this);

            // print it!
            promiseResult = this.printLine(line, $output);

        }

        return promiseResult;
    }

    , printLine: function(line, $outputDiv) {
        return new Promise(_.bind(function(resolve, reject) {
            var charTime = 30;
            var breakCount = 20;

            $newDiv = $("<p></p>").addClass("outputText");
            $outputDiv.append($newDiv);

            if (this.revealLines) {
                // function to add a single character from the front of the line
                // to the $newDiv. If it's an html tag, add that all at once
                var gameScreen = this;
                addNextChar = function(currentLine, lineRemaining, charCount) {
                    // check for html tag
                    var tagArray = lineRemaining.split(/^(<.*?>)/);
                    if (tagArray.length > 1) {
                        currentLine += tagArray[1];
                        $newDiv.html(currentLine);
                        if (tagArray[2]) {
                            // html tags don't really count as a char for scrolling purposes, so don't bother incrementing
                            return addNextChar(currentLine, tagArray[2], charCount);
                        }
                        else {
                            return resolve($outputDiv);
                        }
                    }
                    else {
                        // grab first letter
                        currentLine += lineRemaining[0];
                        lineRemaining = lineRemaining.slice(1);
                        $newDiv.html(currentLine);
                    }

                    // scroll to bottom every breakCount characters
                    if (charCount % breakCount == 0) {
                        // HUGE TODO
                        // I'm really going to have to fix this when there are other outputs to be printing to
                        gameScreen.scrollToBottom($('.output'));
                    }

                    // do we keep going?
                    if (lineRemaining.length > 0) {
                        setTimeout(addNextChar, charTime, currentLine, lineRemaining, charCount + 1);
                    }
                    else {
                        resolve($outputDiv);
                    }
                }
                addNextChar("", line, 0);
            } else {
                $newDiv.html(line);
                resolve($outputDiv);
            }
        }, this));
    }

    , isScrolledToBottom: function(output) {
        return (output.prop('scrollHeight') - output.prop('clientHeight')) <= output.scrollTop() + 30;
    }

    , scrollToBottom: function(output) {
        output.scrollTop(output.prop('scrollHeight'));
    }


  , toggleDirectMessages: function() {
    if (!this.directMessagesVisible) {
      this.$("#directMessageScreen").addClass('animate').addClass('visible');
      this.directMessagesVisible = true;
    } else {
      this.$("#directMessageScreen").removeClass('visible');
      setTimeout(function() {this.$("#directMessageScreen").removeClass('animate')}, 1000);
      this.directMessagesVisible = false;
    }
  }
});
