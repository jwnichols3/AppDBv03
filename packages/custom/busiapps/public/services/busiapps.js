'use strict';

//Busiapps service used for busiapps REST endpoint
angular.module('mean.busiapps').factory('Busiapps', ['$resource',
  function($resource) {
    return $resource('busiapps/:busiappId', {
      busiappId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
