angular.module("applicationModule").controller("administratorController", ["$scope", "loginService", "$location", function($scope, loginService, getOrdiniService, $location) {
	var adminController = this;
	adminController.initAdmin = function () {

		var altezza = $(window).height() - $('.navbar').outerHeight()-95;
		$('.stage').outerHeight(altezza);
		$(window).on('resize', function () {
			var altezza = $(window).height() - $('.navbar').height()-95;
			$('.stage').outerHeight(altezza);
		});
			
	};
	}
]);
