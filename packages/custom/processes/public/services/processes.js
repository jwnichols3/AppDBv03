'use strict';

//Processes service used for processes REST endpoint
angular.module('mean.processes').factory('Processes', ['$resource',
  function($resource) {
    return $resource('processes/:processId', {
      processId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
