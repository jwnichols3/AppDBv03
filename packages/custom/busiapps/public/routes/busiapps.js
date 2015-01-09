'use strict';

//Setting up route
angular.module('mean.busiapps').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('all busiapps', {
        url: '/busiapps',
        templateUrl: 'busiapps/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create busiapp', {
        url: '/busiapps/create',
        templateUrl: 'busiapps/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit busiapp', {
        url: '/busiapps/:busiappId/edit',
        templateUrl: 'busiapps/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('busiapp by id', {
        url: '/busiapps/:busiappId',
        templateUrl: 'busiapps/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
