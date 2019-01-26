angular.module("applicationModule").controller("componentsController", ["$scope", "MAIL", "loginService", "listeService", "$location", "$uibModal", "$uibModalStack", "jwtHelper",  function($scope, MAIL, loginService, listeService, $location, $uibModal, $uibModalStack, jwtHelper) {

	$scope.user = null;
	$scope.costoSpedizione = 19.50;

	$scope.testoAvviso = "";
	$scope.avvisoInputNome = "Dai un nome alla tua configurazione";
	$scope.vecchioNomeBorsa = "";
	$scope.modalInstance = null;

	$scope.loaderMessage = "";

	$scope.orderBaseMessage = "<html>"+
	"<head>"+
		"<title>Anna Cloud</title>"+
		"<style>"+
			"@font-face {"+
				"font-family: 'Montserrat';"+
				"font-style: normal;"+
				"font-weight: 400;"+
				"src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2) format('woff2');"+
				"unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;"+
			"}"+
			"@font-face {"+
				"font-family: 'Montserrat';"+
				"font-style: normal;"+
				"font-weight: 700;"+
				"src: local('Montserat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/montserrat/v12/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2) format('woff2');"+
				"unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;"+
			"}"+
			"body {"+
				"font-family: 'Lato', 'Lucida Grande', 'Lucida Sans Unicode', Tahoma, Sans-Serif;"+
			"}"+
			"table {"+
				"padding: 0;"+
				"margin: 0;"+
				"border-collapse: collapse;"+
			"}"+
			"td {"+
				"vertical-align: top;"+
				"margin: 0;"+
				"padding: 0;"+
			"}"+
			"h2, h3, h4, h5, p {"+
				"margin: 0;"+
				"padding: 0;"+
			"}"+
		"</style>"+
	"</head>"+
	"<body ng-app='applicationModule' class='ng-scope' ng-cloak>"+
		"<table style='min-width: 500px;'>"+
			"<tr>"+
				"<td colspan='2'>"+
					"<h2 style='padding-bottom: 10px;'>Ordine n° CODICE_ORDINE</h2>"+
				"</td>"+
			"</tr>"+
			"ELENCO_CONF"+
		"</table>"+
	"</body>"+
	"</html>";

	$scope.configurationPartMessage = "<tr>"+
			"<td style='width: 10px'><img style='width: 150px; height: auto; border:solid 1px #eee; margin-right: 10px' src='CONF_IMAGE'></td>"+ 
				"<td>"+
					"<h3 style='padding-bottom: 10px; text-transform:initial'>CONF_NAME</h3>"+
					"<table style='width: 100%;'>"+
						"<tr>"+
							"<td>"+
								"<h4 style='padding-bottom: 10px;'>Base</h4>"+
							"</td>"+
							"<td>"+
								"<h4 style='padding-bottom: 10px;'>Accessori</h4>"+
							"</td>"+
						"</tr>"+
						"ELENCO_ENTITA"+
					"</table>"+
				"</td>"+
			"</tr>";

	$scope.entitaPartMessage = "<tr><td style='width: 50%'>"+
									"<p>CONF_ENTITA_NOME:</p>"+
								"</td>"+
								"<td style='width: 50%'>"+
									"<p>CONF_ENTITA_VALORE</p>"+
								"</td></tr>";

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
	$scope.capSpe = "";
	$scope.indSpe2 = "";
	$scope.nomeSpe = "";

	$scope.nextPath = "";

	$scope.setTestoAvviso = function(testo) {
		$scope.testoAvviso = testo;
	};

	$scope.getTestoAvviso = function(){
		return $scope.testoAvviso;
	};

	$scope.setLoaderMessage = function(message){
		$scope.loaderMessage = message;
	};

	$scope.getLoaderMessage = function(){
		return $scope.loaderMessage;
	};

	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};

	$scope.setNextPath = function(nextPath){
		$scope.nextPath = nextPath;
	};

	$scope.getNextPath = function(){
		return $scope.nextPath;
	};

	$scope.setOrdineInCorso = function(ordineInCorso){
		$scope.ordineInCorso = ordineInCorso;
	};

	$scope.getOrdineInCorso = function(){
		return $scope.ordineInCorso;
	};

	$scope.setEmail = function(email){
		$scope.email = email;
	};

	$scope.getEmail = function(){
		return $scope.email;
	};

	$scope.setTel = function(tel){
		$scope.tel = tel;
	};

	$scope.getTel = function(){
		return $scope.tel;
	};

	$scope.setNome = function(nome){
		$scope.nome = nome;
	};

	$scope.getNome = function(){
		return $scope.nome;
	};

	$scope.setCognome = function(cognome){
		$scope.cognome = tel;
	};

	$scope.getCognome = function(){
		return $scope.cognome;
	};

	$scope.setIndSpe = function(indSpe){
		$scope.indSpe = indSpe;
	};

	$scope.getIndSpe = function(){
		return $scope.indSpe;
	};

	$scope.setCittaSpe = function(cittaSpe){
		$scope.cittaSpe = cittaSpe;
	};

	$scope.getCittaSpe = function(){
		return $scope.cittaSpe;
	};

	$scope.setCapSpe = function(capSpe){
		$scope.capSpe = capSpe;
	};

	$scope.getCapSpe = function(){
		return $scope.capSpe;
	};

	$scope.setNomeSpe = function(nomeSpe){
		$scope.nomeSpe = nomeSpe;
	};

	$scope.getNomeSpe = function(){
		return $scope.nomeSpe;
	};

	$scope.setIndSpe2 = function(indSpe2){
		$scope.indSpe2 = indSpe2;
	};

	$scope.getIndSpe2 = function(){
		return $scope.indSpe2;
	};

	$scope.setTempConfigurazione = function(configurazione){
		$scope.tempConfigurazione = configurazione;
	};

	$scope.getTempConfigurazione = function(){
		return $scope.tempConfigurazione;
	};

	$scope.getCarrello = function(){
		return $scope.carrello;
	};

	$scope.initCarrello = function(carrello){
		$scope.carrello = carrello;
	};

	$scope.addToCarrello = function(oggetto){
		$scope.carrello.push(oggetto);
	};

	$scope.getCarrelloSize = function(){
		if($scope.carrello == undefined){
			return 0;
		}
		return $scope.carrello.length;
	};

	$scope.getPreconfigurati = function(){
		return $scope.preconfigurati;
	};

	$scope.getPreferiti = function(){
		return $scope.preferiti;
	};

	$scope.initPreferiti = function(preferiti){
		$scope.preferiti = preferiti;
	};

	$scope.addToPreferiti = function(oggetto){
		//devo controllare se c'è già tra i preferiti (mentre nel carrello comunque aggiungo)
		$scope.preferiti.push(oggetto);
	};

	$scope.getPreferitiSize = function(){
		if($scope.preferiti == undefined){
			return 0;
		}
		return $scope.preferiti.length;
	};

	$scope.setUser = function(t){
		$scope.user = t;
	};
	
	$scope.getUser = function(){
		return $scope.user;
	};
	
	$scope.logOut = function (){
		$scope.setUser(null);
		$scope.initPreferiti([]);
		$scope.initCarrello([]);
		$scope.setTempConfigurazione(null);
		loginService.logOut();
		$location.url('/home');
	};
	
	$scope.getCostoSpedizione = function(){
		return $scope.costoSpedizione;
	};

	$scope.getColoreConf = function(configurazione){
		var colore = "black";
		var numeroEntita = configurazione.elencoEntita.length;
		for(var i = 0; i < numeroEntita; i++){
			var entita = configurazione.elencoEntita[i];
			if(entita.categoria == "colore"){
				colore = entita.colore;
			}
		}
		return colore;
	};

	$scope.getInizialiConf = function(configurazione){
		var iniziali = "";
		var numeroEntita = configurazione.elencoEntita.length;
		for(var i = 0; i < numeroEntita; i++){
			var entita = configurazione.elencoEntita[i];
			if(entita.categoria == "iniziali"){
				iniziali += entita.nome;
			}
		}
		return iniziali;
	};

	$scope.calcolaPrezzo = function(configurazione){
		var prezzoCalcolato = 0;
		var numeroEntita = configurazione.elencoEntita.length;
		for(var i = 0; i < numeroEntita; i++){
			var entita = configurazione.elencoEntita[i];
			prezzoCalcolato += entita.prezzo;
		}
		return prezzoCalcolato;
	};

	$scope.calcolaPrezzoOrdine = function(ordine){
		var configurazioni = ordine.configurazioni;
		var totale = 0;
		for(var i = 0; i < configurazioni.length; i++){
			var configurazione = configurazioni[i];
			totale += $scope.calcolaPrezzo(configurazione);
		}
		return totale;
	};

	$scope.ricaricaListe = function(email, page, showLoader){
		// if(showLoader){
		// 	$scope.setLoaderMessage("ricarico la lista...");
		// 	$scope.showLoader();
		// }
		$scope.setLoaderMessage("ricarico la lista...");
		$scope.showLoader();
		listeService.getConfigurazioniUtente(email).then(function(data){
			$scope.preferiti = data.data.configurazioni;
			$scope.hideLoader();
			var tempCarrello = [];
			for(var i = 0; i < $scope.preferiti.length; i++){
				if($scope.preferiti[i].carrello){
					tempCarrello.push($scope.preferiti[i]);
				}
			}
			$scope.carrello = tempCarrello;
			if(page != null && page != undefined && page != ""){
				$scope.changePath(page);
			}
		});
	};

	$scope.caricaListePreconfigurati = function(email, page, showLoader){
		listeService.getConfigurazioniPreconfigurate().then(function(data){
			$scope.preconfigurati = data.data.configurazioni;
		});
	};

	$scope.getUserEmail = function(){
		var user = $scope.user;
		var idToken = jwtHelper.decodeToken(user.signInUserSession.idToken.jwtToken);
		var email = idToken.email;
		return email;
	};

	// $scope.loginAndMove = function(username, password, nextPath){
	// 	loginService.login(email, password).then(
	// 		function(data){
	// 			console.log(data);
	// 			loginService.getCurrentUser().then (function (data){
	// 				console.log(data);
	// 				var user = data;
	// 				var idToken = jwtHelper.decodeToken(data.signInUserSession.idToken.jwtToken);
	// 				var tokenEmail = idToken.email;
	// 				$scope.ricaricaListe(tokenEmail);
	// 				user.eMail = tokenEmail;
	// 				$scope.setUser(data);
	// 				if ($scope.remember.value == true){
	// 					loginService.setDeviceStatusRemembered().then(
	// 							function(greeting) {
	// 								console.log('Success: remembered ' + greeting);
	// 							}, function(reason) {
	// 								console.log('Failed: ' + reason);
	// 							});
	// 				}else{
	// 					loginService.setDeviceStatusNotRemembered().then(
	// 							function(greeting) {
	// 								console.log('Success: not remembered ' + greeting);
	// 							}, function(reason) {
	// 								console.log('Failed: ' + reason);
	// 							});
	// 				}
	// 				$scope.reloadAttributes();

	// 			});

	// 			if(nextPath == null || nextPath == ""){
	// 				$scope.changePath('/home');
	// 			} else {
	// 				$scope.changePath(nextPath);
	// 			}
	// 		}, function(reason) {
	// 			  console.log( reason);
	// 			  $scope.openMessageModal(reason.message);
	// 		}
	// 	);
	// };

	$scope.reloadAttributes = function(){
		loginService.getUserAttributes().then(
			function (attList){
				console.log(attList);
				attList.forEach(function (a){
					if (a.Name == "custom:email" ){
						$scope.email = a.Value;
					}
					if (a.Name == "custom:telefono" ){
						$scope.tel = a.Value;
					}
					if (a.Name == "name" ){
						$scope.nome = a.Value;
					}
					if (a.Name == "family_name" ){
						$scope.cognome = a.Value;
					}
					if (a.Name == "custom:indSpe" ){
						$scope.indSpe = a.Value;
					}
					if (a.Name == "custom:cittaSpe" ){
						$scope.cittaSpe = a.Value;
					}
					if (a.Name == "custom:capSpe" ){
						$scope.capSpe = a.Value;
					}
					if (a.Name == "custom:nomeSpe" ){
						$scope.nomeSpe = a.Value;
					}
					if (a.Name == "custom:indSpe2" ){
						$scope.indSpe2 = a.Value;
					}
				});
			},
			function (reason){
				console.log(reason);
			}
		);
	};

	$scope.completaOperazioniOrdneAcquistato = function(){
		//aggiorno l'ordine su DB e poi lo elimino da locale
		$scope.ordineInCorso.pagato = true;
		$scope.ordineInCorso.stato = 1;

		listeService.putOrdine($scope.ordineInCorso).then(
			function (res){
				console.log(res);
				if(res.errorMessage != null && res.errorMessage != ""){
					//ho un errore
					console.log(res.errorMessage);
					$scope.openMessageModal("C'è stato un problema nel salvataggio dell'ordine");
				} else {
					$scope.openMessageModal("Grazie per il tuo acquisto su Anna Cloud. Riceverai a breve una email di conferma.");
					//preparo l'invio delle mail
					$scope.ordineInCorso.codice = res.data.codiceConfigurazioneRisposta;
					var mailMessage = $scope.generateEmailMessage($scope.ordineInCorso);
					listeService.sendEmail(mailMessage).then(
						function(res2){
							if(res2.errorMessage != null && res2.errorMessage != ""){
								console.log(res2.errorMessage);
								$scope.openMessageModal("C'è stato un problema nell'invio della mail di riepilogo, contattare l'amministratore");
							} else {
								$scope.ordineInCorso = null;
								$scope.changePath('/ordini');
							}
						}
					);
				}
			},
			function (reason){
				console.log(reason);
				$scope.openMessageModal("errore salvataggio ordine");
			}
		);
	};

	$scope.generateEmailMessage = function(){
		var message = {};

		message.toEmailAddress = [$scope.getUserEmail()];
		message.ccEmailAddress = [];
		message.emailSubject = "Annacloud - Riepilogo Ordine " + $scope.ordineInCorso.codice;
		message.emailMessage = $scope.generateMessageText();

		return message;
	};

	$scope.generateMessageText = function(){
		var message = $scope.orderBaseMessage;
		message = message.replace('CODICE_ORDINE', $scope.ordineInCorso.codice);

		var confMessageParts = "";
		for(var i = 0; i < $scope.ordineInCorso.configurazioni.length; i++){
			var configurazione = $scope.ordineInCorso.configurazioni[i];


			var elencoEntitaPartMessage = "";
			for(var j= 0; j < configurazione.elencoEntita.length; j++){
				entita = configurazione.elencoEntita[j];

				var entitaMessagePart = $scope.entitaPartMessage;

				entitaMessagePart = entitaMessagePart.replace('CONF_ENTITA_NOME', entita.categoria);
				entitaMessagePart = entitaMessagePart.replace('CONF_ENTITA_VALORE', $scope.traduciNomiOrdini(entita));

				elencoEntitaPartMessage += entitaMessagePart;
			}
			var confMessagePart = $scope.configurationPartMessage;
			confMessagePart = confMessagePart.replace('ELENCO_ENTITA',elencoEntitaPartMessage);

			confMessagePart = confMessagePart.replace('CONF_NAME',configurazione.nome);
			confMessagePart = confMessagePart.replace('CONF_IMAGE',configurazione.thumbnail);
			confMessagePart = confMessagePart.replace('CONF_COLORE',$scope.getColoreConf(configurazione));
			confMessagePart = confMessagePart.replace('CONF_INIZIALI',$scope.getInizialiConf(configurazione));

			confMessageParts += confMessagePart;
		}

		message = message.replace('ELENCO_CONF', confMessageParts);
		return message;
	};

	loginService.getCurrentUser().then(function(data){
		$scope.setUser(data);
		if(data != null){
			if(data.signInUserSession != null){
				var idToken = jwtHelper.decodeToken(data.signInUserSession.idToken.jwtToken);
				var email = idToken.email;
				$scope.ricaricaListe(email, "", true);
				//tiro giu' anche gli attributi dell'utente
				loginService.getUserAttributes().then(
					function (attList){
						console.log(attList);
						attList.forEach(function (a){
							if (a.Name == "custom:email" ){
								$scope.email = a.Value;
							}
							if (a.Name == "custom:telefono" ){
								$scope.tel = a.Value;
							}
							if (a.Name == "name" ){
								$scope.nome = a.Value;
							}
							if (a.Name == "family_name" ){
								$scope.cognome = a.Value;
							}
							if (a.Name == "custom:indSpe" ){
								$scope.indSpe = a.Value;
							}
							if (a.Name == "custom:cittaSpe" ){
								$scope.cittaSpe = a.Value;
							}
							if (a.Name == "custom:capSpe" ){
								$scope.capSpe = a.Value;
							}
							if (a.Name == "custom:nomeSpe" ){
								$scope.nomeSpe = a.Value;
							}
							if (a.Name == "custom:indSpe2" ){
								$scope.indSpe2 = a.Value;
							}
						});
					},
					function (reason){
						console.log(reason);
					}
				)	;
			}
		}
		
		console.log ("l'utente è " + data);
		console.log(data);
	},
		function(reason){
			console.log('reason');
		}
	);

	$scope.svuotaCarrello = function(ordine){

		console.log("sto per svuotare il carrello");
		//ottenfo la lista dei codici delle configurazioni
		var listaCodici = $scope.getListaCodiciConfigurazioni(ordine);
		listeService.svuotaCarrello(listaCodici).then(
			function (res){
				console.log("carrello svuotato, ricarico le liste");
				$scope.ricaricaListe($scope.getUserEmail(), "", true);
			},
			function (reason){
				console.log(reason);
				$scope.openMessageModal("errore salvataggio ordine");
			}
		);
	};

	$scope.getListaCodiciConfigurazioni = function(ordine){

		var codici = [];

		var configurazioni = ordine.configurazioni;
		for(var i = 0; i < configurazioni.length; i++){
			var configurazione = configurazioni[i];
			if(configurazione.codice != null){
				codici.push(configurazione.codice);
			}
		}

		return codici;
	};

	$scope.hideElement = function(){
		return $location.path().indexOf("configura") != -1 || $location.path().indexOf("admin-ordini") != -1 || $location.path().indexOf("admin-clienti") != -1;
	};
	
	$scope.wowInit = function(config){
		$scope.caricaListePreconfigurati();
		if(config){
			new WOW(config).init();
		} else {
			new WOW().init();
		}
	};

	$scope.changePath = function(path){
		$location.url(path);
		$scope.$apply();
	};

	$scope.traduciCategoriaAccessorio = function(nomeAccessorio){
		if(nomeAccessorio == "ciondoli"){
			return "charms";
		}
		return nomeAccessorio;
	};

	$scope.getModelSizes = function(modelName){
		if(modelName == "shoulderbag"){
			return "30X28";
		} else if(modelName == "tote"){
			return "35X30";
		} else if(modelName == "crossbody"){
			return "24X15";
		} else {
			return "";
		}
	};

	/* GESTIONE MODALI */
	$scope.openChangeAddressModal = function () {
		$scope.modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'views/modaleCmabioIndirizzo.html',
			scope: $scope,
			resolve: {
				avviso: function () {
				  return $scope.avvisoInputNome;
				}
			  }
		});
	};

	$scope.openConfigNameModal = function (oldName) {
		if(oldName != undefined && oldName != ""){
			$scope.avvisoInputNome = "Aggiorna il nome della borsa";
		}

		$scope.modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'views/modaleNomeConfigurazione.html',
			scope: $scope,
			resolve: {
				avviso: function () {
				  return $scope.avvisoInputNome;
				},
				vecchioNome: function(){
					return $scope.vecchioNomeBorsa;
				}
			  }
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

		$scope.getTempConfigurazione().nome = configName;

		$scope.setLoaderMessage("salvo la configurzione '"+configName+"' creata...");
		$scope.showLoader();
		
		listeService.putConfigurazione($scope.getTempConfigurazione()).then(
			function (res){
				console.log(res);
				$scope.getTempConfigurazione().codice = res.data.codiceConfigurazioneRisposta;
				//$scope.addToPreferiti($scope.getTempConfigurazione());//aggiunge ai preferiti locali
				$scope.ricaricaListe($scope.getUserEmail(), "", true);
				$scope.hideLoader();
				if($scope.getTempConfigurazione().carrello){
					//$scope.addToCarrello($scope.getTempConfigurazione());//aggiunge ai preferiti locali
					$scope.changePath('/carrello');
				}
				
			},
			function (reason){
				console.log(reason);
				$scope.hideLoader();
				$scope.openMessageModal("errore agginta preferiti");
			}
		);
		$uibModalStack.dismissAll();
		//$scope.modalInstance.close();
	};

	$scope.cancelConfig = function () {
		$uibModalStack.dismissAll();
	};
	  
	$scope.ok = function () {
		$uibModalStack.dismissAll();
	};

	/* FUNZIONI DI TRADUZIONE */
	$scope.traduciNomiInterfaccia = function(entita){
		if(entita){
			if(entita.categoria != "" && entita.nome != ""){
				var resutl = "";
				switch(entita.categoria){
					case "ciondoli":
						var temp = entita.nome.toLowerCase();
						var splitted = temp.split("_");
						if(splitted.length == 5){
							result = splitted[3];
						}else if(splitted.length == 6){
							result = splitted[3] + "-" + splitted[4];
						} else if(splitted.length == 7){
							result = splitted[3] + "-" + splitted[4] + "-" + splitted[5];
						} else {
							result = entita.nome;
						}
						break;
					case "tracolle":
						temp = entita.nome.toLowerCase();
						splitted = temp.split("_");
						if(splitted.length == 5){
							result = splitted[3];
						} else if(splitted.length == 6){
							result = splitted[3] + "-" + splitted[4];
						} else {
							result = entita.nome;
						}
						break;
					case "colore":
						splitted = entita.nome.split("_");
						if(splitted.length == 2){
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

	$scope.traduciNomiOrdini = function(entita){
		if(entita){
			if(entita.categoria != "" && entita.nome != ""){
				var resutl = "";
				switch(entita.categoria){
					case "ciondoli":
						var temp = entita.nome.toLowerCase();
						var splitted = temp.split("_");
						if(splitted.length == 5){
							result = splitted[1] + " " + splitted[3];
						}else if(splitted.length == 6){
							result = splitted[1] + " " + splitted[3] + " " + splitted[4];
						} else if(splitted.length == 7){
							result = splitted[1] + " " + splitted[3] + " " + splitted[4] + " " + splitted[5];
						} else {
							result = entita.nome;
						}
						break;
					case "tracolle":
						temp = entita.nome.toLowerCase();
						splitted = temp.split("_");
						if(splitted.length == 5){
							result = splitted[1] + " " + splitted[3];
						} else if(splitted.length == 6){
							result = splitted[1] + " " + splitted[3] + " " + splitted[4];
						} else {
							result = entita.nome;
						}
						break;
					case "colore":
						splitted = entita.nome.split("_");
						if(splitted.length == 2){
							result = splitted[1];
						} else {
							result = entita.nome;
						}
						break;
					case "metalleria":
						splitted = entita.nome.split("_");
						if(splitted.length == 2){
							result = splitted[1];
						} else {
							result = entita.nome;
						}
						break;
					case "stile":
						splitted = entita.nome.split("_");
						if(splitted.length == 3){
							result = splitted[2];
						} else {
							result = entita.nome;
						}
						break;
					case "borchie":
						splitted = entita.nome.split("_");
						if(splitted.length == 3){
							result = splitted[2];
						} else if(splitted.length == 4){
							result = splitted[2] + " " + splitted[3];
						} else {
							result = entita.nome;
						}
						break;
					case "iniziali":
						splitted = entita.nome.split("_");
						if(splitted.length == 2){
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

	$scope.getFigurino = function(nomeModello){
		var figurino = "";
		if(nomeModello){
			switch(nomeModello){
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

	/* FUNZIONI GESTIONE LOADER */
	$scope.showLoader = function(){
		$('#loaderOverlay')[0].style.visibility = 'visible';
	};
	
	$scope.hideLoader = function(){
		$('#loaderOverlay')[0].style.visibility = 'hidden';
	};

}]);
