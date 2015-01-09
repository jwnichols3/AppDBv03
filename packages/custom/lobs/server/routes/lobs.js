'use strict';

var lobs = require('../controllers/lobs');

// LOB authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.lob.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(LOBs, app, auth) {

  app.route('/lobs')
    .get(lobs.all)
    .post(auth.requiresLogin, lobs.create);
    
  app.route('/lobs/:lobId')
    .get(auth.isMongoId, lobs.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, lobs.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, lobs.destroy);

  // Finish with setting up the lobId param
  app.param('lobId', lobs.lob);
};
