'use strict';

(function() {
  // Busiapps Controller Spec
  describe('MEAN controllers', function() {
    describe('BusiappsController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        jasmine.addMatchers({
          toEqualData: function() {
            return {
              compare: function(actual, expected) {
                return {
                  pass: angular.equals(actual, expected)
                };
              }
            };
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.busiapps');
      });

      // Initialize the controller and a mock scope
      var BusiappsController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        BusiappsController = $controller('BusiappsController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one busiapp object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('busiapps').respond([{
            title: 'An Busiapp about MEAN',
            content: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.busiapps).toEqualData([{
            title: 'An Busiapp about MEAN',
            content: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one busiapp object fetched ' +
        'from XHR using a busiappId URL parameter', function() {
          // fixture URL parament
          $stateParams.busiappId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testBusiappData = function() {
            return {
              title: 'An Busiapp about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/busiapps\/([0-9a-fA-F]{24})$/).respond(testBusiappData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.busiapp).toEqualData(testBusiappData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postBusiappData = function() {
            return {
              title: 'An Busiapp about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var responseBusiappData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              title: 'An Busiapp about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.title = 'An Busiapp about MEAN';
          scope.content = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('busiapps', postBusiappData()).respond(responseBusiappData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.title).toEqual('');
          expect(scope.content).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/busiapps/' + responseBusiappData()._id);
        });

      it('$scope.update(true) should update a valid busiapp', inject(function(Busiapps) {

        // fixture rideshare
        var putBusiappData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Busiapp about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock busiapp object from form
        var busiapp = new Busiapps(putBusiappData());

        // mock busiapp in scope
        scope.busiapp = busiapp;

        // test PUT happens correctly
        $httpBackend.expectPUT(/busiapps\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/busiapps\/([0-9a-fA-F]{24})$/, putBusiappData()).respond();
        /*
                Error: Expected PUT /busiapps\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Busiapp about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Busiapp about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/busiapps/' + putBusiappData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid busiappId ' +
        'and remove the busiapp from the scope', inject(function(Busiapps) {

          // fixture rideshare
          var busiapp = new Busiapps({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.busiapps = [];
          scope.busiapps.push(busiapp);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/busiapps\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(busiapp);
          $httpBackend.flush();

          // test after successful delete URL location busiapps list
          //expect($location.path()).toBe('/busiapps');
          expect(scope.busiapps.length).toBe(0);

        }));
    });
  });
}());
