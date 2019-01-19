angular.module("applicationModule").controller("homeController", ["$scope", "loginService", "listeService", "$location",
	function($scope, loginService, listeService, $location) {
	
	$scope.modificaConfig = function(conf){
		$scope.setTempConfigurazione(conf);
		$location.url('/configura');
	};

}]);
