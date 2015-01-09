/* jshint -W079 */ 
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
	mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Process = mongoose.model('Process');

/**
 * Gprocessals
 */
var user;
var process;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Process:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        process = new Process({
          title: 'Process Title',
          content: 'Process Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return process.save(function(err) {
          expect(err).to.be(null);
          expect(process.title).to.equal('Process Title');
          expect(process.content).to.equal('Process Content');
          expect(process.user.length).to.not.equal(0);
          expect(process.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        process.title = '';

        return process.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        process.content = '';

        return process.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        process.user = {};

        return process.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      process.remove(function () {
        user.remove(done);
      });
    });
  });
});
