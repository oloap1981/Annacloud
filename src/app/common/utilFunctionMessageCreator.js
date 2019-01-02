angular.module("applicationModule").service("UtilFunctionMessagesCreator", function() {
	
	this.getTipiAccessoriMessage = function(modelName){
		var message = {};
		message.modello = modelName;
		
		return message;
	};
	
	this.getModelliMessage = function(){
		var message = {};
		message.functionName = "UnaDunaGetModelli";
		return message;
	}
	
	this.getAccessoriMessage = function(nomeModello){
		var message = {};
		message.functionName = "UnaDunaGetAccessori";
		message.codiceModello = nomeModello;
		return message;
	}
	
	this.getConfigurazioniMessage = function(){
		var message = {};
		message.functionName = "UnaDunaGetConfigurazioni";
		return message;
	}
	
	this.getConfigurazioniUtenteMessage = function(codiceUtente){
		var message = {};
		message.functionName = "UnaDunaGetConfigurazioniUtente";
		message.codiceUtente = codiceUtente;
		message.ifCarrello = false;
		return message;
	}
	
	this.getCarrelloUtenteMessage = function(codiceUtente){
		var message = {};
		message.functionName = "UnaDunaGetConfigurazioniUtente";
		message.codiceUtente = codiceUtente;
		message.ifCarrello = true;
		return message;
	}
	
	this.getOrdiniMessage = function(){
		var message = {};
		message.functionName = "UnaDunaGetOrdini";
		return message;
	}
	
	this.getOrdiniUtenteMessage = function(codiceUtente){
		var message = {};
		message.functionName = "UnaDunaGetOrdiniUtente";
		message.codiceUtente = codiceUtente;
		return message;
	}
	
	this.getOrdineMessage = function(codiceOrdine){
		var message = {};
		message.functionName = "UnaDunaGetOrdine";
		message.codiceOrdine = codiceOrdine;
		return message;
	}
	
	this.getConfigurazioneMessage = function(codiceConfigurazione){
		var message = {};
		message.functionName = "UnaDunaGetConfigurazione";
		message.codiceConfigurazione = codiceConfigurazione;
		return message;
	}

	this.putConfigurazioneMessage = function(configurazione){
		var message = {};
		message.functionName = "UnaDunaPutConfigurazione";
		message.configurazione = configurazione;
		return message;
	}
	
	this.putOrdineMessage = function(ordine){
		var message = {};
		message.functionName = "UnaDunaPutOrdine";
		message.ordine = ordine;
		return message;
	}
	
	this.deleteConfigurazioneMessage = function (codice){
		var message = {};
		message.functionName = "UnaDunaDeleteConfigurazione";
		message.codiceConfigurazione = codice;
		return message;
	}

	this.svuotaCarrelloMessage = function (configurazioni){
		var message = {};
		message.functionName = "UnaDunaSvuotaCarrello";
		message.codiciConfigurazioni = configurazioni;
		return message;
	}

	this.sendEmailMessage = function (mailMessage){
		var message = {};

		message.functionName = "UnaDunaSendMail";
		message.toEmailAdresses = mailMessage.toEmailAddress;
		message.ccEmailAddreses = mailMessage.ccEmailAddress;
		message.emailSubject = mailMessage.emailSubject;
		message.emailMessage = mailMessage.emailMessage;

		return message;
	}

	this.saveImageMessage = function(base64Image, filename){
		var message = {};

		message.functionName = "UnaDunaSaveImage";
		message.base64Image = base64Image;
		message.filename = filename;

		return message;
	}
});