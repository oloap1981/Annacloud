angular.module('applicationModule', ['ajoslin.promise-tracker'])
	.controller('contattiController', function ($scope, $http, $log, promiseTracker, $timeout) {
		$scope.subjectListOptions = {
			'bug': 'Report a Bug',
			'account': 'Account Problems',
			'mobile': 'Mobile',
			'user': 'Report a Malicious User',
			'other': 'Other'
		};

		// Inititate the promise tracker to track form submissions.
		$scope.progress = promiseTracker();

		// Form submit handler.
		$scope.submit = function (form) {
			// Trigger validation flag.
			$scope.submitted = true;

			// If form is invalid, return and let AngularJS show validation errors.
			if (form.$invalid) {
				return;
			}

			// Default values for the request.
			var config = {
				params: {
					'callback': 'JSON_CALLBACK',
					'name': $scope.name,
					'surname': $scope.surname,
					'email': $scope.email,
					'comments': $scope.comments
				},
			};

			// Perform JSONP request.
			var $promise = $http.jsonp('response.json', config)
				.success(function (data, status, headers, config) {
					if (data.status == 'OK') {
						$scope.name = null;
						$scope.surname = null;
						$scope.email = null;
						$scope.comments = null;
						$scope.messages = 'l\'email &egrave; stata inviata';
						$scope.submitted = false;
					} else {
						$scope.messages = 'Oops, c\'&egrave; stato un errore nell\'invio. Riprova.';
						$log.error(data);
					}
				})
				.error(function (data, status, headers, config) {
					$scope.progress = data;
					$scope.messages = 'There was a network error. Try again later.';
					$log.error(data);
				})
				.finally(function () {
					// Hide status messages after three seconds.
					$timeout(function () {
						$scope.messages = null;
					}, 3000);
				});

			// Track the request and show its progress to the user.
			$scope.progress.addPromise($promise);
		};
	});