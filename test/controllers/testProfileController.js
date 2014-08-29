var app = require('../../app')
    , request = require('superagent')
    , assert = require('assert')
    , should = require('should')
    , ObjectID = require('mongodb').ObjectID
    , helpers = require('../helpers');

describe('Profile controller', function() {
    var agent = request.agent()
        , profile_id
        , db;

    before(function() {
        db = helpers.getCoDb();
        helpers.loadModels(db);
    });

    after(function*() {
        yield db.removeById('Profile', profile_id);
        db.close();
    });

    describe('GET /profile/:id', function() {

        it('set session', function(done) {
            agent = request.agent();

            helpers.createSession(agent, function(err, result) {
                (err === null).should.be.true;
                profile_id = result.body.id;
                done();
            });
        });

        it('fails if :id doesnt match session', function(done) {
            agent
            .get('http://localhost:3000/profile/53e7979a5447fd82a8e3300b')
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(400);
                result.text.should.equal('session does not match param.');
                done();
            });
        });

        it('gets profile data', function(done) {
            agent
            .get('http://localhost:3000/profile/'+profile_id)
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.name.should.equal('test');
                result.body.handiness.should.equal('right');
                result.body.sex.should.equal('male');
                done();
            });
        })

    })
    describe('POST /profile/', function() {
        it('fails if no data', function(done) {
            var agent = request.agent();

            agent
            .post('http://localhost:3000/profile/')
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(400);
                result.text.should.equal("data required.");
                done();
            })
        });
        it('fails if no name', function(done) {
            var agent = request.agent();

            agent
            .post('http://localhost:3000/profile/')
            .send({something: 'wrong'})
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(400);
                result.text.should.equal("missing 'name'");
                done();
            })
        });

        it('saves profile and sets session', function*(done) {
            agent
            .post('http://localhost:3000/profile/')
            .send({name: 'test'})
            .end(function*(err, result) {
                (err === null).should.be.true;
                result.body.success.should.equal('true');
                result.body.should.have.property('id');
                result.headers.should.have.property('set-cookie');
                var profile_id = result.body.id;
                console.log('1');
                var foundProfile = yield db.load('Profile', {_id: new ObjectID(profile_id)});
                console.log('2');
                foundProfile.name.should.equal('test');
            });
        });
    })

    describe('PUT /profile/:id', function() {
        it('fails if no session', function(done) {
            var agent = request.agent();

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

            helpers.createSession(agent, function(err, result) {
                (err === null).should.be.true;
                profile_id = result.body.id;
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
            .put('http://localhost:3000/profile/'+profile_id)
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
            .put('http://localhost:3000/profile/'+profile_id)
            .type('form')
            .send({ name: 'Lew,' })
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.error.should.equal('name may only contain uppercase and lowercase letters.');
                done();
            });
        });

        it('successfully modifies name', function*(done) {
            agent
            .put('http://localhost:3000/profile/'+profile_id)
            .send({ name: 'Joe' })
            .end(function*(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.success.should.equal('true');

                var foundProfile = yield db.load('Profile', {_id: new ObjectID(profile_id)});
                foundProfile.name.should.equal('Joe');
            });
        });

        it('fails if handiness is not right or left', function(done) {
            agent
            .put('http://localhost:3000/profile/'+profile_id)
            .type('form')
            .send({ handiness: 'blah' })
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.error.should.equal('handiness must be either right or left.');
                done();
            });
        });

        it('successfully modifies handiness', function*() {
            agent
            .put('http://localhost:3000/profile/'+profile_id)
            .send({ handiness: 'left' })
            .end(function*(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.success.should.equal('true');

                var foundProfile = yield db.load('Profile', {_id: new ObjectID(profile_id)});
                foundProfile.handiness.should.equal('left');
            });
        });

        it('fails if sex is not male or female', function(done) {
            agent
            .put('http://localhost:3000/profile/'+profile_id)
            .type('form')
            .send({ sex: 'blah' })
            .end(function(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.error.should.equal('sex must be either male or female.');
                done();
            });
        });

        it('successfully modifies sex', function*() {
            agent
            .put('http://localhost:3000/profile/'+profile_id)
            .send({ sex: 'female' })
            .end(function*(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.success.should.equal('true');
                var foundProfile = yield db.load('Profile', {_id: new ObjectID(profile_id)});
                foundProfile.sex.should.equal('female');
            });
        });
        it('successfully modifies everything', function*() {
            agent
            .put('http://localhost:3000/profile/'+profile_id)
            .send({ name: 'Jerry', handiness: 'right', sex: 'male'})
            .end(function*(err, result) {
                (err === null).should.be.true;
                result.status.should.equal(200);
                result.body.success.should.equal('true');

                var foundProfile = yield db.load('Profile', {_id: new ObjectID(profile_id)})
                foundProfile.name.should.equal('Jerry');
                foundProfile.handiness.should.equal('right');
                foundProfile.sex.should.equal('male');
            });
        });
    });
});
