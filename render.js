/**
 * render.js
 *
 * Returns co-views function.
 */

var views = require('views');

module.exports = views('views', {
    map: {
        html: 'swig'
    }
    , cache: 'memory'
});
