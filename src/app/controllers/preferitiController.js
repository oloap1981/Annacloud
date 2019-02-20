angular.module("applicationModule").controller("preferitiController", ["$scope", "loginService", "listeService", "$location",
	function($scope, loginService, listeService, $location) {

	
	$scope.goToPage = function(conf){
		$scope.setTempConfigurazione(conf);
		$location.url('/configura');
	};

	$scope.addToCart = function(configurazione){
		var localTempConfig = configurazione;
		$scope.setLoaderMessage("aggiungo la configurazione al carrello...");
		$scope.showLoader();

		var presente = $scope.checkNomePresente(localTempConfig.nome, true);
		if(presente){
			var nuovoNome = $scope.generaNuovoNome(localTempConfig.nome);
			localTempConfig.codice = "";//in questo modo viene generata nuova
			localTempConfig.nome = nuovoNome;
		} 
		localTempConfig.carrello = true;
		listeService.putConfigurazione(localTempConfig).then(
			function (res){
				if(res.errorMessage != undefined){
					$scope.openMessageModal("si è verificato un problema nell inserimento della configurazione nel carrello");
					console.log(res.errorMessage);
				} else {
					console.log(res);
					$scope.openMessageModal("configurazione aggiunta correttamente al carrello");
					$scope.ricaricaListe($scope.getUserEmail(), '', true);
				}
			},
			function (reason){
				console.log(reason);
				$scope.openMessageModal("errore aggiunta preferiti");
			}
		);
	};

	$scope.eliminaConfigurazione  = function (codice)  {
		console.log("sto per eliminare la configurazione con codice " + codice);
		$scope.setLoaderMessage("sto eliminando la configurazione...");
		$scope.showLoader();
		listeService.deleteConfigurazione(codice).then(function(data){
				if(data.errorMessage != null && data.errorMessage != undefined){
					$scope.hideLoader();
					$scope.openMessageModal("si è verificato un errore nella cancellazione della configurazione");
					console.log("errorMessage");
				} else {
					$scope.ricaricaListe($scope.getUserEmail(), "", true);
				}
	
			},
			function (reason){
				console.log(reason);
				$scope.openMessageModal("errore cancellazione");
			}
		);
	};
}]);
