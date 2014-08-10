
var app = require('../app')
    , request = require('superagent')
    , assert = require('assert')
    , should = require('should');

describe('Index controller', function() {
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
        var agent = request.agent();
        var profileCookieString;

        it('creates a new profile the first time', function(done) {
            agent
            .get('http://localhost:3000/start')
            .end(function(err, result) {
                result.body.should.eql({
                    mode: 'newShip'
                });
                result.headers.should.have.property('set-cookie');
                result.headers['set-cookie'][0].should.startWith('profile=');
                profileCookieString = result.headers['set-cookie'][0];
                result.headers['set-cookie'][1].should.startWith('koa:sess=');
                done();
            });
        });

        it('sends to selectShip the second time', function(done) {
            agent
            .get('http://localhost:3000/start')
            // removes session cookie but keep profile id
            .set('Cookie', profileCookieString)
            .end(function(err, result) {
                result.body.should.eql({
                    mode: 'selectShip'
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
