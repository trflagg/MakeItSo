
var app = require('../app')
    , request = require('superagent')
    , assert = require('assert')
    , should = require('should')
    , ObjectID = require('mongodb').ObjectID
    , helpers = require('./helpers');

describe('Profile controller', function() {
    var agent = request.agent()
        , id
        , db;

    before(function() {
        db = helpers.getDb();
        require('../models/profile')(db);
    });

    describe('POST /profile/:id', function() {
        it('fails if no session', function(done) {
            var agent = request.agent();
            var id;

            agent
            .post('http://localhost:3000/profile/53e7979a5447fd82a8e3300b')
            .send({ name: 'Manny' })
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(400);
                result.text.should.equal('session not found.');
                done();
            });
        });

        it('set session', function(done) {
            agent = request.agent();

            agent
            .get('http://localhost:3000/start')
            .end(function(err, result) {
                id = result.body.id;
                done();
            });
        });

        it('fails if :id doesnt match session', function(done) {
            agent
            .post('http://localhost:3000/profile/53e7979a5447fd82a8e3300b')
            .type('form')
            .send({ name: 'Lenny' })
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(400);
                result.text.should.equal('session does not match param.');
                done();
            });
        });

        it('fails if name is too short', function(done) {
            agent
            .post('http://localhost:3000/profile/'+id)
            .type('form')
            .send({ name: 'Le' })
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.error.should.equal('name must be at least 3 characters.');
                done();
            });
        });

        it('fails if name is not only letters', function(done) {
            agent
            .post('http://localhost:3000/profile/'+id)
            .type('form')
            .send({ name: 'Lew,' })
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.error.should.equal('name may only contain uppercase and lowercase letters.');
                done();
            });
        });

        it('successfully modifies name', function(done) {
            agent
            .post('http://localhost:3000/profile/'+id)
            .send({ name: 'Joe' })
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.success.should.equal('true');

                db.load('Profile', {_id: new ObjectID(id)}, function(err, foundProfile) {
                    assert.equal(err, null);
                    foundProfile.name.should.equal('Joe');
                    done();
                });
            });
        });

    });
});
