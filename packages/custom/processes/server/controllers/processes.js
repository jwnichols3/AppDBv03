'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Process = mongoose.model('Process'),
  _ = require('lodash');


/**
 * Find process by id
 */
exports.process = function(req, res, next, id) {
  Process.load(id, function(err, process) {
    if (err) return next(err);
    if (!process) return next(new Error('Failed to load process ' + id));
    req.process = process;
    next();
  });
};

/**
 * Create an process
 */
exports.create = function(req, res) {
  var process = new Process(req.body);
  process.user = req.user;

  process.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the process'
      });
    }
    res.json(process);

  });
};

/**
 * Update an process
 */
exports.update = function(req, res) {
  var process = req.process;

  process = _.extend(process, req.body);

  process.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the process'
      });
    }
    res.json(process);

  });
};

/**
 * Delete an process
 */
exports.destroy = function(req, res) {
  var process = req.process;

  process.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the process'
      });
    }
    res.json(process);

  });
};

/**
 * Show an process
 */
exports.show = function(req, res) {
  res.json(req.process);
};

/**
 * List of Processes
 */
exports.all = function(req, res) {
  Process.find().sort('-created').populate('user', 'name username').exec(function(err, processes) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the processes'
      });
    }
    res.json(processes);

  });
};
