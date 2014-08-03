/**
 * appModel.js
 *
 * Model used by appView.
 * 
 */

define(['backbone'], function(Backbone) {

	var appModel = Backbone.Model.extend({

		// properties
		defaults: {
			mode: 'test'
		},

		/**
		 * initialize()
		 * 
		 * initialize the model
		 * @return {None} 
		 */
		initialize: function() {
			console.dir(this);
			console.log(this.get('mode'));
			console.log("Make It So!");
		}
	});

	return appModel;
})