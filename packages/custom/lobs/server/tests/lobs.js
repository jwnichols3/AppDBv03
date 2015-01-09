/* jshint -W079 */ 
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
	mongoose = require('mongoose'),
  User = mongoose.model('User'),
  LOB = mongoose.model('LOB');

/**
 * Globals
 */
var user;
var lob;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model LOB:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        lob = new LOB({
          title: 'LOB Title',
          content: 'LOB Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return lob.save(function(err) {
          expect(err).to.be(null);
          expect(lob.title).to.equal('LOB Title');
          expect(lob.content).to.equal('LOB Content');
          expect(lob.user.length).to.not.equal(0);
          expect(lob.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        lob.title = '';

        return lob.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        lob.content = '';

        return lob.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        lob.user = {};

        return lob.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      lob.remove(function () {
        user.remove(done);
      });
    });
  });
});
