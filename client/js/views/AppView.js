
define(['backbone'], function(Backbone) {

	var appView = Backbone.View.extend({
		initialize: function() {
			console.dir(this);
			console.log("Make It So!");
		}
	})

	return appView;
})