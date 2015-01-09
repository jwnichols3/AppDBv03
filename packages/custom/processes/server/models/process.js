'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Process Schema
 */
var ProcessSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
ProcessSchema.path('name').validate(function(name) {
  return !!name;
}, 'Name cannot be blank');

ProcessSchema.path('description').validate(function(description) {
  return !!description;
}, 'Description cannot be blank');

/**
 * Statics
 */
ProcessSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Process', ProcessSchema);
