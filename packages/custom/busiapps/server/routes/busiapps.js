'use strict';

var busiapps = require('../controllers/busiapps');

// Busiapp authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.busiapp.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Busiapps, app, auth) {

  app.route('/busiapps')
    .get(busiapps.all)
    .post(auth.requiresLogin, busiapps.create);
  app.route('/busiapps/:busiappId')
    .get(auth.isMongoId, busiapps.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, busiapps.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, busiapps.destroy);

  // Finish with setting up the busiappId param
  app.param('busiappId', busiapps.busiapp);
};
