
var app = require('../app')
    , request = require('superagent')
    , assert = require('assert')
    , should = require('should');

describe('Profile controller', function() {
    describe('PUT /profile', function() {
        var agent = request.agent();


        it('should fail if not given any data', function(done) {
            agent
            .put('http://localhost:3000/profile')
            .end(function(err, result) {
                result.status.should.equal(400);
                result.text.should.equal('data required.');
                done();
            });
        });

        it('should fail if not given a name', function(done) {
            agent
            .put('http://localhost:3000/profile')
            .send({something: 'wrong'})
            .end(function(err, result) {
                result.status.should.equal(400);
                result.text.should.equal("missing 'name'");
                done();
            });
        });

        it('should create a new profile if given a name', function(done) {
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

});
