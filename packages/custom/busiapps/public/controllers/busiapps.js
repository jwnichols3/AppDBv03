'use strict';

angular.module('mean.busiapps').controller('BusiappsController', ['$scope', '$stateParams', '$location', 'Global', 'Busiapps', 
  function($scope, $stateParams, $location, Global, Busiapps) {
    $scope.global = Global;

    $scope.hasAuthorization = function(busiapp) {
      if (!busiapp || !busiapp.user) return false;
      return $scope.global.isAdmin || busiapp.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var busiapp = new Busiapps({
          // SIMPLIFYING for Now
          SERVICE_OR_APPLICATION_NAME: this.SERVICE_OR_APPLICATION_NAME
          // content: this.content
        });
        busiapp.$save(function(response) {
          $location.path('busiapps/' + response._id);
        });

        this.SERVICE_OR_APPLICATION_NAME = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    // // Modal for viewing record
    // $scope.open = function (size) {
    //   var modalInstance = $modal.open({
    //     templateUrl: 'modal-view.html',
    //     controller: modalInstanceCtrl,
    //     size: size,
    //     resolve: {
    //       items: function() {
    //         return $scope.items;
    //       }
    //     }
    //   });

    //   modalInstance.result.this(function (selectedItem){
    //     $scope.selected = selectedItem;
    //   }, function(){
    //     $log.info('Modal dismissed at: ' + new Date());
    //   });
    // };

    $scope.remove = function(busiapp) {
      if (busiapp) {
        busiapp.$remove(function(response) {
          for (var i in $scope.busiapps) {
            if ($scope.busiapps[i] === busiapp) {
              $scope.busiapps.splice(i, 1);
            }
          }
          $location.path('busiapps');
        });
      } else {
        $scope.busiapp.$remove(function(response) {
          $location.path('busiapps');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var busiapp = $scope.busiapp;
        if (!busiapp.updated) {
          busiapp.updated = [];
        }
        busiapp.updated.push(new Date().getTime());

        busiapp.$update(function() {
          $location.path('busiapps/' + busiapp._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Busiapps.query(function(busiapps) {
        $scope.busiapps = busiapps;
      });
    };

    $scope.findOne = function() {
      Busiapps.get({
        busiappId: $stateParams.busiappId
      }, function(busiapp) {
        $scope.busiapp = busiapp;
      });
    };
  }
]);
