angular.module("applicationModule").controller("shoppingController", ["$scope", "$location", "$translatePartialLoader",
	function ($scope, $location, $translatePartialLoader, $translate) {


		$scope.homeInit = function (config) {
			$translatePartialLoader.addPart('home');
			$scope.wowInit(config);
		};

		$scope.modificaConfig = function (conf) {
			$scope.setTempConfigurazione(conf);
			$location.url('/configura');
		};


		$scope.schedaProdotto = function (conf) {

			// setto il prodotto selezionato
			// $scope.setShoppingSelected(conf);

			// cambio pagina
			$scope.changePath('/scheda-prodotto/' + conf.codice);
		};
	}]);
