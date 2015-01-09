'use strict';

var processes = require('../controllers/processes');

// Process authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.process.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Processes, app, auth) {

  app.route('/processes')
    .get(processes.all)
    .post(auth.requiresLogin, processes.create);
    
  app.route('/processes/:processId')
    .get(auth.isMongoId, processes.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, processes.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, processes.destroy);

  // Finish with setting up the processId param
  app.param('processId', processes.process);
};
