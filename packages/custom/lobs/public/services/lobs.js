'use strict';

//LOBs service used for lobs REST endpoint
angular.module('mean.lobs').factory('LOBs', ['$resource',
  function($resource) {
    return $resource('lobs/:lobId', {
      lobId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
