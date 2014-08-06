var should = require('should')
    , Db = require('argieDB/db')
    , environment = require('argieDB/environment-local')
    , db = new Db(environment);

describe('Profile object', function() {
    it('should make a new object', function() {

        var Profile = require('../models/profile')(db);

        var profile = db.create('Profile');

        profile.name = 'Taylor';
        profile.name.should.equal('Taylor');
        profile._name.should.equal('Taylor');
    })
});