var should = require('should')
    , assert = require('assert')
    , helpers = require('./helpers');

describe('Profile object', function() {
    var profile
        , id
        , db;

    before(function() {
        db = helpers.getDb();
        require('../models/profile')(db);
    });

    it('should make a new object', function() {
        profile = db.create('Profile');
        assert.equal(profile.name, null);
        assert.equal(profile.handiness, null);
    }),

    it('should modify name', function() {
        profile.name = 'Taylor';
        profile.name.should.equal('Taylor');
    }),

    it('should modify handiness', function() {
        profile.handiness = 'right';
        profile.handiness.should.equal('right');
    }),

    it('should fail to save if name is too short', function(done) {
        profile.name = 'yo';
        db.save('Profile', profile, function(err, saved_profile) {
            err.message.should.equal('name must be at least 3 characters.');
            done();
        });
    });
    it('should fail to save if name is not only letters', function(done) {
        profile.name = 'yo.p';
        db.save('Profile', profile, function(err, saved_profile) {
            err.message.should.equal('name may only contain uppercase and lowercase letters.');
            done();
        });
    });

    it('should fail to save if handiness is not right or left', function(done) {
        profile.name = 'Taylor'
        profile.handiness = 'something';
        db.save('Profile', profile, function(err, saved_profile) {
            err.message.should.equal('handiness must be either right or left.');
            done();
        });
    });

    it('should save to the db', function(done) {
        profile.name = 'Taylor';
        profile.handiness = 'right';
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
            loaded_profile.name.should.equal('Taylor');
            loaded_profile.handiness.should.equal('right');
            done();
        })
    })


});
