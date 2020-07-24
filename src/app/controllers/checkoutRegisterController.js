angular.module("applicationModule").controller("checkoutRegisterController", ["$scope", "listeService", "loginService", "jwtHelper", "LOG_TYPES", "ROLES", "logService",
	function ($scope, listeService, loginService, jwtHelper, LOG_TYPES, ROLES, logService) {

	$scope.ordine = null;
	$scope.subtotale = 0;
	$scope.costoSpedizione = 0;
	$scope.totale = 0;

	$scope.fattura = false;

	$scope.loginEmail = '';
	$scope.loginPassword = '';

	$scope.formValido = false;
	$scope.nome = '';
	$scope.cognome = '';
	$scope.emailSign = '';
	$scope.passwordSign = '';
	$scope.passwordSignRep = '';
	$scope.nomeSpe = '';
	$scope.indSpe = '';
	$scope.cittaSpe = '';
	$scope.capSpe = '';

	$scope.newsletter = false;


	$scope.formValido = function() {
		return $scope.passwordSign.length > 5 &&
			$scope.passwordSignRep === $scope.passwordSign &&
			$scope.nome !== '' && 
			$scope.cognome !== '' &&
			$scope.emailSign !== '' &&
			$scope.nomeSpe !== '' &&
			$scope.indSpe !== '' &&
			$scope.cittaSpe !== '' &&
			$scope.capSpe !== '';
			
	};

	$scope.isLoginInputValid = function() {
		return $scope.loginEmail !== '' &&
			$scope.passwordLogin !== '';
	};

	$scope.registerAndLogin = function() {

		loginService.signUp($scope.emailSign, $scope.capitalizeString($scope.nome), $scope.capitalizeString($scope.cognome), $scope.passwordSign).then(
			function (data) {
				console.log(data);

				utente = {};
				utente.email = $scope.emailSign;
				//utente.username = nome + "-" +cognome;
				utente.nome = $scope.nome;
				utente.cognome = $scope.cognome;

				//popolo il login per agevolare l'utente appena registrato
				$scope.loginEmail = $scope.emailSign;
				$scope.loginPassword = $scope.passwordSign;

				//mail di avviso avvenuta registrazione
				var message = {};

				message.toEmailAddress = [$scope.emailSign];
				message.ccEmailAddress = [];
				message.emailSubject = "Conferma registrazione";
				message.emailMessage = "Congratulazioni, ti sei registrato su annacloud.it con successo.";

				listeService.sendEmail(message).then(
					function (res2) {
						if (res2.errorMessage != null && res2.errorMessage != "") {
							console.log(res2.errorMessage);
							$scope.openMessageModal("C'è stato un problema nell'invio della mail di conferma registrazione");
						}
					}
				);

				loginService.login($scope.loginEmail, $scope.loginPassword).then(
					function (data) {
						console.log(data);
						loginService.getCurrentUser().then(function (data) {
							console.log(data);
							var user = data;
							user.eMail = $scope.loginEmail;
							$scope.setUser(user);

							var idToken = jwtHelper.decodeToken(user.signInUserSession.idToken.jwtToken);
							if (idToken["cognito:roles"] == undefined) {
								$scope.setRole(ROLES.REGULAR);
							} else {
								$scope.setRole(idToken["cognito:roles"][0]);
							}

							$scope.reloadAttributes();
							// se ci sono oggetti nel carrelloCookies li riverso nel carrello utente e svuoto il carrelloCookies
							$scope.riversaCarrelloCookiesInUtente($scope.loginEmail);
							$scope.ricaricaListe($scope.loginEmail, "");

							//loggo informazioni sull'utente loggato
							//data, utente, classe, messaggio
							var dataLog = new Date();

							logService.saveLog(dataLog.toISOString(), $scope.loginEmail, "Utente correttamente loggato", "accessoController", LOG_TYPES.login).then(function (resLog) {
								console.log(resLog);
							}, function (reason) {
								console.log(reason);
							});

							loginService.setDeviceStatusNotRemembered().then(
								function (greeting) {
									console.log('Success: not remembered ' + greeting);
								}, function (reason) {
									logService.saveLog(dataLog.toISOString(), $scope.loginEmail, "accessoController - login - setDeviceStatusNotRemembered", "errore: " + reason.errorMessage, LOG_TYPES.error);
									console.log('Failed: ' + reason);
								});

							// salvo i dati di spedizione
							$scope.cambiaIndirizzoSpedizione($scope.nomeSpe, $scope.indSpe, $scope.cittaSpe, $scope.capSpe);
						});
					}, function (reason) {
						console.log(reason);
						var dataLog = new Date();
						if (reason.code == "NotAuthorizedException" || reason.code == "UserNotFoundException") {
							$scope.openMessageModal("Nome utente o password errati");
						} else {
							logService.saveLog(dataLog.toISOString(), email, "accessoController - login", "si è verificato un problema durante il login: " + reason.message, LOG_TYPES.error);
							//$scope.openMessageModal(reason.message);
							$scope.openMessageModal("Si &egrave; verificato un problema di connessione. Se il problema presiste, riprovare in un secondo momento. Grazie.");
						}
					}
				);
			},
			function (reason) {
				console.log(reason);
				$scope.openMessageModal("C'è stato un problema nella registrazione dell'utente: " + reason);
			}
		);
	};

	$scope.loginAlreadyRegistered = function() {
		loginService.login($scope.loginEmail, $scope.loginPassword).then(
			function (data) {
				console.log(data);
				loginService.getCurrentUser().then(function (data) {
					console.log(data);
					var user = data;
					user.eMail = $scope.loginEmail;
					$scope.setUser(user);

					var idToken = jwtHelper.decodeToken(user.signInUserSession.idToken.jwtToken);
					if (idToken["cognito:roles"] == undefined) {
						$scope.setRole(ROLES.REGULAR);
					} else {
						$scope.setRole(idToken["cognito:roles"][0]);
					}

					$scope.reloadAttributes();
					// se ci sono oggetti nel carrelloCookies li riverso nel carrello utente e svuoto il carrelloCookies
					$scope.riversaCarrelloCookiesInUtente($scope.loginEmail);
					$scope.ricaricaListe($scope.loginEmail, "");

					//loggo informazioni sull'utente loggato
					//data, utente, classe, messaggio
					var dataLog = new Date();

					logService.saveLog(dataLog.toISOString(), $scope.loginEmail, "Utente correttamente loggato", "accessoController", LOG_TYPES.login).then(function (resLog) {
						console.log(resLog);
					}, function (reason) {
						console.log(reason);
					});

					loginService.setDeviceStatusNotRemembered().then(
						function (greeting) {
							console.log('Success: not remembered ' + greeting);
						}, function (reason) {
							logService.saveLog(dataLog.toISOString(), $scope.loginEmail, "accessoController - login - setDeviceStatusNotRemembered", "errore: " + reason.errorMessage, LOG_TYPES.error);
							console.log('Failed: ' + reason);
						});

					// salvo i dati di spedizione
					$scope.cambiaIndirizzoSpedizione($scope.nomeSpe, $scope.indSpe, $scope.cittaSpe, $scope.capSpe);
				});
			}, function (reason) {
				console.log(reason);
				var dataLog = new Date();
				if (reason.code == "NotAuthorizedException" || reason.code == "UserNotFoundException") {
					$scope.openMessageModal("Nome utente o password errati");
				} else {
					logService.saveLog(dataLog.toISOString(), email, "accessoController - login", "si è verificato un problema durante il login: " + reason.message, LOG_TYPES.error);
					//$scope.openMessageModal(reason.message);
					$scope.openMessageModal("Si &egrave; verificato un problema di connessione. Se il problema presiste, riprovare in un secondo momento. Grazie.");
				}
			}
		);
	};

	$scope.cambiaIndirizzoSpedizione = function (ns, i1s, cs, caps) {
		var attributeList = [];
		var attribute = {
			Name: 'custom:nomeSpe',
			Value: ns
		};
		attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
		attributeList.push(attribute);
		var attribute1 = {
			Name: 'custom:indSpe',
			Value: i1s
		};
		attribute1 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute1);
		attributeList.push(attribute1);
		var attribute3 = {
			Name: 'custom:cittaSpe',
			Value: cs
		};
		attribute3 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute3);
		attributeList.push(attribute3);
		var attribute4 = {
			Name: 'custom:capSpe',
			Value: caps
		};
		attribute4 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute4);
		attributeList.push(attribute4);
		loginService.updateAttributes(attributeList).then(
			function (res) {
				console.log(res);
				$scope.reloadAttributes(); 
				$scope.setPendingCheckout(false);
				$scope.changePath('/checkout');
				$scope.editDatiSpedizione = false;
			},
			function (reason) {
				console.log(reason);
			}
		);
	};

	$scope.isPasswordValid = function() {
		return $scope.passwordSign.length < 6 && $scope.passwordSign.length > 0;
	};

	$scope.isPasswordRepValid = function () {
		return $scope.passwordSignRep !== $scope.passwordSign && $scope.passwordSignRep.length > 0;
	};

	$scope.initCheckOut = function(){
		
		/*if($scope.getOrdineInCorso() == null || $scope.getOrdineInCorso() == undefined){
			$scope.openMessageModal("non ci sono ordini da processare");
			$scope.changePath('/preferiti');
		} else if($scope.getOrdineInCorso().configurazioni == undefined || $scope.getOrdineInCorso().configurazioni == null || $scope.getOrdineInCorso().configurazioni.length == 0){
			$scope.openMessageModal("l'ordine è vuoto");
			$scope.changePath('/preferiti');
		} else {
			$scope.ordine = $scope.getOrdineInCorso();
			$scope.subtotale = $scope.calcolaPrezzoOrdine($scope.ordine);
			$scope.costoSpedizione = $scope.getCostoSpedizione();
			$scope.totale = $scope.subtotale + $scope.costoSpedizione;
		}*/
	};

	$scope.inserisciIndirizzoSpedizione = function(){
		$scope.setPendingCheckout(true);
		$scope.changePath('/profilo');
	};

	$scope.getConfigurazioniOrdine = function(){
		if($scope.ordine != undefined && $scope.ordine != null){
			return $scope.ordine.configurazioni;
		} else {
			return [];
		}
	};

	$scope.getNomeECognome = function(){
		return $scope.getNomeSpe();
	};

	$scope.getIndirizzoSpedizione = function(){
		return $scope.getIndSpe();
	};

	$scope.getCittaSpedizione = function(){
		return $scope.getCittaSpe();
	};

	$scope.getCAPSpedizione = function(){
		return $scope.getCapSpe();
	};

	$scope.canBuy = function(){
		return $scope.getNomeSpe() != "" && $scope.getIndSpe() != "";
	};

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
					$scope.openMessageModal("C'è stato un problema nell aggiornamento dell'ordine");
				} else {
					console.log("Ordine aggiornato");
					$scope.setOrdineInCorso($scope.ordine);
				}
			},
			function (reason){
				console.log(reason);
				$scope.openMessageModal("errore salvataggio ordine");
			}
		);
	};

}]);
