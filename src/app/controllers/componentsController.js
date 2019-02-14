angular.module("applicationModule").controller("componentsController", ["$scope", "MAIL", "EMAIL_CONFIGURATION", "loginService", "listeService", "$location", "$uibModal", "$uibModalStack", "jwtHelper", function ($scope, MAIL, EMAIL_CONFIGURATION, loginService, listeService, $location, $uibModal, $uibModalStack, jwtHelper) {

	$scope.user = null;
	$scope.costoSpedizione = 19.50;

	$scope.testoAvviso = "";
	$scope.avvisoInputNome = "Dai un nome alla tua configurazione";
	$scope.vecchioNomeBorsa = "";
	$scope.modalInstance = null;

	$scope.loaderMessage = "";

	/* MAIL PER CLIENTE E ADMIN */
	$scope.emailMessage_cliente = "";
	$scope.emailMessage_admin = "";

	$scope.carrello = [];
	$scope.preferiti = [];
	$scope.ordineInCorso = null;
	$scope.preconfigurati = [];

	$scope.tempConfigurazione = null;

	$scope.email = "";
	$scope.tel = "";
	$scope.nome = "";
	$scope.cognome = "";
	$scope.indSpe = "";
	$scope.cittaSpe = "";
	$scope.capSpe = 0;
	$scope.indSpe2 = "";
	$scope.nomeSpe = "";

	$scope.changePasswordEmail = "";

	$scope.nextPath = "";

	$scope.pendingCheckout = false;

	$scope.cleanUser = function () {

		$scope.carrello = [];
		$scope.preferiti = [];
		$scope.ordineInCorso = null;
		$scope.preconfigurati = [];

		$scope.tempConfigurazione = null;

		$scope.email = "";
		$scope.tel = "";
		$scope.nome = "";
		$scope.cognome = "";
		$scope.indSpe = "";
		$scope.cittaSpe = "";
		$scope.capSpe = 0;
		$scope.indSpe2 = "";
		$scope.nomeSpe = "";

		$scope.nextPath = "";

	};

	$scope.setPendingCheckout = function(value){
		$scope.pendingCheckout = value;
	};

	$scope.setTestoAvviso = function (testo) {
		$scope.testoAvviso = testo;
	};

	$scope.getTestoAvviso = function () {
		return $scope.testoAvviso;
	};

	$scope.setLoaderMessage = function (message) {
		$scope.loaderMessage = message;
	};

	$scope.getLoaderMessage = function () {
		return $scope.loaderMessage;
	};

	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};

	$scope.setNextPath = function (nextPath) {
		$scope.nextPath = nextPath;
	};

	$scope.getNextPath = function () {
		return $scope.nextPath;
	};

	$scope.setOrdineInCorso = function (ordineInCorso) {
		$scope.ordineInCorso = ordineInCorso;
	};

	$scope.getOrdineInCorso = function () {
		return $scope.ordineInCorso;
	};

	$scope.setEmail = function (email) {
		$scope.email = email;
	};

	$scope.getEmail = function () {
		return $scope.email;
	};

	$scope.setTel = function (tel) {
		$scope.tel = tel;
	};

	$scope.getTel = function () {
		return $scope.tel;
	};

	$scope.setNome = function (nome) {
		$scope.nome = nome;
	};

	$scope.getNome = function () {
		return $scope.nome;
	};

	$scope.setCognome = function (cognome) {
		$scope.cognome = tel;
	};

	$scope.getCognome = function () {
		return $scope.cognome;
	};

	$scope.setIndSpe = function (indSpe) {
		$scope.indSpe = indSpe;
	};

	$scope.getIndSpe = function () {
		return $scope.indSpe;
	};

	$scope.setCittaSpe = function (cittaSpe) {
		$scope.cittaSpe = cittaSpe;
	};

	$scope.getCittaSpe = function () {
		return $scope.cittaSpe;
	};

	$scope.setCapSpe = function (capSpe) {
		$scope.capSpe = capSpe;
	};

	$scope.getCapSpe = function () {
		return $scope.capSpe;
	};

	$scope.setNomeSpe = function (nomeSpe) {
		$scope.nomeSpe = nomeSpe;
	};

	$scope.getNomeSpe = function () {
		return $scope.nomeSpe;
	};

	$scope.setIndSpe2 = function (indSpe2) {
		$scope.indSpe2 = indSpe2;
	};

	$scope.getIndSpe2 = function () {
		return $scope.indSpe2;
	};

	$scope.getChangePasswordEmail = function(){
		return $scope.changePasswordEmail;
	}

	$scope.setChangePasswordEmail = function(changePasswordEmail){
		$scope.changePasswordEmail = changePasswordEmail;
	}

	$scope.setTempConfigurazione = function (configurazione) {
		$scope.tempConfigurazione = configurazione;
	};

	$scope.getTempConfigurazione = function () {
		return $scope.tempConfigurazione;
	};

	$scope.getCarrello = function () {
		return $scope.carrello;
	};

	$scope.initCarrello = function (carrello) {
		$scope.carrello = carrello;
	};

	$scope.addToCarrello = function (oggetto) {
		$scope.carrello.push(oggetto);
	};

	$scope.getCarrelloSize = function () {
		if ($scope.carrello == undefined) {
			return 0;
		}
		return $scope.carrello.length;
	};

	$scope.getPreconfigurati = function () {
		return $scope.preconfigurati;
	};

	$scope.getPreferiti = function () {
		return $scope.preferiti;
	};

	$scope.initPreferiti = function (preferiti) {
		$scope.preferiti = preferiti;
	};

	$scope.addToPreferiti = function (oggetto) {
		//devo controllare se c'è già tra i preferiti (mentre nel carrello comunque aggiungo)
		$scope.preferiti.push(oggetto);
	};

	$scope.getPreferitiSize = function () {
		if ($scope.preferiti == undefined) {
			return 0;
		}
		return $scope.preferiti.length;
	};

	$scope.setUser = function (t) {
		$scope.user = t;
	};

	$scope.getUser = function () {
		return $scope.user;
	};

	$scope.logOut = function () {
		$scope.setUser(null);
		$scope.cleanUser();
		loginService.logOut();
		$location.url('/home');
	};

	$scope.getCostoSpedizione = function () {
		return $scope.costoSpedizione;
	};

	$scope.getColoreConf = function (configurazione) {
		var colore = "black";
		var numeroEntita = configurazione.elencoEntita.length;
		for (var i = 0; i < numeroEntita; i++) {
			var entita = configurazione.elencoEntita[i];
			if (entita.categoria == "colore") {
				colore = entita.colore;
			}
		}
		return colore;
	};

	$scope.getInizialiConf = function (configurazione) {
		var iniziali = "";
		var numeroEntita = configurazione.elencoEntita.length;
		for (var i = 0; i < numeroEntita; i++) {
			var entita = configurazione.elencoEntita[i];
			if (entita.categoria == "iniziali") {
				iniziali += entita.nome;
			}
		}
		return iniziali;
	};

	$scope.calcolaPrezzo = function (configurazione) {
		var prezzoCalcolato = 0;
		var numeroEntita = configurazione.elencoEntita.length;
		for (var i = 0; i < numeroEntita; i++) {
			var entita = configurazione.elencoEntita[i];
			prezzoCalcolato += entita.prezzo;
		}
		return prezzoCalcolato;
	};

	$scope.calcolaPrezzoOrdine = function (ordine) {
		var configurazioni = ordine.configurazioni;
		var totale = 0;
		for (var i = 0; i < configurazioni.length; i++) {
			var configurazione = configurazioni[i];
			totale += $scope.calcolaPrezzo(configurazione);
		}
		return totale;
	};

	$scope.ricaricaListe = function (email, page, showLoader) {
		// if(showLoader){
		// 	$scope.setLoaderMessage("ricarico la lista...");
		// 	$scope.showLoader();
		// }
		$scope.setLoaderMessage("ricarico la lista...");
		$scope.showLoader();
		listeService.getConfigurazioniUtente(email).then(function (data) {
			$scope.preferiti = data.data.configurazioni;
			$scope.hideLoader();
			var tempCarrello = [];
			for (var i = 0; i < $scope.preferiti.length; i++) {
				if ($scope.preferiti[i].carrello) {
					tempCarrello.push($scope.preferiti[i]);
				}
			}
			$scope.carrello = tempCarrello;
			if (page != null && page != undefined && page != "") {
				$scope.changePath(page);
			}
		});
	};

	$scope.caricaListePreconfigurati = function (email, page, showLoader) {
		listeService.getConfigurazioniPreconfigurate().then(function (data) {
			$scope.preconfigurati = data.data.configurazioni;
		});
	};

	$scope.getUserEmail = function () {
		var user = $scope.user;
		var idToken = jwtHelper.decodeToken(user.signInUserSession.idToken.jwtToken);
		var email = idToken.email;
		return email;
	};

	$scope.getAdminEmail = function () {
		return EMAIL_CONFIGURATION.adminEmailAddress;
	};

	$scope.reloadAttributes = function () {
		loginService.getUserAttributes().then(
			function (attList) {
				console.log(attList);
				attList.forEach(function (a) {
					if (a.Name == "custom:email") {
						$scope.email = a.Value;
					}
					if (a.Name == "custom:telefono") {
						$scope.tel = a.Value;
					}
					if (a.Name == "name") {
						$scope.nome = a.Value;
					}
					if (a.Name == "family_name") {
						$scope.cognome = a.Value;
					}
					if (a.Name == "custom:indSpe") {
						$scope.indSpe = a.Value;
					}
					if (a.Name == "custom:cittaSpe") {
						$scope.cittaSpe = a.Value;
					}
					if (a.Name == "custom:capSpe") {
						$scope.capSpe = a.Value;
					}
					if (a.Name == "custom:nomeSpe") {
						$scope.nomeSpe = a.Value;
					}
					if (a.Name == "custom:indSpe2") {
						$scope.indSpe2 = a.Value;
					}
				});
			},
			function (reason) {
				console.log(reason);
			}
		);
	};

	$scope.completaOperazioniOrdneAcquistato = function () {
		//aggiorno l'ordine su DB e poi lo elimino da locale
		$scope.ordineInCorso.pagato = true;
		$scope.ordineInCorso.stato = 1;

		listeService.putOrdine($scope.ordineInCorso).then(
			function (res) {
				console.log(res);
				if (res.errorMessage != null && res.errorMessage != "") {
					//ho un errore
					console.log(res.errorMessage);
					$scope.openMessageModal("C'è stato un problema nel salvataggio dell'ordine");
				} else {
					$scope.openMessageModal("Grazie per il tuo acquisto su Anna Cloud. Riceverai a breve una email di conferma.");
					//preparo l'invio delle mail
					$scope.ordineInCorso.codice = res.data.codiceConfigurazioneRisposta;
					$scope.generateMessageText();
					var clientMessage = $scope.generateEmailMessage_client();
					var adminMessage = $scope.generateEmailMessage_admin();
					//var mailMessage = $scope.generateEmailMessage($scope.ordineInCorso);
					listeService.sendEmail(clientMessage).then(
						function (res2) {
							if (res2.errorMessage != null && res2.errorMessage != "") {
								console.log(res2.errorMessage);
								$scope.openMessageModal("C'è stato un problema nell'invio della mail di riepilogo al cliente, contattare l'amministratore");
							} else {

								listeService.sendEmail(adminMessage).then(
									function (res2) {
										if (res2.errorMessage != null && res2.errorMessage != "") {
											console.log(res2.errorMessage);
											$scope.openMessageModal("C'è stato un problema nell'invio della mail di riepilogo all'admin, contattare l'amministratore");
										} else {
											$scope.ordineInCorso = null;
											$scope.changePath('/ordini');
										}
									}
								);
							}
						}
					);
				}
			},
			function (reason) {
				console.log(reason);
				$scope.openMessageModal("errore salvataggio ordine");
			}
		);
	};

	$scope.generateEmailMessage = function () {
		var message = {};

		message.toEmailAddress = [$scope.getUserEmail()];
		message.ccEmailAddress = [];
		message.emailSubject = "Annacloud - Riepilogo Ordine " + $scope.ordineInCorso.codice;
		message.emailMessage = $scope.generateMessageText();

		return message;
	};

	$scope.generateEmailMessage_client = function () {
		var message = {};

		message.toEmailAddress = [$scope.getUserEmail()];
		message.ccEmailAddress = [];
		message.emailSubject = "Annacloud - Riepilogo Ordine " + $scope.ordineInCorso.codice;
		message.emailMessage = $scope.emailMessage_cliente;

		return message;
	};

	$scope.generateEmailMessage_admin = function () {
		var message = {};

		message.toEmailAddress = [$scope.getAdminEmail()];
		message.ccEmailAddress = [];
		message.emailSubject = "Annacloud - Riepilogo Ordine " + $scope.ordineInCorso.codice;
		message.emailMessage = $scope.emailMessage_admin;

		return message;
	};

	$scope.generateMessageText = function () {
		var message = MAIL.ORDER_MAIL_BASE_TEMPLATE;

		message = message.replace("CODICE_ORDINE", $scope.ordineInCorso.codice);//CODICE_ORDINE
		//genero l'elenco delle congurazioni
		var confMessageParts = "";
		for (var i = 0; i < $scope.ordineInCorso.configurazioni.length; i++) {
			var configurazione = $scope.ordineInCorso.configurazioni[i];

			var configMessagePart = MAIL.ORDER_MAIL_CONFIGURATION_TEMPLATE;

			configMessagePart = configMessagePart.replace("CONF_NAME", configurazione.nome);
			configMessagePart = configMessagePart.replace("CONF_IMAGE", configurazione.thumbnail);
			//
			var elencoEntitaPartMessage = "";
			for (var j = 0; j < configurazione.elencoEntita.length; j++) {
				entita = configurazione.elencoEntita[j];

				var entitaMessagePart = MAIL.ORDER_MAIL_ENTITA_TEMPLATE;

				entitaMessagePart = entitaMessagePart.replace('ENTITA_NOME', entita.categoria);
				entitaMessagePart = entitaMessagePart.replace('ENTITA_VALORE', $scope.traduciNomiOrdini(entita));

				elencoEntitaPartMessage += entitaMessagePart;
			}

			configMessagePart = configMessagePart.replace("ELENCO_ENTITA", elencoEntitaPartMessage);
			confMessageParts += configMessagePart;
		}
		message = message.replace("ELENCO_CONFIGURAZIONI", confMessageParts);

		var adminMessage = message;
		message = message.replace("DATI_CLIENTE", "");//il messaggio del cliente non deve contenere queste informazioni

		//genero la parte relativa ai dati del cliente
		var datiClienteMessagePart = MAIL.ORDER_MAIL_DATI_CLIENTE_TEMPLATE;

		datiClienteMessagePart = datiClienteMessagePart.replace("CLIENTE_NOME", $scope.nomeSpe);
		datiClienteMessagePart = datiClienteMessagePart.replace("CLIENTE_EMAIL", $scope.getUserEmail());
		datiClienteMessagePart = datiClienteMessagePart.replace("CLIENTE_TELEFONO", $scope.tel);
		datiClienteMessagePart = datiClienteMessagePart.replace("CLIENTE_NOME_SPEDIZIONE", $scope.nomeSpe);
		datiClienteMessagePart = datiClienteMessagePart.replace("CLIENTE_INDIRIZZO_SPEDIZIONE", $scope.indSpe);
		datiClienteMessagePart = datiClienteMessagePart.replace("CLIENTE_CAP_SPEDIZIONE", $scope.capSpe);
		datiClienteMessagePart = datiClienteMessagePart.replace("CLIENTE_CITTA_SPEDIZIONE", $scope.cittaSpe);

		adminMessage = adminMessage.replace("DATI_CLIENTE", datiClienteMessagePart);

		$scope.emailMessage_cliente = message;
		$scope.emailMessage_admin = adminMessage;
	};

	loginService.getCurrentUser().then(function (data) {
		$scope.setUser(data);
		if (data != null) {
			if (data.signInUserSession != null) {
				var idToken = jwtHelper.decodeToken(data.signInUserSession.idToken.jwtToken);
				var email = idToken.email;
				$scope.ricaricaListe(email, "", true);
				//tiro giu' anche gli attributi dell'utente
				loginService.getUserAttributes().then(
					function (attList) {
						console.log(attList);
						attList.forEach(function (a) {
							if (a.Name == "custom:email") {
								$scope.email = a.Value;
							}
							if (a.Name == "custom:telefono") {
								$scope.tel = a.Value;
							}
							if (a.Name == "name") {
								$scope.nome = a.Value;
							}
							if (a.Name == "family_name") {
								$scope.cognome = a.Value;
							}
							if (a.Name == "custom:indSpe") {
								$scope.indSpe = a.Value;
							}
							if (a.Name == "custom:cittaSpe") {
								$scope.cittaSpe = a.Value;
							}
							if (a.Name == "custom:capSpe") {
								$scope.capSpe = a.Value;
							}
							if (a.Name == "custom:nomeSpe") {
								$scope.nomeSpe = a.Value;
							}
							if (a.Name == "custom:indSpe2") {
								$scope.indSpe2 = a.Value;
							}
						});
					},
					function (reason) {
						console.log(reason);
					}
				);
			}
		}

		console.log("l'utente è " + data);
		console.log(data);
	},
		function (reason) {
			console.log('reason');
		}
	);

	$scope.svuotaCarrello = function (ordine) {

		console.log("sto per svuotare il carrello");
		//ottenfo la lista dei codici delle configurazioni
		var listaCodici = $scope.getListaCodiciConfigurazioni(ordine);
		listeService.svuotaCarrello(listaCodici).then(
			function (res) {
				console.log("carrello svuotato, ricarico le liste");
				$scope.ricaricaListe($scope.getUserEmail(), "", true);
			},
			function (reason) {
				console.log(reason);
				$scope.openMessageModal("errore salvataggio ordine");
			}
		);
	};

	$scope.getListaCodiciConfigurazioni = function (ordine) {

		var codici = [];

		var configurazioni = ordine.configurazioni;
		for (var i = 0; i < configurazioni.length; i++) {
			var configurazione = configurazioni[i];
			if (configurazione.codice != null) {
				codici.push(configurazione.codice);
			}
		}

		return codici;
	};

	$scope.hideElement = function () {
		return $location.path().indexOf("configura") != -1 || $location.path().indexOf("admin-ordini") != -1 || $location.path().indexOf("admin-clienti") != -1;
	};

	$scope.wowInit = function (config) {
		$scope.caricaListePreconfigurati();
		if (config) {
			new WOW(config).init();
		} else {
			new WOW().init();
		}
	};

	$scope.changePath = function (path) {
		$location.url(path);
		$scope.$apply();
	};

	$scope.traduciCategoriaAccessorio = function (nomeAccessorio) {
		if (nomeAccessorio == "ciondoli") {
			return "charms";
		}
		return nomeAccessorio;
	};

	$scope.getModelSizes = function (modelName) {
		if (modelName == "shoulderbag") {
			return "30X28";
		} else if (modelName == "tote") {
			return "35X30";
		} else if (modelName == "crossbody") {
			return "24X15";
		} else {
			return "";
		}
	};

	$scope.salvaOAcquista = function(oldname, isAcquista){
		if(!isAcquista || $scope.getTempConfigurazione().nome == ""){
			$scope.openConfigNameModal(oldname);
		} else {
			$scope.okConfig($scope.getTempConfigurazione().nome, false);
		}
	};

	/* **************************** */
	/* GESTIONE EVENTI IN BROADCAST */
	/* **************************** */
	$scope.$on("openMessageModal",function(event, data){
		$scope.openMessageModal(data);
	});

	/* *************** */
	/* GESTIONE MODALI */
	/* *************** */


	$scope.openInsertEmailForPasswordChange = function(){
		$scope.modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'views/modalePerEmailCambioPassword.html',
			scope: $scope
		});
	}

	$scope.okEmail = function(email){
		$scope.setChangePasswordEmail(email);
		$uibModalStack.dismissAll();
		$scope.changePath('/cambio-password');
	}

	$scope.cancelEmail = function(){
		$uibModalStack.dismissAll();
	}

	$scope.openConfigNameModal = function (oldName) {
		if (oldName != undefined && oldName != "") {
			$scope.avvisoInputNome = "Aggiorna il nome della borsa";
			$scope.vecchioNomeBorsa = oldName;
		}

		$scope.modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'views/modaleNomeConfigurazione.html',
			scope: $scope
		});
	};

	$scope.openConfigNameModalNamePresent = function () {
		$scope.modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'views/modaleNomeConfigurazione_nomePresente.html',
			scope: $scope
		});
	};

	$scope.openMessageModal = function (message) {
		$scope.setTestoAvviso(message);
		$scope.modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'views/modaleAvviso.html',
			scope: $scope,
			resolve: {
				testoAvviso: function () {
					return $scope.testoAvviso;
				}
			}
		});
	};

	$scope.openSchedaOrdine = function () {
		$scope.modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'views/modaleSchedaOrdine.html',
			scope: $scope,
			resolve: {
				testoAvviso: function () {
					return $scope.testoAvviso;
				}
			}
		});
	};
	$scope.openSchedaCliente = function () {
		$scope.modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'views/modaleSchedaCliente.html',
			scope: $scope,
			resolve: {
				testoAvviso: function () {
					return $scope.testoAvviso;
				}
			}
		});
	};
	$scope.openOrdiniCliente = function () {
		$scope.modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'views/modaleOrdiniCliente.html',
			scope: $scope,
			resolve: {
				testoAvviso: function () {
					return $scope.testoAvviso;
				}
			}
		});
	};

	$scope.okConfig = function (configName) {
		//controllo se il nome esiste già tra le configurazioni (preferiti)
		var presente = false;
		for (var i = 0; i < $scope.preferiti.length; i++) {
			var configurazione = $scope.preferiti[i];
			if(configurazione.nome === configName){
				presente = true || presente;
			}
		}
		if(presente){
			$uibModalStack.dismissAll();
			$scope.openConfigNameModalNamePresent();
		} else {
			$scope.getTempConfigurazione().nome = configName;

			$scope.setLoaderMessage("salvo la configurzione '" + configName + "' creata...");
			$scope.showLoader();

			listeService.putConfigurazione($scope.getTempConfigurazione()).then(
				function (res) {
					console.log(res);
					$scope.getTempConfigurazione().codice = res.data.codiceConfigurazioneRisposta;
					//$scope.addToPreferiti($scope.getTempConfigurazione());//aggiunge ai preferiti locali
					$scope.ricaricaListe($scope.getUserEmail(), "", true);
					$scope.hideLoader();
					if ($scope.getTempConfigurazione().carrello) {
						//$scope.addToCarrello($scope.getTempConfigurazione());//aggiunge ai preferiti locali
						$scope.changePath('/carrello');
					}

				},
				function (reason) {
					console.log(reason);
					$scope.hideLoader();
					$scope.openMessageModal("errore aggiunta preferiti");
				}
			);
			$uibModalStack.dismissAll();
		}

		
		//$scope.modalInstance.close();
	};

	$scope.cancelConfig = function () {
		$uibModalStack.dismissAll();
	};

	$scope.ok = function () {
		$uibModalStack.dismissAll();
	};

	/* ********************** */
	/* FUNZIONI DI TRADUZIONE */
	/* ********************** */

	$scope.traduciNomiInterfaccia = function (entita) {
		if (entita) {
			if (entita.categoria != "" && entita.nome != "") {
				var resutl = "";
				switch (entita.categoria) {
					case "ciondoli":
						var temp = entita.nome.toLowerCase();
						var splitted = temp.split("_");
						if (splitted.length == 5) {
							result = splitted[3];
						} else if (splitted.length == 6) {
							result = splitted[3] + "-" + splitted[4];
						} else if (splitted.length == 7) {
							result = splitted[3] + "-" + splitted[4] + "-" + splitted[5];
						} else {
							result = entita.nome;
						}
						break;
					case "tracolle":
						temp = entita.nome.toLowerCase();
						splitted = temp.split("_");
						if (splitted.length == 5) {
							result = splitted[3];
						} else if (splitted.length == 6) {
							result = splitted[3] + "-" + splitted[4];
						} else {
							result = entita.nome;
						}
						break;
					case "colore":
						splitted = entita.nome.split("_");
						if (splitted.length == 2) {
							result = splitted[1];
						} else {
							result = entita.nome;
						}
						break;
					default:
						result = "";
						break;
				}
				return result;
			} else return "";
		} else return "";
	};

	$scope.traduciNomiOrdini = function (entita) {
		if (entita) {
			if (entita.categoria != "" && entita.nome != "") {
				var resutl = "";
				switch (entita.categoria) {
					case "modello":
						result = entita.nome;
						break;
					case "ciondoli":
						var temp = entita.nome.toLowerCase();
						var splitted = temp.split("_");
						if (splitted.length == 5) {
							result = splitted[1] + " " + splitted[3];
						} else if (splitted.length == 6) {
							result = splitted[1] + " " + splitted[3] + " " + splitted[4];
						} else if (splitted.length == 7) {
							result = splitted[1] + " " + splitted[3] + " " + splitted[4] + " " + splitted[5];
						} else {
							result = entita.nome;
						}
						break;
					case "tracolle":
						temp = entita.nome.toLowerCase();
						splitted = temp.split("_");
						if (splitted.length == 5) {
							result = splitted[1] + " " + splitted[3];
						} else if (splitted.length == 6) {
							result = splitted[1] + " " + splitted[3] + " " + splitted[4];
						} else {
							result = entita.nome;
						}
						break;
					case "colore":
						splitted = entita.nome.split("_");
						if (splitted.length == 2) {
							result = splitted[1];
						} else {
							result = entita.nome;
						}
						break;
					case "metalleria":
						splitted = entita.nome.split("_");
						if (splitted.length == 2) {
							result = splitted[1];
						} else {
							result = entita.nome;
						}
						break;
					case "stile":
						splitted = entita.nome.split("_");
						if (splitted.length == 3) {
							result = splitted[2];
						} else {
							result = entita.nome;
						}
						break;
					case "borchie":
						splitted = entita.nome.split("_");
						if (splitted.length == 3) {
							result = splitted[2];
						} else if (splitted.length == 4) {
							result = splitted[2] + " " + splitted[3];
						} else {
							result = entita.nome;
						}
						break;
					case "iniziali":
						splitted = entita.nome.split("_");
						if (splitted.length == 2) {
							result = splitted[1];
						} else {
							result = entita.nome;
						}
						break;
					default:
						result = "";
						break;
				}
				return result;
			} else return "";
		} else return "";
	};

	$scope.getFigurino = function (nomeModello) {
		var figurino = "";
		if (nomeModello) {
			switch (nomeModello) {
				case "shoulderbag":
					figurino = "images/figurino-shoulderbag.jpg";
					break;
				case "tote":
					figurino = "images/figurino-tote.jpg";
					break;
				case "crossbody":
					figurino = "images/figurino-crossbody.jpg";
					break;
			}
		}
		return figurino;

	};

	/* ************************ */
	/* FUNZIONI GESTIONE LOADER */
	/* ************************ */
	$scope.showLoader = function () {
		$('#loaderOverlay')[0].style.visibility = 'visible';
	};

	$scope.hideLoader = function () {
		$('#loaderOverlay')[0].style.visibility = 'hidden';
	};

}]);
