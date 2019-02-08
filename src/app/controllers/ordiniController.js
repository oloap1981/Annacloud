angular.module("applicationModule").controller("ordiniController", ["$scope", "loginService", "getOrdiniService", "$location", function($scope, loginService, getOrdiniService, $location) {
	
		$scope.listaOrdini = [];

		$scope.initOrdini = function(){
			$scope.showLoader();
			loginService.getUserAttributes().then(
				function (attList){
					console.log(attList);
					attList.forEach(function (a){
						if (a.Name == "email" ){
							codice = a.Value;
							console.log(codice);
							getOrdiniService.response(codice).then(function(data){
								$scope.listaOrdini = $scope.ordinaListaOrdini(data.data.ordini);
								$scope.hideLoader();
							});
						}
					});
				},
				function (reason){
					console.log(reason);
					$scope.openMessageModal("C'è stato un problema nel caricamento degli ordini");
				}
			);
		};

		$scope.getCheckout = function(ordine){
			$scope.setOrdineInCorso(ordine);
			$location.url('/checkout');
		};

		$scope.ordinaListaOrdini = function(listaDaOrdinare){
			if(listaDaOrdinare.length > 0){
				return listaDaOrdinare.sort(function(a,b){
					//criterio di ordinamento
					if (a.codice > b.codice) {
						return -1;
					}
					if (a.codice < b.codice) {
						return 1;
					}
					// a deve essere uguale a b
					return 0;
				});
			} else return listaDaOrdinare;
		};

	}
]);
