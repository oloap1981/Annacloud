angular.module("applicationModule").controller("homeController", ["$scope", "$location", 
	function($scope, $location, $translatePartialLoader, $translate) {
	
		$scope.homeInit = function(config){
			$scope.wowInit(config);
		};

		$scope.modificaConfig = function(conf){
			$scope.setTempConfigurazione(conf);
			$location.url('/configura');
		};
}]);
