/**
 * screen.js
 *
 * Superclass for different form items shown one screen at a time.
 *
 */

define(['backbone', 'regExList'], function(Backbone, regExList) {

    var screen = Backbone.View.extend({

        initialize: function() {
          this.listenTo(this.model.get('ship'), 'change:lastResult', this.outputLastResult);
        }

        , outputLastResult: function() {
          var lastResult = this.model.get('ship').get('lastResult')
              , lines = lastResult.split('\n')
              , $output = $("<div></div>");

          this.outputLines(lines, $output);

          $(this.el).html(this.template({}));
          this.$(".output").html($output);
        }

        , outputLines: function(lines, $output) {
          while (lines && lines.length > 0) {
            // remove the first one
            var currentLine = lines.shift();
            lines = this.outputLine(currentLine, lines, $output);
          }
        }

        , outputLine: function(currentLine, lines, $output) {
          var print = true;
          var gameScreen = this;

          if (currentLine.length > 0) {
            // match against regEx's
            _.each(regExList, function(regEx) {
              if ((regExArray = regEx.regEx.exec(currentLine)) != null) {
                // run the regEx
                lines = regEx.functionBody.call(gameScreen, lines, $output, regExArray);
                print = false;
              }
            });

            if (print) {
              $output.append($("<p></p>").addClass("outputText").append(currentLine));
            }
          }

          return lines;
        }
    });

    return screen;
});
