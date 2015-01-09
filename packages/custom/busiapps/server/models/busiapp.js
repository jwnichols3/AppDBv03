'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Define a new 'BusiappSchema'
var BusiappSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  APP_ID: {
      type: String,
      default: '',
      trim: true
    },
  SERVICE_OR_APPLICATION_NAME: {
      type: String,
      default: '',
      trim: true,
      required: 'Application Name is required'
    },
  BUSINESS_CRITICALITY: {
      type: String,
      default: '',
      trim: true
    },
  STATUS: {
      type: String,
      default: '',
      trim: true
    },
  INFORMATION_CLASSIFICATION: {
      type: String,
      default: '',
      trim: true
    },
  COMPLIANCE_REQUIREMENTS: {
      type: String,
      default: '',
      trim: true
    },
  BIA_TIER: {
      type: String,
      default: '',
      trim: true
    },
  DESIGN_TIER: {
      type: String,
      default: '',
      trim: true
    },
  MANAGED_BY: {
      type: String,
      default: '',
      trim: true
    },
  IT_LEAD: {
      type: String,
      default: '',
      trim: true
    },
  ASSET_TYPE: {
      type: String,
      default: '',
      trim: true
    },
  IT_DIRECTOR: {
      type: String,
      default: '',
      trim: true
    },
  LINE_OF_BUSINESS: {
      type: String,
      default: '',
      trim: true
    },
  CLIENT_OWNER: {
      type: String,
      default: '',
      trim: true
    },
  CLIENT_RPO: {
      type: String,
      default: '',
      trim: true
    },
  CLIENT_RTO: {
      type: String,
      default: '',
      trim: true
    },
  NETWORK: {
      type: String,
      default: '',
      trim: true
    },
  IT_GROUP: {
      type: String,
      default: '',
      trim: true
    },
  PRIMARY_DC: {
      type: String,
      default: '',
      trim: true
    },
  SECONDARY_DC: {
      type: String,
      default: '',
      trim: true
    },
  PROCESS: {
      type: String,
      default: '',
      trim: true
    },
  ASSET_DESCRIPTION: {
      type: String,
      default: '',
      trim: true
    },
  IT_CORE_SERVICE: {
      type: String,
      default: '',
      trim: true
    },
  IT_SME: {
      type: String,
      default: '',
      trim: true
    },
  IT_SME_BU: {
      type: String,
      default: '',
      trim: true
    },
  ONBOARD_FLAG: {
      type: String,
      default: '',
      trim: true
    },
  SERVICE_OR_APPLICATION_ACRONYM: {
      type: String,
      default: '',
      trim: true
    },
  DISPLAY_NAME: {
      type: String,
      default: '',
      trim: true
    }
});

/**
 * Validations
 */
// BusiappSchema.path('SERVICE_OR_APPLICATION_NAME').validate(function(title) {
//   return !!SERVICE_OR_APPLICATION_NAME;
// }, 'Application Name cannot be blank');

// BusiappSchema.path('content').validate(function(content) {
//   return !!content;
// }, 'Content cannot be blank');

/**
 * Statics
 */
BusiappSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Busiapp', BusiappSchema);
