angular.module("applicationModule").controller("administratorController", ["$scope", "loginService", "logService", "listeService", "getTuttiOrdiniService", "$location", "ORDERSTATUS", function($scope, loginService, logService, listeService, getTuttiOrdiniService, $location, ORDERSTATUS) {
	var adminController = this;

	$scope.ordinato = [];
	$scope.lavorazione1 = [];
	$scope.lavorazione2 = [];
	$scope.lavorazione = [];
	$scope.spedizione = [];

	$scope.initAdmin = function () {

		$scope.loadOrders();

		var altezza = $(window).height() - $('.navbar').outerHeight()-95;
		$('.stage').outerHeight(altezza);
		$(window).on('resize', function () {
			var altezza = $(window).height() - $('.navbar').height()-95;
			$('.stage').outerHeight(altezza);
		});
			
	};

	$scope.convertDate = function(millis){
		var n = Number(millis);
		var date = new Date(n);
		var dateString = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
		return dateString;
	};

	$scope.updateStatus = function(ordine, stato){
		//chiamata al servizio per l'aggiornamento dell'ordine
		ordine.stato = stato;
		listeService.putOrdine(ordine).then(
			function (res) {
				$scope.loadOrders();//valutare se riorganizzare solo internamente
			},
			function (reason) {
				var dataLog = new Date();
				console.log(reason);
				logService.saveLog(dataLog.toISOString(), $scope.getUserEmail(), "adminController - Aggiornamento Stato Ordine - putOrdine", "errore salvataggio ordine: " + reason.errorMessage, LOG_TYPES.error);
				$scope.openMessageModal("errore aggiornamento ordine");
			}
		);
	};

	$scope.svuotaListe = function(){
		$scope.ordinato = [];
		$scope.lavorazione1 = [];
		$scope.lavorazione2 = [];
		$scope.lavorazione = [];
		$scope.spedizione = [];
	};

	$scope.loadOrders = function(){
		//scarico tutti gli ordini presenti su database (pensare ad una strategia per quando gli ordini saranno tanti)
		$scope.showLoader();
		
		getTuttiOrdiniService.response().then(function(data){
			var listaOrdini = $scope.ordinaListaOrdini(data.data.ordini);
			$scope.distribuisciOrdini(listaOrdini);
			$scope.hideLoader();
		}, function (reason){
			console.log(reason);
			$scope.openMessageModal("C'è stato un problema nel caricamento degli ordini");
		});
		//in base allo stato li metto nel corretto array
	};

	$scope.distribuisciOrdini = function(listaOrdini){
		$scope.svuotaListe();
		listaOrdini.forEach(function(ordine){
			switch(ordine.stato) {
				case ORDERSTATUS.ORDINATO:
				  // code block
				  $scope.ordinato.push(ordine);
				  break;
				case ORDERSTATUS.LAVORAZIONE1:
				  // code block
				  $scope.lavorazione.push(ordine);
				  break;
				case ORDERSTATUS.LAVORAZIONE2:
					// code block
					$scope.lavorazione.push(ordine);
					break;
				case ORDERSTATUS.LAVORAZIONE:
						// code block
						$scope.lavorazione.push(ordine);
						break;
				case ORDERSTATUS.SPEDIZIONE:
					// code block
					$scope.spedizione.push(ordine);
					break;
				case ORDERSTATUS.ARCHIVIATO:
					// code block
					break;
				default:
				  // code block
			  }
		});
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

	$scope.search = function(item) {
		if (!$scope.query || (item.codice.toLowerCase().indexOf($scope.query) != -1) || (item.email.toLowerCase().indexOf($scope.query.toLowerCase()) != -1) || ($scope.convertDate(item.codice).indexOf($scope.query.toLowerCase()) != -1) ){
			return true;
		}
		return false;
	};
}]);
