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

    after(function() {
        db.close();
    })

    it('should make a new object', function() {
        profile = db.create('Profile');
        assert.equal(profile.name, null);
        assert.equal(profile.handiness, "right");
        assert.equal(profile.sex, "male");
    }),

    it('should modify name', function() {
        profile.name = 'Taylor';
        profile.name.should.equal('Taylor');
    }),

    it('should modify handiness', function() {
        profile.handiness = 'right';
        profile.handiness.should.equal('right');
    }),

    it('should modify sex', function() {
        profile.sex = 'female';
        profile.sex.should.equal('female');
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
        profile.name = 'Taylor';
        profile.handiness = 'something';
        db.save('Profile', profile, function(err, saved_profile) {
            err.message.should.equal('handiness must be either right or left.');
            done();
        });
    });

    it('should fail to save if sex is not male or female', function(done) {
        profile.name = 'Taylor';
        profile.handiness = 'left';
        profile.sex = 'something';
        db.save('Profile', profile, function(err, saved_profile) {
            err.message.should.equal('sex must be either male or female.');
            done();
        });
    });

    it('should save to the db', function(done) {
        profile.name = 'Taylor';
        profile.handiness = 'right';
        profile.sex = 'male';
        db.save('Profile', profile, function(err, saved_profile) {
            assert.equal(err, null);
            saved_profile.should.not.equal(null);
            id = profile._id;
            done();
        })
    }),

    it('should load from the db', function(done) {
        db.load('Profile', {_id: id}, function(err, loaded_profile) {
            assert.equal(err, null);
            loaded_profile.name.should.equal('Taylor');
            loaded_profile.handiness.should.equal('right');
            loaded_profile.sex.should.equal('male');
            done();
        })
    }),

    it('should only load from projection', function(done) {
        db.load('Profile', {_id: id}, {name: 1}, function(err, loaded_profile) {
            assert.equal(err, null);
            loaded_profile.name.should.equal('Taylor');
            loaded_profile.should.not.have.property('handiness');
            loaded_profile.should.not.have.property('sex');

            done();
        })
    })


});
