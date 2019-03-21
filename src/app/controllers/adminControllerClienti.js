angular.module("applicationModule").controller("administratorControllerClienti", ["$scope", "chiaviService", "loginService", "logService", "listeService", "getOrdiniService", "$location", "ORDERSTATUS", function($scope, chiaviService, loginService, logService, listeService, getOrdiniService, $location, ORDERSTATUS) {

	$scope.utenti = [];
	$scope.ordini = [];

	$scope.initAdmin = function () {

		$scope.loadUsers();

		var altezza = $(window).height() - $('.navbar').outerHeight()-95;
		$('.stage').outerHeight(altezza);
		$(window).on('resize', function () {
			var altezza = $(window).height() - $('.navbar').height()-95;
			$('.stage').outerHeight(altezza);
		});
			
	};

	$scope.convertDate = function(millis){
		var n = Number(millis)
		var date = new Date(n);
		var dateString = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
		return dateString;
	};

	$scope.loadUsers = function(){
		var email = $scope.getUserEmail();
		//chiamata per ottere le chiavi
		chiaviService.getChiave(email).then(function(data) {

			var chiavePubblica = data.data.chiave.chiavePubblica;
			var chiavePrivata = data.data.chiave.chiavePrivata;

			loginService.listUsers({}, chiavePubblica, chiavePrivata).then(function(data){
				$scope.utenti = $scope.inizializzaUtenti(data.Users);
			}, function(reason){
				var reasonR = reason;
			});
		}, 
		function(reason){
			var reason = reason;
		});
	};

	$scope.loadOrders = function(email){
		$scope.showLoader();
		getOrdiniService.response(email).then(function(data){
			$scope.ordini = $scope.ordinaListaOrdini(data.data.ordini);
			$scope.hideLoader();
		});
	}
	
	$scope.inizializzaUtenti = function(users){
		var utenti = [];
		users.forEach(function(user){
			var utente = {};

			utente.nome = $scope.getAttributeValue(user.Attributes, "name");
			utente.cognome = $scope.getAttributeValue(user.Attributes, "family_name");
			utente.email = $scope.getAttributeValue(user.Attributes, "email");

			utenti.push(utente);
		});
		return utenti;
	};

	$scope.getAttributeValue = function(attibutes, attributeName){
		var attrValue = "";
		attibutes.some(function(attr){
			if(attr.Name === attributeName){
				attrValue = attr.Value;
				return;
			}
		});
		return attrValue;
	};

	$scope.ordinaListaOrdini = function(listaDaOrdinare){
		if(listaDaOrdinare.length > 0){
			return listaDaOrdinare.sort(function(a,b){
				//criterio di ordinamento
				if (a.codice > b.codice) {
					return -1;
				}
				if (a.codice < b.codice) {
					return 1;
				}
				// a deve essere uguale a b
				return 0;
			});
		} else return listaDaOrdinare;
	};

	$scope.schedaCliente = function(utente){

		

		openSchedaCliente();
	}
}]);
