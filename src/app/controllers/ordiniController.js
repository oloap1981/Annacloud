angular.module("applicationModule").controller("ordiniController", ["$scope", "loginService", "getOrdiniService", "$location", function($scope, loginService, getOrdiniService, $location) {
	
		$scope.listaOrdini = [];

		$scope.initOrdini = function(){
			loginService.getUserAttributes().then(
				function (attList){
					console.log(attList);
					attList.forEach(function (a){
						if (a.Name == "email" ){
							codice = a.Value;
							console.log(codice);
							getOrdiniService.response(codice).then(function(data){
								$scope.listaOrdini = data.data.ordini;
								console.log(data);
								console.log ($scope.listaOrdini);
								
							});
						}
					});
				},
				function (reason){
					console.log(reason);
				}
			);
		};

		$scope.getCheckout = function(ordine){
			$scope.setOrdineInCorso(ordine);
			$location.url('/checkout');
		};

	}
]);
