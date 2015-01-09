'use strict';

angular.module('mean.lobs').controller('LOBsController', ['$scope', '$stateParams', '$location', 'Global', 'LOBs',
  function($scope, $stateParams, $location, Global, LOBs) {
    $scope.global = Global;

    $scope.hasAuthorization = function(lob) {
      if (!lob || !lob.user) return false;
      return $scope.global.isAdmin || lob.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var lob = new LOBs({
          name: this.name,
          description: this.description
        });
        lob.$save(function(response) {
          $location.path('lobs/' + response._id);
        });

        this.name = '';
        this.description = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(lob) {
      if (lob) {
        lob.$remove(function(response) {
          for (var i in $scope.lobs) {
            if ($scope.lobs[i] === lob) {
              $scope.lobs.splice(i, 1);
            }
          }
          $location.path('lobs');
        });
      } else {
        $scope.lob.$remove(function(response) {
          $location.path('lobs');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var lob = $scope.lob;
        if (!lob.updated) {
          lob.updated = [];
        }
        lob.updated.push(new Date().getTime());

        lob.$update(function() {
          $location.path('lobs/' + lob._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      LOBs.query(function(lobs) {
        $scope.lobs = lobs;
      });
    };

    $scope.findOne = function() {
      LOBs.get({
        lobId: $stateParams.lobId
      }, function(lob) {
        $scope.lob = lob;
      });
    };
  }
]);
