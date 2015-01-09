'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Busiapp = mongoose.model('Busiapp'),
  _ = require('lodash');


/**
 * Find busiapp by id
 */
exports.busiapp = function(req, res, next, id) {
  Busiapp.load(id, function(err, busiapp) {
    if (err) return next(err);
    if (!busiapp) return next(new Error('Failed to load busiapp ' + id));
    req.busiapp = busiapp;
    next();
  });
};

/**
 * Create an busiapp
 */
exports.create = function(req, res) {
  var busiapp = new Busiapp(req.body);
  busiapp.user = req.user;

  busiapp.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the busiapp'
      });
    }
    res.json(busiapp);

  });
};

/**
 * Update an busiapp
 */
exports.update = function(req, res) {
  var busiapp = req.busiapp;

  busiapp = _.extend(busiapp, req.body);

  busiapp.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the busiapp'
      });
    }
    res.json(busiapp);

  });
};

/**
 * Delete an busiapp
 */
exports.destroy = function(req, res) {
  var busiapp = req.busiapp;

  busiapp.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the busiapp'
      });
    }
    res.json(busiapp);

  });
};

/**
 * Show an busiapp
 */
exports.show = function(req, res) {
  res.json(req.busiapp);
};

/**
 * List of Busiapps
 */
exports.all = function(req, res) {
  Busiapp.find().sort('-created').populate('user', 'name username').exec(function(err, busiapps) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the busiapps'
      });
    }
    res.json(busiapps);

  });
};
