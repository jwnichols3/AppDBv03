'use strict';

//Setting up route
angular.module('mean.lobs').config(['$stateProvider',
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
      .state('all lobs', {
        url: '/lobs',
        templateUrl: 'lobs/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create lob', {
        url: '/lobs/create',
        templateUrl: 'lobs/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit lob', {
        url: '/lobs/:lobId/edit',
        templateUrl: 'lobs/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('lob by id', {
        url: '/lobs/:lobId',
        templateUrl: 'lobs/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
