 angular.module("applicationModule").controller("cartController", ["$scope", "loginService", "listeService",
		function($scope, loginService, listeService) {
			
		 paypal.Button.render(
				{
					env: 'sandbox', // sandbox | production

					// Specify the style of the button
					style: {
						layout: 'horizontal',  // horizontal | vertical
						size:   'medium',    // medium | large | responsive
						shape:  'rect',      // pill | rect
						color:  'gold'       // gold | blue | silver | white | black
					},

					// Specify allowed and disallowed funding sources
					//
					// Options:
					// - paypal.FUNDING.CARD
					// - paypal.FUNDING.CREDIT
					// - paypal.FUNDING.ELV
					funding: {
						allowed: [
							paypal.FUNDING.CARD,
							paypal.FUNDING.CREDIT
						],
						disallowed: []
					},

					// Enable Pay Now checkout flow (optional)
					commit: true,

					// PayPal Client IDs - replace with your own
					// Create a PayPal app: https://developer.paypal.com/developer/applications/create
					client: {
						sandbox: 'AT1iiIpFRZhumzfgjO0TKil1W1MsCHFXzqhcbB8o7cCqfdujMn0o1ie1b1pwHgzqBavu7pp0WQoeq4X4',
						production: ''
					},

					payment: function (data, actions) {
						return actions.payment.create({
							payment: {
								transactions: [
									{
										amount: {
											total: $scope.calcolaPrezzoOrdine($scope.getOrdineInCorso()) + $scope.getCostoSpedizione(),
											currency: 'EUR'
										}
									}
								]
							}
						});
					},

					onAuthorize: function (data, actions) {
						return actions.payment.execute()
							.then(function () {
								$scope.svuotaCarrello($scope.getOrdineInCorso());//il carrello lo svuoto solo se il pagamento è andato a buon fine
								$scope.completaOperazioniOrdneAcquistato();
							});
					}, 

					onError: function(err){
						alert("Ci sono stati dei problemi durante il checkout. Il pagamento non è andato a buon fine, controllare Paypal per ulteriori dettagli");
					}
				} , '#paypal-button' ); 
	}]);
