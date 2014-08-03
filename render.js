/**
 * render.js
 *
 * Returns co-views function.
 */

var views = require('co-views');

module.exports = views('views', {
    map: {
	    html: 'swig'
	}
});
