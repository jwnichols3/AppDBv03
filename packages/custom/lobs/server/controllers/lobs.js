'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  LOB = mongoose.model('LOB'),
  _ = require('lodash');


/**
 * Find lob by id
 */
exports.lob = function(req, res, next, id) {
  LOB.load(id, function(err, lob) {
    if (err) return next(err);
    if (!lob) return next(new Error('Failed to load lob ' + id));
    req.lob = lob;
    next();
  });
};

/**
 * Create an lob
 */
exports.create = function(req, res) {
  var lob = new LOB(req.body);
  lob.user = req.user;

  lob.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the lob'
      });
    }
    res.json(lob);

  });
};

/**
 * Update an lob
 */
exports.update = function(req, res) {
  var lob = req.lob;

  lob = _.extend(lob, req.body);

  lob.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the lob'
      });
    }
    res.json(lob);

  });
};

/**
 * Delete an lob
 */
exports.destroy = function(req, res) {
  var lob = req.lob;

  lob.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the lob'
      });
    }
    res.json(lob);

  });
};

/**
 * Show an lob
 */
exports.show = function(req, res) {
  res.json(req.lob);
};

/**
 * List of LOBs
 */
exports.all = function(req, res) {
  LOB.find().sort('-created').populate('user', 'name username').exec(function(err, lobs) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the lobs'
      });
    }
    res.json(lobs);

  });
};
