/* jshint -W079 */ 
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
	mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Busiapp = mongoose.model('Busiapp');

/**
 * Globals
 */
var user;
var busiapp;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Busiapp:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        busiapp = new Busiapp({
          SERVICE_OR_APPLICATION_NAME: 'Busiapp Application Name',
          APP_ID: 'Busiapp APP_ID',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return busiapp.save(function(err) {
          expect(err).to.be(null);
          expect(busiapp.SERVICE_OR_APPLICATION_NAME).to.equal('Busiapp Title');
          expect(busiapp.APP_ID).to.equal('Busiapp APP_ID');
          expect(busiapp.user.length).to.not.equal(0);
          expect(busiapp.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without SERVICE_OR_APPLICATION_NAME', function(done) {
        busiapp.SERVICE_OR_APPLICATION_NAME = '';

        return busiapp.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without APP_ID', function(done) {
        busiapp.APP_ID = '';

        return busiapp.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        busiapp.user = {};

        return busiapp.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      busiapp.remove(function () {
        user.remove(done);
      });
    });
  });
});
