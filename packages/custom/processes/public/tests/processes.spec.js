'use strict';

(function() {
  // Processes Controller Spec
  describe('MEAN controllers', function() {
    describe('ProcessesController', function() {
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
        module('mean.processes');
      });

      // Initialize the controller and a mock scope
      var ProcessesController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        ProcessesController = $controller('ProcessesController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one process object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('processes').respond([{
            name: 'An Process about MEAN',
            description: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.processes).toEqualData([{
            name: 'An Process about MEAN',
            description: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one process object fetched ' +
        'from XHR using a processId URL parameter', function() {
          // fixture URL parament
          $stateParams.processId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testProcessData = function() {
            return {
              name: 'An Process about MEAN',
              description: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/processes\/([0-9a-fA-F]{24})$/).respond(testProcessData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.process).toEqualData(testProcessData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postProcessData = function() {
            return {
              name: 'An Process about MEAN',
              description: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var responseProcessData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              name: 'An Process about MEAN',
              description: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.name = 'An Process about MEAN';
          scope.description = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('processes', postProcessData()).respond(responseProcessData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.name).toEqual('');
          expect(scope.description).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/processes/' + responseProcessData()._id);
        });

      it('$scope.update(true) should update a valid process', inject(function(Processes) {

        // fixture rideshare
        var putProcessData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            name: 'An Process about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock process object from form
        var process = new Processes(putProcessData());

        // mock process in scope
        scope.process = process;

        // test PUT happens correctly
        $httpBackend.expectPUT(/processes\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/processes\/([0-9a-fA-F]{24})$/, putProcessData()).respond();
        /*
                Error: Expected PUT /processes\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","name":"An Process about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","name":"An Process about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/processes/' + putProcessData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid processId ' +
        'and remove the process from the scope', inject(function(Processes) {

          // fixture rideshare
          var process = new Processes({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.processes = [];
          scope.processes.push(process);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/processes\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(process);
          $httpBackend.flush();

          // test after successful delete URL location processes list
          //expect($location.path()).toBe('/processes');
          expect(scope.processes.length).toBe(0);

        }));
    });
  });
}());
