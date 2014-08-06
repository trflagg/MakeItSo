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
        assert.equal(profile._name, null);
        assert.equal(profile._handiness, null);
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
    }),

    it('should save to the db', function(done) {
        db.save('Profile', profile, function(err, saved_profile) {
            assert.equal(err, null);

            saved_profile.should.not.equal(null);
            id = saved_profile._id;

            done();
        })
    }),

    it('should load from the db', function(done) {
        db.load('Profile', {id: id}, function(err, loaded_profile) {
            assert.equal(err, null);

            loaded_profile.name.should.equal('Taylor')

            done();
        })
    })


});