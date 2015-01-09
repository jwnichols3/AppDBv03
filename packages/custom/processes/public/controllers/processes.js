'use strict';

angular.module('mean.processes').controller('ProcessesController', ['$scope', '$stateParams', '$location', 'Global', 'Processes',
  function($scope, $stateParams, $location, Global, Processes) {
    $scope.global = Global;

    $scope.hasAuthorization = function(process) {
      if (!process || !process.user) return false;
      return $scope.global.isAdmin || process.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var process = new Processes({
          name: this.name,
          description: this.description
        });
        process.$save(function(response) {
          $location.path('processes/' + response._id);
        });

        this.name = '';
        this.description = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(process) {
      if (process) {
        process.$remove(function(response) {
          for (var i in $scope.processes) {
            if ($scope.processes[i] === process) {
              $scope.processes.splice(i, 1);
            }
          }
          $location.path('processes');
        });
      } else {
        $scope.process.$remove(function(response) {
          $location.path('processes');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var process = $scope.process;
        if (!process.updated) {
          process.updated = [];
        }
        process.updated.push(new Date().getTime());

        process.$update(function() {
          $location.path('processes/' + process._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Processes.query(function(processes) {
        $scope.processes = processes;
      });
    };

    $scope.findOne = function() {
      Processes.get({
        processId: $stateParams.processId
      }, function(process) {
        $scope.process = process;
      });
    };
  }
]);
