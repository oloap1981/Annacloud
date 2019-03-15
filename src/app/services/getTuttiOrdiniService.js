angular.module("applicationModule").service("getTuttiOrdiniService", ["$http", "URLS", "UtilFunctionMessagesCreator", "RESPONSE_CODES", function($http, URLS, UtilFunctionMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = UtilFunctionMessagesCreator.getOrdiniMessage();
		
		return $http.post(URLS.get, message, config);
	};
}]);