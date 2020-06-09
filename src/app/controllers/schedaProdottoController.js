angular.module("applicationModule").controller("schedaProdottoController", ["$scope", "$location", "$translatePartialLoader", "$translate", "$routeParams", "loginService", "jwtHelper", "listeService", "carrelloService",
	function ($scope, $location, $translatePartialLoader, $translate, $routeParams, loginService, jwtHelper, listeService, carrelloService) {

		$scope.configurazioneId = $routeParams.id;

		$scope.shoppingSelected = [];
		$scope.shoppingSelected.nome = "";
		$scope.shoppingSelected.descrizioneBreve = "";
		$scope.shoppingSelected.elencoEntita = [];

		$scope.prezzo = "";

		$scope.thumbnails = [];

		$scope.schedaProdottoInit = function () {
			// devo scaricare qui la configurazione
			if ($scope.configurazioneId != null && $scope.configurazioneId != undefined && $scope.configurazioneId != "") {
				// l'id c'è, provo a caricare la configurazione
				$scope.showLoader();
				listeService.getConfigurazione($scope.configurazioneId).then(function (res2) {


					if (res2.data.configurazione != undefined) {
						//$scope.setTempConfigurazione(configurazione);
						$scope.shoppingSelected = res2.data.configurazione;
						$scope.prezzo = "" + $scope.calcolaPrezzoScontato($scope.shoppingSelected);
						$scope.thumbnails = $scope.shoppingSelected.thumbnail.split(",");
						$scope.hideLoader();
					} else {
						// alert no configurazione trovata
						$scope.hideLoader();
						$scope.openMessageModal("Non è stata trovata nessun oggetto con l'id " + $scope.configurazioneId);
						$scope.changePath('/shopping' + conf.codice);
					}
				});
			} else {
				//alert no id configurazione passato
				$scope.openMessageModal("Non è stato passato nessun identificativo di configurazione");
				$scope.changePath('/shopping' + conf.codice);

			}
		};

		$scope.translateHDThumbnail = function (thumbnail) {
			var split = thumbnail.split(".");
			return split[0] + "_H." + split[1];
		};

		$scope.shoppingAcquista = function () {
			if ($scope.isLogged()) {
				$scope.aggiungiAlCarrello();
			} else {
				// $scope.salvaTempELogin();
				$scope.aggiungiConfigurazioneACarrelloCookies();
			}
		};

		$scope.aggiungiAlCarrello = function () {
			$scope.salvaConfigurazione(true);
		};

		$scope.salvaTempELogin = function () {

			$scope.setNextPath("/scheda-prodotto");
			$scope.changePath('/accedi');
		};

		$scope.aggiungiConfigurazioneACarrelloCookies = function() {
			// carrelloService.svuotaCarrello();
			$scope.shoppingSelected.carrello = true;
			$scope.shoppingSelected.codice = ""; // in questo modo ne crea una nuova
			$scope.shoppingSelected.tipo = "SC"; // Shopping Cliente

			carrelloService.addObjectToCarrello($scope.shoppingSelected);
		}

		$scope.salvaConfigurazione = function (isCarrello) {

			$scope.shoppingSelected.carrello = true;
			$scope.shoppingSelected.codice = ""; // in questo modo ne crea una nuova
			$scope.shoppingSelected.tipo = "SC"; // Shopping Cliente

			$scope.assegnaUtenteAConfigurazione();

			$scope.salvaConfigurazioneTemporanea();
			$scope.salvaOAcquista($scope.shoppingSelected.nome, true, false);
		};

		$scope.salvaConfigurazioneTemporanea = function () {
			// var arrayIniziali = configController.generateArrayEntitaIniziali();
			$scope.setTempConfigurazione($scope.shoppingSelected);
		};

		$scope.isLogged = function () {
			return loginService.isLoggedIn();
		};

		$scope.assegnaUtenteAConfigurazione = function () {
			var userInSession = $scope.getUser();
			var user = {};
			if (userInSession != null) {
				// 	user.email = userInSession.email;
				var idToken = jwtHelper.decodeToken(userInSession.signInUserSession.idToken.jwtToken);
				var email = idToken.email;
				user.email = email;
			}
			$scope.shoppingSelected.utente = user;
		};

		$scope.getEmptyConfig = function () {
			var config = [];
			config.nome = "";
			config.descrizioneBreve = "";
		};
	}]);
