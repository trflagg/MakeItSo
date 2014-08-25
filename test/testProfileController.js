
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

    after(function() {
        db.close();
    })

    describe('PUT /profile/:id', function() {
        it('fails if no session', function(done) {
            var agent = request.agent();
            var id;

            agent
            .put('http://localhost:3000/profile/53e7979a5447fd82a8e3300b')
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
            .put('http://localhost:3000/profile/53e7979a5447fd82a8e3300b')
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
            .put('http://localhost:3000/profile/'+id)
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
            .put('http://localhost:3000/profile/'+id)
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
            .put('http://localhost:3000/profile/'+id)
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

        it('fails if handiness is not right or left', function(done) {
            agent
            .put('http://localhost:3000/profile/'+id)
            .type('form')
            .send({ handiness: 'blah' })
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.error.should.equal('handiness must be either right or left.');
                done();
            });
        });

        it('successfully modifies handiness', function(done) {
            agent
            .put('http://localhost:3000/profile/'+id)
            .send({ handiness: 'left' })
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.success.should.equal('true');

                db.load('Profile', {_id: new ObjectID(id)}, function(err, foundProfile) {
                    assert.equal(err, null);
                    foundProfile.handiness.should.equal('left');
                    done();
                });
            });
        });

        it('fails if sex is not male or female', function(done) {
            agent
            .put('http://localhost:3000/profile/'+id)
            .type('form')
            .send({ sex: 'blah' })
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.error.should.equal('sex must be either male or female.');
                done();
            });
        });

        it('successfully modifies sex', function(done) {
            agent
            .put('http://localhost:3000/profile/'+id)
            .send({ sex: 'female' })
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.success.should.equal('true');

                db.load('Profile', {_id: new ObjectID(id)}, function(err, foundProfile) {
                    assert.equal(err, null);
                    foundProfile.sex.should.equal('female');
                    done();
                });
            });
        });
        it('successfully modifies everything', function(done) {
            agent
            .put('http://localhost:3000/profile/'+id)
            .send({ name: 'Jerry', handiness: 'right', sex: 'male'})
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.success.should.equal('true');

                db.load('Profile', {_id: new ObjectID(id)}, function(err, foundProfile) {
                    assert.equal(err, null);
                    foundProfile.name.should.equal('Jerry');
                    foundProfile.handiness.should.equal('right');
                    foundProfile.sex.should.equal('male');
                    done();
                });
            });
        });
    });
});
