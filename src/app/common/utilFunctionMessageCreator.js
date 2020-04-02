angular.module("applicationModule").service("UtilFunctionMessagesCreator", function () {

	this.getTipiAccessoriMessage = function (modelName) {
		var message = {};
		message.modello = modelName;

		return message;
	};

	this.getModelliMessage = function () {
		var message = {};
		message.functionName = "UnaDunaGetModelli";
		return message;
	};

	this.getAccessoriMessage = function (nomeModello) {
		var message = {};
		message.functionName = "UnaDunaGetAccessori";
		message.codiceModello = nomeModello;
		return message;
	};

	this.getConfigurazioniMessage = function () {
		var message = {};
		message.functionName = "UnaDunaGetConfigurazioni";
		return message;
	};

	this.getConfigurazioniUtenteMessage = function (codiceUtente) {
		var message = {};
		message.functionName = "UnaDunaGetConfigurazioniUtente";
		message.codiceUtente = codiceUtente;
		message.ifCarrello = false;
		return message;
	};

	this.getConfigurazioniPreconfigurateMessage = function () {
		var message = {};
		message.functionName = "UnaDunaGetConfigurazioniPreconfigurate";
		message.ifCarrello = false;
		return message;
	};

	this.getConfigurazioniShoppingMessage = function () {
		var message = {};
		message.functionName = "UnaDunaGetConfigurazioniShopping";
		message.ifCarrello = false;
		return message;
	};

	this.getCarrelloUtenteMessage = function (codiceUtente) {
		var message = {};
		message.functionName = "UnaDunaGetConfigurazioniUtente";
		message.codiceUtente = codiceUtente;
		message.ifCarrello = true;
		return message;
	};

	this.getOrdiniMessage = function () {
		var message = {};
		message.functionName = "UnaDunaGetOrdini";
		return message;
	};

	this.getOrdiniUtenteMessage = function (emailUtente) {
		var message = {};
		message.functionName = "UnaDunaGetOrdiniUtente";
		message.emailUtente = emailUtente;
		return message;
	};

	this.getOrdineMessage = function (codiceOrdine) {
		var message = {};
		message.functionName = "UnaDunaGetOrdine";
		message.codiceOrdine = codiceOrdine;
		return message;
	};

	this.getConfigurazioneMessage = function (codiceConfigurazione) {
		var message = {};
		message.functionName = "UnaDunaGetConfigurazione";
		message.codiceConfigurazione = codiceConfigurazione;
		return message;
	};

	this.getChiaviMessage = function (emailUtente) {
		var message = {};
		message.functionName = "UnaDunaGetChiave";
		message.emailUtente = emailUtente;
		return message;
	};

	this.putConfigurazioneMessage = function (configurazione) {
		var message = {};
		message.functionName = "UnaDunaPutConfigurazione";
		message.configurazione = configurazione;
		return message;
	};

	this.putOrdineMessage = function (ordine) {
		var message = {};
		message.functionName = "UnaDunaPutOrdine";
		message.ordine = ordine;
		return message;
	};

	this.creaCodiceScontoMessage = function (codiceSconto) {
		var message = {};
		message.functionName = "UnaDunaCreaCodiceSconto";
		message.codiceSconto = codiceSconto;
		return message;
	};
	this.consumaCodiceScontoMessage = function (codiceCodiceSconto, idUtente) {
		var message = {};
		message.functionName = "UnaDunaConsumaCodiceSconto";
		message.codiceCodiceSconto = codiceCodiceSconto;
		message.idUtente = idUtente;
		return message;
	};

	this.getCodiciScontoMessage = function () {
		var message = {};
		message.functionName = "UnaDunaGetCodiciSconto";
		return message;
	};

	this.getCodiceScontoMessage = function (id) {
		var message = {};
		message.functionName = "UnaDunaGetCodiceSconto";
		message.idCodiceSconto = id;
		return message;
	};

	// UnaDunaDeleteCodiceSconto
	this.deleteCodiceScontoMessage = function (codice) {
		var message = {};
		message.functionName = "UnaDunaDeleteCodiceSconto";
		message.idCodiceSconto = codice;
		return message;
	};

	this.deleteConfigurazioneMessage = function (codice) {
		var message = {};
		message.functionName = "UnaDunaDeleteConfigurazione";
		message.idCodiceSconto = codice;
		return message;
	};

	this.svuotaCarrelloMessage = function (configurazioni) {
		var message = {};
		message.functionName = "UnaDunaSvuotaCarrello";
		message.codiciConfigurazioni = configurazioni;
		return message;
	};

	this.sendEmailMessage = function (mailMessage) {
		var message = {};

		message.functionName = "UnaDunaSendMail";
		//message.functionName = "UnaDunaSendMailGmail";
		message.toEmailAdresses = mailMessage.toEmailAddress;
		message.ccEmailAddreses = mailMessage.ccEmailAddress;
		message.emailSubject = mailMessage.emailSubject;
		message.emailMessage = mailMessage.emailMessage;

		return message;
	};

	this.saveImageMessage = function (base64Image, filename) {
		var message = {};

		message.functionName = "UnaDunaSaveImage";
		message.base64Image = base64Image;
		message.filename = filename;

		return message;
	};

	this.saveLogMessage = function (data, utente, messaggio, nomeClasse, tipoLog) {
		var message = {};

		message.functionName = "UnaDunaPutLogEvento";

		var logElement = {};
		logElement.data = data;
		logElement.classe = nomeClasse;
		logElement.utente = utente;
		logElement.messaggio = messaggio;
		logElement.tipoLog = tipoLog;

		message.logElement = logElement;

		return message;
	};
});