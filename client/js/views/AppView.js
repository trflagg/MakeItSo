/**
 * appView.js
 *
 * View that runs the application level.
 * Responsible for switching between modes.
 *
 */

define(['backbone'
		, '../models/appModel'

], function(Backbone
			, AppModel
) {

	var appView = Backbone.View.extend({

		/**
		 * initialize()
		 *
		 * initialize the view
		 * @return {None}
		 */
		initialize: function() {
			this.model = new AppModel();
		}
	})

	return appView;
})
