angular.module("applicationModule").service("carrelloService", ["$http" , "$q", "listeService", function($http, $q, listeService) {
	
	this.addConfToCarrello = function (conf){
		conf.carrello = true;
		conf.codice = "";
		listeService.putConfigurazione(conf).then(
				function (res){
					console.log(res);
					return res.data.codiceConfigurazioneRisposta;
				},
				function (reason){
					console.log(reason);
					alert ("errore aggiunta carrello");
					return "";
				}
			);	
		}
	
}]);