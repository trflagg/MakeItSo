
define(['backbone'
		, '../models/appModel'

], function(Backbone
			, AppModel
) {
	
	var appView = Backbone.View.extend({

		/**
		 * initialize the view
		 */
		initialize: function() {
			this.model = new AppModel();
		}
	})

	return appView;
})