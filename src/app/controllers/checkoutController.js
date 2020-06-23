angular.module("applicationModule").controller("checkoutController", ["$scope", "listeService", "loginService",
	function ($scope, listeService, loginService) {

		$scope.subtotale = 0;
		$scope.costoSpedizione = 0;
		$scope.totale = 0;

		$scope.fattura = false;

		$scope.codiceCodiceSconto = '';
		$scope.subtotaleSconto = 0;
		$scope.percentualeCodiceSconto = 0;
		$scope.applicaSconto = false;

		$scope.initCheckOut = function () {

			// $scope.ordine = $scope.ordineInCorso;
			$scope.subtotale = $scope.calcolaPrezzoOrdine($scope.ordineInCorso);
			$scope.subtotaleSconto = $scope.calcolaPrezzoOrdineFinale($scope.ordineInCorso);
			$scope.costoSpedizione = $scope.getCostoSpedizione();
			$scope.totale = $scope.subtotaleSconto + $scope.costoSpedizione;

			$scope.promise.then(function() {
				$scope.subtotale = $scope.calcolaPrezzoOrdine($scope.ordineInCorso);
				$scope.subtotaleSconto = $scope.calcolaPrezzoOrdineFinale($scope.ordineInCorso);
				$scope.costoSpedizione = $scope.getCostoSpedizione();
				$scope.totale = $scope.subtotaleSconto + $scope.costoSpedizione;
			});

			// if ($scope.ordineInCorso == null || $scope.ordineInCorso == undefined) {
			// 	$scope.openMessageModal("non ci sono ordini da processare");
			// 	$scope.changePath('/preferiti');
			// } else if ($scope.ordineInCorso.configurazioni == undefined || $scope.ordineInCorso.configurazioni == null || $scope.ordineInCorso.configurazioni.length == 0) {
			// 	$scope.openMessageModal("l'ordine è vuoto");
			// 	$scope.changePath('/preferiti');
			// } else {
			// 	$scope.ordine = $scope.getOrdineInCorso();
			// 	$scope.subtotale = $scope.calcolaPrezzoOrdine($scope.ordineInCorso);
			// 	$scope.subtotaleSconto = $scope.calcolaPrezzoOrdineFinale($scope.ordineInCorso);
			// 	$scope.costoSpedizione = $scope.getCostoSpedizione();
			// 	$scope.totale = $scope.subtotaleSconto + $scope.costoSpedizione;
			// }
		};


		$scope.riscattaCodiceSconto = function () {
			if ($scope.codiceCodiceSconto == '') {
				$scope.openMessageModal("Il codice sconto deve essere valorizzato");
				return;
			}
			$scope.showLoader();
			listeService.consumaCodiceSconto($scope.codiceCodiceSconto, $scope.getUserEmail()).then(
				function (response) {
					console.log(JSON.stringify(response));
					if ($scope.isErrorResponse(response)) {
						//ho un errore
						$scope.hideLoader();
						$scope.manageErrorResponse(response, "C'è stato un problema nel riscatto del codice sconto", true);
					} else {
						$scope.hideLoader();
						$scope.percentualeCodiceSconto = response.data.percentualeCodiceSconto;
						console.log("codiceSconto riscattato: " + $scope.percentualeCodiceSconto);
						$scope.applicaSconto = true;
						$scope.addCodiceScontoOrdineInCorso($scope.codiceCodiceSconto, $scope.percentualeCodiceSconto);
						$scope.subtotaleSconto = $scope.calcolaPrezzoOrdineFinale($scope.ordine);
						$scope.totale = $scope.subtotaleSconto + $scope.costoSpedizione;
					}
				}, function (reason) {
					console.log(reason);
					$scope.openMessageModal("errore mentre tentavo di riscattare il codice");
				}
			);
		};

		$scope.inserisciIndirizzoSpedizione = function () {
			$scope.setPendingCheckout(true);
			$scope.changePath('/profilo');
		};

		$scope.getConfigurazioniOrdine = function () {
			if ($scope.ordine != undefined && $scope.ordine != null) {
				return $scope.ordine.configurazioni;
			} else {
				return [];
			}
		};

		$scope.getNomeECognome = function () {
			return $scope.getNomeSpe();
		};

		$scope.getIndirizzoSpedizione = function () {
			return $scope.getIndSpe();
		};

		$scope.getCittaSpedizione = function () {
			return $scope.getCittaSpe();
		};

		$scope.getCAPSpedizione = function () {
			return $scope.getCapSpe();
		};

		$scope.canBuy = function () {
			return $scope.getNomeSpe() != "" && $scope.getIndSpe() != "";
		};

		$scope.eliminaDaOrdine = function (conf) {
			//1. tolgo la configurazione dall'ordine
			for (var i = 0; i < $scope.ordine.configurazioni.length; i++) {
				var configurazione = $scope.ordine.configurazioni[i];
				if (configurazione.codice == conf.codice) {
					$scope.ordine.configurazioni.splice(i, 1);
				}
			}

			//2. salvo l'ordine modificato su DB
			listeService.putOrdine($scope.ordine).then(
				function (res) {
					console.log(res);
					if ($scope.isErrorResponse(res)) {
						//ho un errore
						$scope.manageErrorResponse(res, "C'è stato un problema nell aggiornamento dell'ordine", true);
					} else {
						console.log("Ordine aggiornato");
						$scope.setOrdineInCorso($scope.ordine);
					}
				},
				function (reason) {
					console.log(reason);
					$scope.openMessageModal("errore salvataggio ordine");
				}
			);
		};

	}]);
