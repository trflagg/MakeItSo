    var Backbone = require('backbone');

    module.exports =  commandModel = Backbone.Model.extend({
        defaults: {
            text: ''
        }
        , initialize: function() {
            if (this.get("id") === undefined) {
              this.set("id", this.get("text"));
            }
        }
    });

    commandModel.prototype.full_path = function() {
        var parent_path = "";

        // check that parent exists & isn't the ship
        if (this.parent && !this.parent.has('shipName')) {
          parent_path = this.parent.full_path() + '.';
        }

        return parent_path + this.get("id");
    }
