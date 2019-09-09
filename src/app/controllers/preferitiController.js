angular.module("applicationModule").controller("preferitiController", ["$scope", "loginService", "listeService", "$location", "$window",
	function($scope, loginService, listeService, $location, $window) {

		$scope.influencers = [
			{imageUrl: ""},
			{imageUrl:"https://s3.eu-central-1.amazonaws.com/unaduna-images-bucket/MODELLI/INFLUENCER-LABEL/hudakattam-label.png"},
			{imageUrl:"https://s3.eu-central-1.amazonaws.com/unaduna-images-bucket/MODELLI/INFLUENCER-LABEL/lemods-label.png"},
			{imageUrl:"https://s3.eu-central-1.amazonaws.com/unaduna-images-bucket/MODELLI/INFLUENCER-LABEL/letwins-label.png"}
		];

		$scope.getInfluencerName = function(complete){
			var result = "";
			if(complete != ""){
				var split1 = complete.split('/');
				if(split1.length > 0){
					var split2 = split1[split1.length-1].split('-');
					if(split2.length > 0){
						return split2[0].toUpperCase();
					}
				}
			}
			return result;
		};
	
		$scope.goToPage = function(conf){
			$scope.setTempConfigurazione(conf);
			$location.url('/configura');
		};

		$scope.getPublicUrl = function(conf){
			return new $window.URL($location.absUrl()).origin + "/#!/configura/" + conf.codice;
		};

		$scope.addToCart = function(configurazione){
			var localTempConfig = configurazione;
			$scope.setLoaderMessage("aggiungo la configurazione al carrello...");
			$scope.showLoader();

			var presente = $scope.checkNomePresente(localTempConfig.nome, true);
			if(presente){
				var nuovoNome = $scope.generaNuovoNome(localTempConfig.nome);
				localTempConfig.codice = "";//in questo modo viene generata nuova
				localTempConfig.nome = nuovoNome;
            }
            
			localTempConfig.carrello = true;
			listeService.putConfigurazione(localTempConfig).then(
				function (res){
					if(res.errorMessage != undefined){
						$scope.openMessageModal("si è verificato un problema nell inserimento della configurazione nel carrello");
						console.log(res.errorMessage);
					} else {
						console.log(res);
						$scope.openMessageModal("configurazione aggiunta correttamente al carrello");
						$scope.ricaricaListe($scope.getUserEmail(), '', true);
					}
				},
				function (reason){
					console.log(reason);
					$scope.openMessageModal("errore aggiunta preferiti");
				}
			);
		};

		$scope.eliminaConfigurazione  = function (codice, nome)  {
			if(confirm("Sicuro di voler eliminare la configurazione "+nome+"?")){
				console.log("sto per eliminare la configurazione con codice " + codice);
				$scope.setLoaderMessage("sto eliminando la configurazione...");
				$scope.showLoader();
				listeService.deleteConfigurazione(codice).then(function(data){
						if(data.errorMessage != null && data.errorMessage != undefined){
							$scope.hideLoader();
							$scope.openMessageModal("si è verificato un errore nella cancellazione della configurazione");
							console.log("errorMessage");
						} else {
							$scope.ricaricaListe($scope.getUserEmail(), "", true);
						}
			
					},
					function (reason){
						console.log(reason);
						$scope.openMessageModal("errore cancellazione");
					}
				);
			}
		};

		$scope.editPreconfig = function(config){
			var ordine = config.ordineInterfaccia;
			listeService.putConfigurazione(config).then(
				function (res){
					if(res.errorMessage != undefined){
						$scope.openMessageModal("si è verificato un problema nella modifica");
						console.log(res.errorMessage);
					} else {
						console.log(res);
						$scope.openMessageModal("configurazione correttamente modificata");
						$scope.ricaricaListe($scope.getUserEmail(), '', true);
					}
				},
				function (reason){
					console.log(reason);
					$scope.openMessageModal("errore modifica preconfigurata");
				}
			);
		};

		$scope.toggle = function (item, conf) {
			conf.urlImmagineInfluencer = item.imageUrl;
		};
	}
]);
