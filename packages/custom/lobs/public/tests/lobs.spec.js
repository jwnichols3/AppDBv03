'use strict';

(function() {
  // LOBs Controller Spec
  describe('MEAN controllers', function() {
    describe('LOBsController', function() {
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
        module('mean.lobs');
      });

      // Initialize the controller and a mock scope
      var LOBsController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        LOBsController = $controller('LOBsController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one lob object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('lobs').respond([{
            name: 'An LOB about MEAN',
            description: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.lobs).toEqualData([{
            name: 'An LOB about MEAN',
            description: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one lob object fetched ' +
        'from XHR using a lobId URL parameter', function() {
          // fixture URL parament
          $stateParams.lobId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testLOBData = function() {
            return {
              name: 'An LOB about MEAN',
              description: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/lobs\/([0-9a-fA-F]{24})$/).respond(testLOBData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.lob).toEqualData(testLOBData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postLOBData = function() {
            return {
              name: 'An LOB about MEAN',
              description: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var responseLOBData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              name: 'An LOB about MEAN',
              description: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.name = 'An LOB about MEAN';
          scope.description = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('lobs', postLOBData()).respond(responseLOBData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.name).toEqual('');
          expect(scope.description).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/lobs/' + responseLOBData()._id);
        });

      it('$scope.update(true) should update a valid lob', inject(function(LOBs) {

        // fixture rideshare
        var putLOBData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            name: 'An LOB about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock lob object from form
        var lob = new LOBs(putLOBData());

        // mock lob in scope
        scope.lob = lob;

        // test PUT happens correctly
        $httpBackend.expectPUT(/lobs\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/lobs\/([0-9a-fA-F]{24})$/, putLOBData()).respond();
        /*
                Error: Expected PUT /lobs\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","name":"An LOB about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","name":"An LOB about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/lobs/' + putLOBData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid lobId ' +
        'and remove the lob from the scope', inject(function(LOBs) {

          // fixture rideshare
          var lob = new LOBs({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.lobs = [];
          scope.lobs.push(lob);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/lobs\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(lob);
          $httpBackend.flush();

          // test after successful delete URL location lobs list
          //expect($location.path()).toBe('/lobs');
          expect(scope.lobs.length).toBe(0);

        }));
    });
  });
}());
