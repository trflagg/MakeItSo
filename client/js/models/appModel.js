
define(['backbone'], function(Backbone) {

	var appModel = Backbone.Model.extend({

		// properties
		defaults: {
			mode: 'test'
		},

		/**
		 * initialize the model
		 */
		initialize: function() {
			console.dir(this);
			console.log(this.get('mode'));
			console.log("Make It So!");
		}
	});

	return appModel;
})