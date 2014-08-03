/**
 * main.js
 *
 * The client-side entry point.
 *
 */

require.config({
	paths: {
		'jquery': '../bower-components/jquery/dist/jquery'
		, 'underscore': '../bower-components/underscore/underscore'
		, 'backbone': '../bower-components/backbone/backbone'
	}
});


require(['views/appView'], function(AppView) {

	var appView = new AppView();
})
