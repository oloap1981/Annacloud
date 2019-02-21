angular.module("applicationModule").controller("homeController", ["$scope", "$location", "$translatePartialLoader", 
	function($scope, $location, $translatePartialLoader, $translate) {
	
		

		$scope.homeInit = function(config){
			$translatePartialLoader.addPart('home');
			$scope.wowInit(config);
		};

		$scope.modificaConfig = function(conf){
			$scope.setTempConfigurazione(conf);
			$location.url('/configura');
		};
}]);
