angular.module("applicationModule").service("deleteCodiceScontoService", ["$http", "URLS", "UtilFunctionMessagesCreator", "RESPONSE_CODES", function ($http, URLS, UtilFunctionMessagesCreator, RESPONSE_CODES) {

	this.response = function (id) {
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		var message = UtilFunctionMessagesCreator.deleteCodiceScontoMessage(id);

		return $http.post(URLS.del, message, config);
	};
}]);