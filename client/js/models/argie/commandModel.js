define([
    'backbone'
], function(Backbone) {

    var commandModel = Backbone.Model.extend({
        defaults: {
            text: ''
        }
        , initialize: function() {
            this.set("id", this.get("text"));
        }
    });

    commandModel.prototype.full_path = function() {
        var parent_path = "";

        // check that parent exists & isn't the ship
        if (this.get('parent') && !this.get('parent').has('shipName')) {
          parent_path = this.get('parent').full_path() + '.';
        }

        return parent_path + this.get("text");
    }
   return commandModel;
});
