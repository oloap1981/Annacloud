angular.module("applicationModule").service("logService", ["$http", "UtilFunctionMessagesCreator", "loginService", "AWS_SERVICE_URLS", function($http, UtilFunctionMessagesCreator, loginService, AWS_SERVICE_URLS) {
	
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