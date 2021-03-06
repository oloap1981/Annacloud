angular.module("applicationModule").controller("carrelloController", ["$scope", "listeService", "loginService", "$location", "jwtHelper", "carrelloService",
	function($scope, listeService, loginService, $location, jwtHelper, carrelloService) {

		$scope.carrelloContent = [];

		$scope.carrelloInit = function() {
			$scope.carrelloContent = $scope.getCarrello();
		};

	$scope.rimuoviDaCarrello = function(conf){

		if ($scope.user == null) {
			// non sono loggato
			carrelloService.removeObjectFromCarrello(conf);
		} else {
			// sono loggato
			if (confirm("Sicuro di voler togliere dal carrello la configurazione " + conf.nome + "?")) {
				conf.carrello = false;
				$scope.setLoaderMessage("elimino la configurazione dal carrello...");
				$scope.showLoader();
				listeService.putConfigurazione(conf).then(
					function (res) {
						if (res.errorMessage != undefined && res.errorMessage != null) {
							$scope.hideLoader();
							$scope.openMessageModal("Si è verificato un problema nell'eliminazione della configurazione dal carrello");
						} else {
							$scope.ricaricaListe($scope.getUserEmail(), "", true);
						}
					},
					function (reason) {
						console.log(reason);
						$scope.openMessageModal("errore aggiunta preferiti");
					}
				);
			}
		}
	};

	$scope.getCheckout = function(){
		
		//preparare l'ordine e metterlo in sessione
		var ordine = {};

		ordine.costo = $scope.getTotalAmount();
		ordine.costiSpedizione = $scope.getCostoSpedizione();
		ordine.stato = 0;
		ordine.pagato = false;

		utenteOrdine = {};
		utenteOrdine.email = $scope.getUserEmail();
		ordine.utente = utenteOrdine;
		ordine.email = utenteOrdine.email;

		ordine.configurazioni = $scope.getCarrello();

		//metto l'ordine in sessione e vado alla pagina di checkout
		$scope.setOrdineInCorso(ordine);

		if (loginService.isLoggedIn()) {
			$location.url('/checkout');
		} else {
			$location.url('/checkout-register');
		}
		
	};

	$scope.getUserEmail = function(){

		var userInSession = $scope.getUser();
		var user = {};
		if(userInSession != null){
			var idToken = jwtHelper.decodeToken(userInSession.signInUserSession.idToken.jwtToken);
			return idToken.email;
		}
		return "";
	};

	
}]);
