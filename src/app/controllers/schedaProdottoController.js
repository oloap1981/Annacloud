angular.module("applicationModule").controller("schedaProdottoController", ["$scope", "$location", "$translatePartialLoader", "$translate", "loginService", "jwtHelper",
	function($scope, $location, $translatePartialLoader, $translate, loginService, jwtHelper) {
	
		$scope.shoppingSelected = null;		
		$scope.thumbnails = [];

		$scope.schedaProdottoInit = function(){
			$scope.shoppingSelected = $scope.getShoppingSelected();
			$scope.thumbnails = $scope.shoppingSelected.thumbnail.split(",");
		};

		$scope.translateHDThumbnail = function(thumbnail){
			var split = thumbnail.split(".");
			return split[0] + "_H." + split[1];
		};

		$scope.shoppingAcquista = function(){
			if($scope.isLogged()){
				$scope.aggiungiAlCarrello();
			} else {
				$scope.salvaTempELogin();
			}
		};

		$scope.aggiungiAlCarrello = function () {
			$scope.salvaConfigurazione(true);
		};
	
		$scope.salvaTempELogin = function () {
			
			$scope.setNextPath("/scheda-prodotto");
			$scope.changePath('/accedi');
		};
	
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
}]);
