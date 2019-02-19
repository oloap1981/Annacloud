angular.module("applicationModule").controller("homeController", ["$scope", "loginService", "listeService", "$location", "$translatePartialLoader", 
	function($scope, loginService, listeService, $location, $translatePartialLoader) {
	

		$scope.modificaConfig = function(conf){
			$scope.setTempConfigurazione(conf);
			$location.url('/configura');
		};

}]);
