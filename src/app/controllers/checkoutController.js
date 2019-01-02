angular.module("applicationModule").controller("checkoutController", ["$scope", "listeService", "loginService",
	function($scope, listeService, loginService) {

	$scope.ordine = null;
	$scope.subtotale = 0;
	$scope.costoSpedizione = 0;
	$scope.totale = 0;

	$scope.initCheckOut = function(){
		
		if($scope.getOrdineInCorso() == null || $scope.getOrdineInCorso() == undefined){
			alert("non ci sono ordini da processare");
			$scope.changePath('/preferiti');
		} else if($scope.getOrdineInCorso().configurazioni == undefined 
				|| $scope.getOrdineInCorso().configurazioni == null 
				|| $scope.getOrdineInCorso().configurazioni.length == 0){
			alert("l'ordine è vuoto");
			$scope.changePath('/preferiti');
		} else {
			$scope.ordine = $scope.getOrdineInCorso();
			$scope.subtotale = $scope.calcolaPrezzoOrdine($scope.ordine);
			$scope.costoSpedizione = $scope.getCostoSpedizione();
			$scope.totale = $scope.subtotale + $scope.costoSpedizione;
		}
	}

	$scope.getConfigurazioniOrdine = function(){
		if($scope.ordine != undefined && $scope.ordine != null){
			return $scope.ordine.configurazioni;
		} else {
			return [];
		}
	}

	$scope.getNomeECognome = function(){
		return $scope.getNomeSpe();
	}

	$scope.getIndirizzoSpedizione = function(){
		return $scope.getIndSpe();
	}

	$scope.eliminaDaOrdine = function(conf){
		//1. tolgo la configurazione dall'ordine
		for(var i = 0; i < $scope.ordine.configurazioni.length; i++){
			var configurazione = $scope.ordine.configurazioni[i];
			if(configurazione.codice == conf.codice){
				$scope.ordine.configurazioni.splice(i,1);
			}
		}

		//2. salvo l'ordine modificato su DB
		listeService.putOrdine($scope.ordine).then(
			function (res){
				console.log(res);
				if(res.errorMessage != null && res.errorMessage != ""){
					//ho un errore
					console.log(res.errorMessage);
					alert("C'è stato un problema nell aggiornamento dell'ordine");
				} else {
					console.log("Ordine aggiornato");
					$scope.setOrdineInCorso($scope.ordine);
				}
			},
			function (reason){
				console.log(reason);
				alert ("errore salvataggio ordine");
			}
		);
	}
}]);
