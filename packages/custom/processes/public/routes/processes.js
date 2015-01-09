'use strict';

//Setting up route
angular.module('mean.processes').config(['$stateProvider',
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
      .state('all processes', {
        url: '/processes',
        templateUrl: 'processes/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create process', {
        url: '/processes/create',
        templateUrl: 'processes/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit process', {
        url: '/processes/:processId/edit',
        templateUrl: 'processes/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('process by id', {
        url: '/processes/:processId',
        templateUrl: 'processes/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
