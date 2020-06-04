angular.module("applicationModule").service("consumaCodiceScontoService", ["$http", "URLS", "UtilFunctionMessagesCreator", "RESPONSE_CODES", function ($http, URLS, UtilFunctionMessagesCreator, RESPONSE_CODES) {

	this.response = function (codiceCodiceSconto, idUtente) {
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		var message = UtilFunctionMessagesCreator.consumaCodiceScontoMessage(codiceCodiceSconto, idUtente);

		return $http.post(URLS.put, message, config);
	};
}]);