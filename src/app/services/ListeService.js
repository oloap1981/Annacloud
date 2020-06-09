angular.module("applicationModule").service("listeService", ["$http", "UtilFunctionMessagesCreator", "loginService", "AWS_SERVICE_URLS", function ($http, UtilFunctionMessagesCreator, loginService, AWS_SERVICE_URLS) {

	this.addAccessories = function (newObj) {
		accessoriesList.push(newObj);
	};

	this.addAllAccessories = function (data) {
		accessoriesList = data;
	};

	this.getModelli = function () {
		var requestMessage = UtilFunctionMessagesCreator.getModelliMessage();
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlGetService, requestMessage, config);
	};

	this.getAccessori = function (nomeModello) {
		var requestMessage = UtilFunctionMessagesCreator.getAccessoriMessage(nomeModello);
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlGetService, requestMessage, config);
	};

	this.getConfigurazione = function (codiceConfigurazione) {
		var requestMessage = UtilFunctionMessagesCreator.getConfigurazioneMessage(codiceConfigurazione);
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlGetService, requestMessage, config);
	};

	this.getConfigurazioni = function () {
		var requestMessage = UtilFunctionMessagesCreator.getConfigurazioniMessage();
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlGetService, requestMessage, config);
	};

	this.getConfigurazioniUtente = function (codiceUtente) {
		var requestMessage = UtilFunctionMessagesCreator.getConfigurazioniUtenteMessage(codiceUtente);
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlGetService, requestMessage, config);
	};

	this.getConfigurazioniPreconfigurate = function () {
		var requestMessage = UtilFunctionMessagesCreator.getConfigurazioniPreconfigurateMessage();
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': ''
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlGetService, requestMessage, config);
	};

	this.getConfigurazioniShopping = function () {
		var requestMessage = UtilFunctionMessagesCreator.getConfigurazioniShoppingMessage();
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': ''
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlGetService, requestMessage, config);
	};

	this.getCarrelloUtente = function (codiceUtente) {
		var requestMessage = UtilFunctionMessagesCreator.getCarrelloUtenteMessage(codiceUtente);
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlGetService, requestMessage, config);
	};

	this.getOrdini = function (codiceOrdine) {
		var requestMessage = UtilFunctionMessagesCreator.getOrdineMessage(codiceOrdine);
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlGetService, requestMessage, config);
	};

	this.getOrdini = function () {
		var requestMessage = UtilFunctionMessagesCreator.getOrdiniMessage();
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlGetService, requestMessage, config);
	};

	this.getOrdiniUtente = function (codiceUtente) {
		var requestMessage = UtilFunctionMessagesCreator.getOrdiniUtenteMessage(codiceUtente);
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlGetService, requestMessage, config);
	};

	this.putConfigurazione = function (configurazione) {
		var requestMessage = UtilFunctionMessagesCreator.putConfigurazioneMessage(configurazione);
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlPostService, requestMessage, config);
	};

	this.putOrdine = function (ordine) {
		var requestMessage = UtilFunctionMessagesCreator.putOrdineMessage(ordine);
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlPostService, requestMessage, config);
	};

	this.deleteConfigurazione = function (cod) {
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};

		var message = UtilFunctionMessagesCreator.deleteConfigurazioneMessage(cod);

		return $http.post(AWS_SERVICE_URLS.urlDeleteService, message, config);
	};

	this.svuotaCarrello = function (configurazioni) {
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};

		var message = UtilFunctionMessagesCreator.svuotaCarrelloMessage(configurazioni);

		return $http.post(AWS_SERVICE_URLS.urlPostService, message, config);
	};

	this.sendEmail = function (emailMessage) {

		var authorizationToken = "";
		if (loginService.isLoggedIn()) {//per il momento funziona anche senza token. Vediamo se serve in futuro
			authorizationToken = loginService.getPostAccessToken();
		}
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': authorizationToken
			}
		};

		var message = UtilFunctionMessagesCreator.sendEmailMessage(emailMessage);
		return $http.post(AWS_SERVICE_URLS.urlOtherService, message, config);
	};

	this.saveImage = function (base64Image, filename) {
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		// var config = {
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		'Authorization': loginService.getPostAccessToken()
		// 	}
		// };

		var message = UtilFunctionMessagesCreator.saveImageMessage(base64Image, filename);
		return $http.post(AWS_SERVICE_URLS.urlOtherService, message, config);
	};

	// REGIONE CODICI SCONTO

	this.consumaCodiceSconto = function (codiceCodiceSconto, idUtente) {
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};

		var message = UtilFunctionMessagesCreator.consumaCodiceScontoMessage(codiceCodiceSconto, idUtente);

		return $http.post(AWS_SERVICE_URLS.urlPostService, message, config);
	};

	this.creaCodiceSconto = function (codiceSconto) {
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};

		var message = UtilFunctionMessagesCreator.creaCodiceScontoMessage(codiceSconto);

		console.log('url: ' + AWS_SERVICE_URLS.urlPostService);
		console.log('message: ' + JSON.stringify(message));

		return $http.post(AWS_SERVICE_URLS.urlPostService, message, config);
	};

	this.deleteCodiceSconto = function (id) {
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};

		var message = UtilFunctionMessagesCreator.deleteCodiceScontoMessage(id);

		console.log('url: ' + AWS_SERVICE_URLS.urlDeleteService);
		console.log('message: ' + JSON.stringify(message));

		return $http.post(AWS_SERVICE_URLS.urlDeleteService, message, config);
	};

	this.getTuttiCodiciSconto = function () {
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};

		var message = UtilFunctionMessagesCreator.getCodiciScontoMessage();

		console.log('url: ' + AWS_SERVICE_URLS.urlGetService);
		console.log('message: ' + JSON.stringify(message));

		return $http.post(AWS_SERVICE_URLS.urlGetService, message, config);
	};
	// FINE REGIONE
}]);