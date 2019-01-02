angular.module("applicationModule").service("listeService", ["$http", "UtilFunctionMessagesCreator", "loginService", function($http, UtilFunctionMessagesCreator, loginService) {
	
	this.urlGetService = "https://5mjp7r5urj.execute-api.eu-central-1.amazonaws.com/UnadunaGet"
	this.urlGetServiceNode = 'https://ig24v3ii6b.execute-api.eu-central-1.amazonaws.com/unaDunaGetAccessori';
	this.urlPostService = "https://i51umjhba2.execute-api.eu-central-1.amazonaws.com/unadunaPost";
	this.urlDeleteService ="https://gtjby1j5oi.execute-api.eu-central-1.amazonaws.com/UnadunaDelete";
	this.urlOtherService ="https://ln3p02wb0f.execute-api.eu-central-1.amazonaws.com/BeautifulVinoOther";
	this.tipiAccessoriList = [];
	this.accessoriesList = [];
	
	this.addAccessories = function(newObj) {
		accessoriesList.push(newObj);
	};
	
	this.addAllAccessories = function(data){
		accessoriesList = data;
	};
	
	this.getTipiAccessoriRemote = function(modelName){
		//parametri di chiamata
		var data = UtilFunctionMessagesCreator.getTipiAccessoriMessage(modelName);
		
		//configurazioni di chiamata
		var config = {
		      headers : {
		          'Content-Type': 'application/json'
		      }
		  };
			  
		//GESTIRE CASO DI ERRORE
	    $http.post("https://tnpklinhf1.execute-api.eu-central-1.amazonaws.com/util_function_stage", data, config).then(function (res) {
	    	 	this.tipiAccessoriList = res.data.accessori;
	    });
	}
	
	this.getModelli = function(){
		var requestMessage = UtilFunctionMessagesCreator.getModelliMessage();
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post(this.urlGetService, requestMessage, config);
	}
	
	this.getAccessori = function(nomeModello){
		var requestMessage = UtilFunctionMessagesCreator.getAccessoriMessage(nomeModello);
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post(this.urlGetService, requestMessage, config);
	}
	
	this.getConfigurazione = function(codiceConfigurazione){
		var requestMessage = UtilFunctionMessagesCreator.getConfigurazioneMessage(codiceConfigurazione);
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return $http.post(this.urlGetService, requestMessage, config);
	}
	
	this.getConfigurazioni = function(){
		var requestMessage = UtilFunctionMessagesCreator.getConfigurazioniMessage();
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(this.urlGetService, requestMessage, config);
	}
	
	this.getConfigurazioniUtente = function(codiceUtente){
		var requestMessage = UtilFunctionMessagesCreator.getConfigurazioniUtenteMessage(codiceUtente);
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(this.urlGetService, requestMessage, config);
	}
	
	this.getCarrelloUtente = function(codiceUtente){
		var requestMessage = UtilFunctionMessagesCreator.getCarrelloUtenteMessage(codiceUtente);
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(this.urlGetService, requestMessage, config);
	}
	
	this.getOrdini = function(codiceOrdine){
		var requestMessage = UtilFunctionMessagesCreator.getOrdineMessage(codiceOrdine);
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(this.urlGetService, requestMessage, config);
	}
	
	this.getOrdini = function(){
		var requestMessage = UtilFunctionMessagesCreator.getOrdiniMessage();
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(this.urlGetService, requestMessage, config);
	}
	
	this.getOrdiniUtente = function(codiceUtente){
		var requestMessage = UtilFunctionMessagesCreator.getOrdiniUtenteMessage(codiceUtente);
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(this.urlGetService, requestMessage, config);
	}
	
	this.putConfigurazione = function(configurazione){
		var requestMessage = UtilFunctionMessagesCreator.putConfigurazioneMessage(configurazione);
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(this.urlPostService, requestMessage, config);
	}
	
	this.putOrdine = function(ordine){
		var requestMessage = UtilFunctionMessagesCreator.putOrdineMessage(ordine);
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(this.urlPostService, requestMessage, config);
	}
	
	this.deleteConfigurazione = function(cod){
		var config = {
			      headers : {
			          'Content-Type': 'application/json',
					  'Authorization': loginService.getPostAccessToken()
			      }
			  };
		
		var message = UtilFunctionMessagesCreator.deleteConfigurazioneMessage(cod);
		
		return $http.post(this.urlDeleteService, message, config);
	}

	this.svuotaCarrello = function(configurazioni){
		var config = {
			headers : {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};

		var message = UtilFunctionMessagesCreator.svuotaCarrelloMessage(configurazioni);

		return $http.post(this.urlPostService, message, config);
	}

	this.sendEmail = function(emailMessage){
		var config = {
			headers : {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};

		var message = UtilFunctionMessagesCreator.sendEmailMessage(emailMessage);
		return $http.post(this.urlOtherService, message, config);
	}

	this.saveImage = function(base64Image, filename){
		var config = {
			headers : {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};

		var message = UtilFunctionMessagesCreator.saveImageMessage(base64Image, filename);
		return $http.post(this.urlOtherService, message, config);
	}
}]);