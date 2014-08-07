
var app = require('../app')
    , request = require('superagent')
    , assert = require('assert')
    , should = require('should');

describe('Profile controller', function() {
    it('PUT /profile', function(done) {
        var agent = request.agent();

        agent
        .put('http://localhost:3000/profile')
        .send({ name: 'Manny' })
        .end(function(err, result) {

            (err === null).should.be.true;
            result.status.should.equal(200);
            result.body.success.should.equal('true');
            result.body.should.have.property('id');
            result.headers.should.have.property('set-cookie');
            result.headers['set-cookie'][0].should.startWith('id=');

            done();
        });
    });

});