angular.module("applicationModule").service("chiaviService", ["$http", "UtilFunctionMessagesCreator", "loginService", "AWS_SERVICE_URLS", function($http, UtilFunctionMessagesCreator, loginService, AWS_SERVICE_URLS) {
	
	this.getChiave = function(emailUtente){
		var requestMessage = UtilFunctionMessagesCreator.getChiaviMessage(emailUtente);
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': loginService.getPostAccessToken()
			}
		};
		return $http.post(AWS_SERVICE_URLS.urlGetSecureService, requestMessage, config);
	};
}]);