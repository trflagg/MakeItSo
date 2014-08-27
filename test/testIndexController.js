
var app = require('../app')
    , request = require('superagent')
    , assert = require('assert')
    , should = require('should')
    , helpers = require('./helpers');

describe('Index controller', function() {

    before(function() {
        db = helpers.getCoDb();
        helpers.loadModels(db);
    });

    after(function() {
        db.deleteAll('Profile');
        db.close();
    });

    describe('GET /', function() {
        var agent = request.agent();

        it('responds with a success status and html', function(done) {
            agent
            .get('http://localhost:3000/')
            .end(function(err, result) {
                result.status.should.equal(200);
                result.text.should.startWith('<!doctype html>');

                done();
            });
        });
    });

    describe('GET /start', function() {
        var agent = request.agent()
            , id;

        it('responds with mode:newProfile if no cookie', function(done) {
            agent
            .get('http://localhost:3000/start')
            .end(function(err, result) {
                result.body.should.eql({
                    mode: 'newProfile'
                });
                result.headers.should.not.have.property('set-cookie');
                done();
            });
        });

        it('creates session', function*() {
            result = yield helpers.coCreateSession(agent);

            result.headers.should.have.property('set-cookie');
            result.headers['set-cookie'][0].should.startWith('profile=');
            profileCookieString = result.headers['set-cookie'][0];
            result.headers['set-cookie'][1].should.startWith('koa:sess=');
        });

        it('sends to selectShip the second time', function(done) {
            agent
            .get('http://localhost:3000/start')
            // removes session cookie but keep profile id
            .set('Cookie', profileCookieString)
            .end(function(err, result) {
                result.body.should.eql({
                    mode: 'selectShip'
                    , id: result.body.id
                });
                result.headers.should.have.property('set-cookie');
                result.headers['set-cookie'][0].should.startWith('koa:sess=');
                done();
            })
        });

        it('fails if profile in cookie doesnt match', function(done) {
            // modify cookie so that it doesn't match anything
            var cookieThatHopefullyNeverMatches =
            "profile=53e7979a5447fd82a8e3300b; path=/; httponly";
            agent
            .get('http://localhost:3000/start')
            .set('Cookie', cookieThatHopefullyNeverMatches)
            .end(function(err, result) {
                result.body.error.should.equal('Cookie profile_id not found in db.');
                done();
            })
        })
    });
});
