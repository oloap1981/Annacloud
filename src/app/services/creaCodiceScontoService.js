angular.module("applicationModule").service("creaCodiceScontoService", ["$http", "URLS", "UtilFunctionMessagesCreator", "RESPONSE_CODES", function ($http, URLS, UtilFunctionMessagesCreator, RESPONSE_CODES) {

	this.response = function (codiceSconto) {
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		var message = UtilFunctionMessagesCreator.creaCodiceScontoMessage(codiceSconto);

		console.log('url: ' + URLS.put);
		console.log('message: ' + JSON.stringify(message));

		return $http.post(URLS.put, message, config);
	};
}]);