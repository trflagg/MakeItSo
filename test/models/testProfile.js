var should = require('should')
    , assert = require('assert')
    , helpers = require('../helpers');

describe('Profile object', function() {
    var profile
        , profile_id
        , db;

    before(function() {
        db = helpers.getCoDb();
        helpers.loadModels(db);
    });

    after(function*() {
        db.deleteAll('Profile');
        db.close();
    })

    it('should make a new object', function() {
        profile = db.create('Profile');
        assert.equal(profile.name, null);
        assert.equal(profile.handiness, "right");
        assert.equal(profile.sex, "male");
    });

    it('should modify name', function() {
        profile.name = 'Taylor';
        profile.name.should.equal('Taylor');
    });

    it('should modify handiness', function() {
        profile.handiness = 'right';
        profile.handiness.should.equal('right');
    });

    it('should modify sex', function() {
        profile.sex = 'female';
        profile.sex.should.equal('female');
    });

    it('should fail to save if name is too short', function*() {
        profile.name = 'yo';
        try {
            yield db.save('Profile', profile);
        } catch(e) {
            e.message.should.equal('name must be at least 3 characters.');
        }
    });

    it('should fail to save if name is not only letters', function*() {
        profile.name = 'yo.p';
        try {
            yield db.save('Profile', profile);
        } catch(e) {
            e.message.should.equal('name may only contain uppercase and lowercase letters.');
        }
    });

    it('should fail to save if handiness is not right or left', function*() {
        profile.name = 'Taylor';
        profile.handiness = 'something';
        try {
            yield db.save('Profile', profile);
        } catch(e) {
            e.message.should.equal('handiness must be either right or left.');
        }
    });

    it('should fail to save if sex is not male or female', function*() {
        profile.name = 'Taylor';
        profile.handiness = 'left';
        profile.sex = 'something';
        try {
            yield db.save('Profile', profile);
        } catch(err) {
            err.message.should.equal('sex must be either male or female.');
        }
    });

    it('should save to the db', function*() {
        profile.name = 'Taylor';
        profile.handiness = 'right';
        profile.sex = 'male';
        yield db.save('Profile', profile);
        profile_id = profile._id;
    });

    it('should load from the db', function*() {
        var loaded_profile = yield db.load('Profile', {_id: profile_id});
        loaded_profile.name.should.equal('Taylor');
        loaded_profile.handiness.should.equal('right');
        loaded_profile.sex.should.equal('male');
    });

    it('should only load from projection', function*() {
        var loaded_profile = yield db.load('Profile', {_id: profile_id}, {name: 1});
        loaded_profile.name.should.equal('Taylor');
        loaded_profile.should.not.have.property('handiness');
        loaded_profile.should.not.have.property('sex');
    });


});
