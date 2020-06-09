angular.module("applicationModule").service("carrelloService", ["$http" , "$q", "$route", "listeService", "cookiesService", "loginService", function($http, $q, $route, listeService, cookiesService, loginService) {
	

	this.getCarrelloCookiesContent = function() {
		return cookiesService.getCookie('carrello');
	}

	this.saveCarrelloCookiesContent = function(carrelloCookies) {
		cookiesService.addCookie('carrello', carrelloCookies);
	}

	this.svuotaCarrello = function() {
		cookiesService.removeCookie('carrello');
	}

	this.addObjectToCarrello = function(object) {
		var carrelloCookies = cookiesService.getCookie('carrello');
		if (carrelloCookies == null) {
			carrelloCookies = [];
		}

		var isNomePresente = this.checkNomePresenteCookies(object.nome, carrelloCookies);
		if (isNomePresente) {
			object.nome = this.generaNuovoNomeCookies(object.nome, carrelloCookies);
		}

		carrelloCookies.push(object);
		cookiesService.addCookie('carrello', carrelloCookies);
		$route.reload();
	}

	this.checkNomePresenteCookies = function (configName, carrello) {
		var presente = false;
		for (var i = 0; i < carrello.length; i++) {
			var configurazione = carrello[i];
			if (configurazione.nome === configName) {
				return true;
			}
		}
		return false;
	};

	this.generaNuovoNomeCookies = function (vecchioNome, carrello) {
		var split = vecchioNome.split("_");
		if (split.length == 1) {
			var nuovoNome = vecchioNome + "_1";
			if (this.checkNomePresenteCookies(nuovoNome, carrello)) {
				return this.generaNuovoNomeCookies(nuovoNome, carrello);
			}
			return nuovoNome;
		} else {
			if (!isNaN(parseInt(split[split.length - 1], 10))) {
				var number = parseInt(split[split.length - 1]);
				var nuovoNome = "";
				for (var i = 0; i < split.length - 1; i++) {
					if (nuovoNome == "") {
						nuovoNome = split[i];
					} else {
						nuovoNome = nuovoNome + "_" + split[i];
					}
				}
				nuovoNome = nuovoNome + "_" + (number + 1);
				if (this.checkNomePresenteCookies(nuovoNome, carrello)) {
					//ricorsione fino a che non trovo un nome che non c'è
					return this.generaNuovoNomeCookies(nuovoNome, carrello);
				} else {
					return nuovoNome;
				}
			} else {
				return vecchioNome + "_1";
			}
		}
	};

	this.removeObjectFromCarrello = function(object) {
		var carrelloCookies = cookiesService.getCookie('carrello');
		if (carrelloCookies == null) {
			return;
		}
		var trovato = false;
		var index = 0;
		for (var i = 0; i < carrelloCookies.length; i++) {
			var configurazione = carrelloCookies[i];
			if(configurazione.nome == object.nome){
				trovato = true;
				break;
			}
			index++;
		}
		if(trovato){
			carrelloCookies.splice(index, 1);
			cookiesService.addCookie('carrello', carrelloCookies);
			$route.reload();
		}		
	}
}]);