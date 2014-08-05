
var app = require('../app')
    , request = require('supertest')
    , should = require('should');

describe('Index controller', function() {
    describe('GET /', function() {
        it('should respond with a success status', function(done) {
            request(app.listen())
            .get('/')
            .expect(200, done);
        });
    });
});