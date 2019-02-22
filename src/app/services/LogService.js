angular.module("applicationModule").service("logService", ["$http", "UtilFunctionMessagesCreator", "loginService", "AWS_SERVICE_URLS", function($http, UtilFunctionMessagesCreator, loginService, AWS_SERVICE_URLS) {
	
	this.urlGetService = "https://5mjp7r5urj.execute-api.eu-central-1.amazonaws.com/UnadunaGet";
	this.urlGetServiceNode = 'https://ig24v3ii6b.execute-api.eu-central-1.amazonaws.com/unaDunaGetAccessori';
	this.urlPostService = "https://i51umjhba2.execute-api.eu-central-1.amazonaws.com/unadunaPost";
	this.urlDeleteService ="https://gtjby1j5oi.execute-api.eu-central-1.amazonaws.com/UnadunaDelete";
	this.urlOtherService ="https://779m9s40ij.execute-api.eu-central-1.amazonaws.com/UnaDunaOther";
	this.tipiAccessoriList = [];
	this.accessoriesList = [];
	
	this.saveLog = function(data, utente, classe, messaggio, tipoLog){
		var requestMessage = UtilFunctionMessagesCreator.saveLogMessage(data, utente, classe, messaggio, tipoLog);
		var config = {
			headers: {
				'Content-Type': 'application/json'
				//'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlOtherService, requestMessage, config);
	};
	
}]);