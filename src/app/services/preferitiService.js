angular.module("applicationModule").service("preferitiService", ["$http" , "$q", "listeService", function($http, $q, listeService) {
	
	this.addToPreferiti = function (conf){
		conf.carrello = false;
		conf.codice = "";
		listeService.putConfigurazione(conf).then(
				function (res){
					console.log(res);
					return res.data.codiceConfigurazioneRisposta;
				},
				function (reason){
					console.log(reason);
					alert ("errore aggiunta preferiti");
					return "";
				}
			);	
		};
	
}]);