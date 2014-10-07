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

          for(var i=0, ll=lines.length; i<ll; i++) {
            var currentLine = lines[i]
                , print = true;

            if (currentLine.length > 0) {
              // match against regEx's
              _.each(regExList, function(regEx) {
                if ((regExArray = regEx.regEx.exec(currentLine)) != null) {
                  // run the regEx
                  print = regEx.functionBody(regExArray);
                }
              });

              if (print) {
                $output.append($("<p></p>").addClass("outputText").append(currentLine));
              }
            }
          }

          $(this.el).html(this.template({}));
          this.$(".output").html($output);
        }
    });

    return screen;
});
