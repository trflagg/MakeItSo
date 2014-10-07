/**
 * screen.js
 *
 * Superclass for different form items shown one screen at a time.
 *
 */

define(['backbone'], function(Backbone) {

    var screen = Backbone.View.extend({

        initialize: function() {
          this.listenTo(this.model.get('ship'), 'change:lastResult', this.outputLastResult);
        }

        , outputLastResult: function() {
          var lastResult = this.model.get('ship').get('lastResult')
              , lines = lastResult.split('\n')
              , $output = $("<div></div>");

          for(var i=0, ll=lines.length; i<ll; i++) {
            if (lines[i].length > 0) {
              $output.append($("<p></p>").addClass("outputText").append(lines[i]));
            }
          }

          $(this.el).html(this.template({}));
          this.$(".output").html($output);
        }
    });

    return screen;
});
