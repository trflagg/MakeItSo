var should = require('should')
    , assert = require('assert')
    , Db = require('argieDB/db')
    , environment = require('argieDB/environment-local')
    , db = new Db(environment);

describe('Profile object', function() {
    var profile;
    var id;

    it('should make a new object', function() {

        var Profile = require('../models/profile')(db);

        profile = db.create('Profile');
    }),

    it('should modify name', function() {
        profile.name = 'Taylor';
        profile.name.should.equal('Taylor');
        profile._name.should.equal('Taylor');
    }),

    it('should modify handiness', function() {
        profile.handiness = 'right';
        profile.handiness.should.equal('right');
        profile._handiness.should.equal('right');
    })


});