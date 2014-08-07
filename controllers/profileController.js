/**
 * profileController.js
 *
 * for accessing & modifying profile information
 */

var render = require('../render')
    , bodyParser = require('koa-body');

module.exports = function(app) {

    app.put('/profile', bodyParser(), addProfile);
    function *addProfile() {
        var json = this.request.body;

        console.dir(json);

        this.body = {
            success: 'true'
        }
    }
}

