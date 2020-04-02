angular.module("applicationModule").controller("administratorControllerCodiciSconto", ["$scope", "chiaviService", "loginService", "logService", "listeService", "getTuttiCodiciScontoService", "creaCodiceScontoService", "deleteCodiceScontoService", "$location", "ORDERSTATUS", function ($scope, chiaviService, loginService, logService, listeService, getTuttiCodiciScontoService, creaCodiceScontoService, deleteCodiceScontoService, $location, ORDERSTATUS) {

	$scope.codiciSconto = [];
	$scope.utenti = [];

	$scope.newDate = new Date();
	$scope.newDateString = '';

	$scope.dataScadenza = new Date();
	$scope.dataInizio = new Date();
	$scope.percentuale = 0;
	$scope.motivo = '';
	$scope.note = '';
	$scope.tipoCodice = 'G';
	$scope.idUtente = '';

	$scope.personalizzato = false;

	$scope.initAdmin = function () {

		$scope.loadCodici();
		$scope.loadUsers();

		$scope.newDateString = $scope.convertDatePicker($scope.newDate.getTime());

		var altezza = $(window).height() - $('.navbar').outerHeight() - 95;
		$('.stage').outerHeight(altezza);
		$(window).on('resize', function () {
			var altezza = $(window).height() - $('.navbar').height() - 95;
			$('.stage').outerHeight(altezza);
		});

	};

	$scope.convertDatePicker = function (millis) {
		var n = Number(millis);
		var date = new Date(n);
		var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
		return dateString;
	};

	$scope.convertDate = function (millis) {
		var n = Number(millis);
		var date = new Date(n);
		var dateString = (date.getDate() < 10 ? '0' : '') + date.getDate() + "/" + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + "/" + date.getFullYear();
		return dateString;
	};

	$scope.loadUsers = function () {
		var email = $scope.getUserEmail();
		//chiamata per ottere le chiavi
		chiaviService.getChiave(email).then(function (data) {

			var chiavePubblica = data.data.chiave.chiavePubblica;
			var chiavePrivata = data.data.chiave.chiavePrivata;

			var parameters = {};
			// var attributes = ["telefono"]
			// parameters.AttributesToGet = attributes;

			loginService.listUsers(parameters, chiavePubblica, chiavePrivata).then(function (data) {
				$scope.normalizzaUtenti(data.Users);

			}, function (reason) {
				var reasonR = reason;
			});
		},
			function (reason) {
				var reasonR = reason;
			});
	};

	$scope.normalizzaUtenti = function (utentiCompleti) {
		angular.forEach(utentiCompleti, function (utente) {
			var email = $scope.getAttributeValue(utente.Attributes, "email");
			if (email != '') {
				$scope.utenti.push(email);
			}
		});
	};

	$scope.loadCodici = function () {
		//scarico tutti gli ordini presenti su database (pensare ad una strategia per quando gli ordini saranno tanti)
		$scope.showLoader();

		listeService.getTuttiCodiciSconto().then(function (data) {
			$scope.codiciSconto = data.data.codiciSconto;
			$scope.hideLoader();
		}, function (reason) {
			console.log(reason);
			$scope.hideLoader();
			$scope.openMessageModal("C'è stato un problema nel caricamento dei codici sconto");
		});
		//in base allo stato li metto nel corretto array
	};

	$scope.changePersonalizzato = function () {
		if ($scope.personalizzato) {
			$scope.tipoCodice = 'P';
		} else {
			$scope.tipoCodice = 'G';
		}
	};


	$scope.salvaCodiceSconto = function () {

		if ($scope.percentuale < 0 || $scope.percentuale > 100) {
			$scope.openMessageModal("La percentuale deve essere tra 0 e 100");
			return;
		}
		if ($scope.percentuale == 0) {
			$scope.openMessageModal("Specificare una percentuale maggiore di 0");
			return;
		}
		if ($scope.tipoCodice == 'P' && $scope.idUtente == '') {
			$scope.openMessageModal("Un codice sconto personalizzato deve avere una mail destinataria");
			return;
		}
		var codiceScontoObject = {};


		var dataScadenzaSplit = $scope.dataScadenza.split('/');
		var dataScadenzaGiorno = dataScadenzaSplit[0];
		var dataScadenzaMese = dataScadenzaSplit[1];
		var dataScadenzaAnno = dataScadenzaSplit[2];
		var dataScadenza = new Date();
		dataScadenza.setDate(parseInt(dataScadenzaGiorno));
		dataScadenza.setMonth(parseInt(dataScadenzaMese) - 1);
		dataScadenza.setFullYear(parseInt(dataScadenzaAnno));

		var dataInizioSplit = $scope.dataInizio.split('/');
		var dataInizioGiorno = dataInizioSplit[0];
		var dataInizioMese = dataInizioSplit[1];
		var dataInizioAnno = dataInizioSplit[2];
		var dataInizio = new Date();
		dataInizio.setDate(parseInt(dataInizioGiorno));
		dataInizio.setMonth(parseInt(dataInizioMese) - 1);
		dataInizio.setFullYear(parseInt(dataInizioAnno));

		if (dataInizio.getTime() > dataScadenza.getTime()) {
			$scope.openMessageModal("La data di scadenza deve essere successiva alla data di inizio");
			return;
		}

		var codiceCodiceSconto = $scope.randomString(10);
		codiceScontoObject.codice = codiceCodiceSconto;
		codiceScontoObject.idUtente = $scope.idUtente;
		codiceScontoObject.dataScadenza = dataScadenza.getTime();
		codiceScontoObject.dataInizio = dataInizio.getTime();
		codiceScontoObject.tipoCodice = $scope.tipoCodice;
		codiceScontoObject.valido = 1;
		codiceScontoObject.percentuale = $scope.percentuale;
		codiceScontoObject.note = $scope.note;
		codiceScontoObject.motivo = $scope.motivo;

		console.log(JSON.stringify(codiceScontoObject));
		$scope.showLoader();

		listeService.creaCodiceSconto(codiceScontoObject).then(function (data) {
			$scope.openMessageModal("Codice sconto creato con successo; il codice è: " + codiceCodiceSconto);
			$scope.azzeraCampi();
			$scope.hideLoader();
			$scope.loadCodici();

			// mandare mail se personalizzato?

		}, function (reason) {
			console.log(reason);
			$scope.hideLoader();
			$scope.openMessageModal("C'è stato un problema nel caricamento dei codici sconto");
		});
	};

	$scope.cancellaCodiceSconto = function (id) {
		$scope.showLoader();
		listeService.deleteCodiceSconto(id).then(function (data) {
			$scope.openMessageModal("Codice sconto cancellato correttamente");
			$scope.hideLoader();
			$scope.loadCodici();
		}, function (reason) {
			console.log(reason);
			$scope.hideLoader();
			$scope.openMessageModal("C'è stato un problema nel caricamento dei codici sconto");
		});
	};


	$scope.azzeraCampi = function () {
		$scope.personalizzato = false;
		// $scope.dataScadenza = new Date();
		// $scope.dataInizio = new Date();
		// $scope.newDateString = $scope.convertDate($scope.newDate.getTime());
		$scope.percentuale = 0;
		$scope.motivo = '';
		$scope.note = '';
		$scope.tipoCodice = 'G';
		$scope.idUtente = '';
	};

	$scope.randomString = function (length) {
		var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var result = '';
		for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
		return result;
	};

	$scope.getAttributeValue = function (attibutes, attributeName) {
		var attrValue = "";
		attibutes.some(function (attr) {
			if (attr.Name === attributeName) {
				attrValue = attr.Value;
				return;
			}
		});
		return attrValue;
	};

	$scope.eliminaCodiceSconto = function (codiceSconto) {
		if (confirm("Sicuro di voler eliminare il codice sconto " + codiceSconto.codice + "?")) {
			$scope.cancellaCodiceSconto(codiceSconto.id);
		}
	};

	$scope.complete = function (string) {
		var output = [];
		angular.forEach($scope.utenti, function (utente) {
			if (utente.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
				output.push(utente);
			}
		});
		$scope.filterUsers = output;
	};
	$scope.fillTextbox = function (string) {
		$scope.idUtente = string;
		$scope.filterUsers = null;
	};

	$scope.search = function (item) {
		if (!$scope.query || (item.codice.toLowerCase().indexOf($scope.query) != -1)) {
			return true;
		}
		return false;
	};
}]);
