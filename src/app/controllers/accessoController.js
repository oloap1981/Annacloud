angular.module("applicationModule").controller("accessoController", ["$scope", "listeService", "loginService", "salvaUtenteService", function($scope, listeService, loginService, salvaUtenteService) {
	
	$scope.remember = {
		       value : true,
		     };
	
		

	$scope.login = function (email, password){

		loginService.login(email, password).then(
			function(data){
				console.log(data);
					loginService.getCurrentUser().then (function (data){
						console.log(data);
						var user = data;
						user.eMail = email;
						$scope.setUser(user);
						$scope.reloadAttributes();
						$scope.ricaricaListe(user.eMail, "");
						if ($scope.remember.value == true){
							loginService.setDeviceStatusRemembered().then(
									function(greeting) {
									  console.log('Success: remembered ' + greeting);
									}, function(reason) {
									  console.log('Failed: ' + reason);
									});
						}else{
							loginService.setDeviceStatusNotRemembered().then(
									function(greeting) {
									  console.log('Success: not remembered ' + greeting);
									}, function(reason) {
									  console.log('Failed: ' + reason);
									});
						}

						if($scope.getNextPath() != ""){
							var tempNextPath = $scope.getNextPath();
							$scope.setNextPath("");
							if($scope.tempConfigurazione != null && tempNextPath == '/preferiti'){
								var localTempConfigurazione = $scope.getTempConfigurazione();
								$scope.tempConfigurazione = null;
								var confUser = {};
								confUser.email = user.eMail;
								localTempConfigurazione.utente = confUser;

								//salvo la configurazione
								listeService.putConfigurazione(localTempConfigurazione).then(
									function (res){
										if(res.errorMessage != null || res.errorMessage != undefined){
											$scope.openMessageModal("si è verificato un problema nel salvataggio della configurazione");
											console.log(res.errorMessage);
										} else {
											console.log("Configurazione salvata correttamente");
											//ricarico le liste
											$scope.ricaricaListe(confUser.email, tempNextPath, true);
										}
									},
									function (reason){
										console.log(reason);
										$scope.openMessageModal("errore aggiunta preferiti");
									}
								);
								
							} else {
								$scope.changePath(tempNextPath);
							}
						} else {
							$scope.changePath('/home');
						}
					});
			}, function(reason) {
				  console.log( reason);
				  $scope.openMessageModal(reason.message);
			}
		);
	};
	
	$scope.signUpCheckEmail = function(email, nome, cognome, password){
		loginService.login(email, "123").then(
			function(data) {
				console.log("mi sono riuscito a loggare, non dovrebbe succedere... anomalia");
			},
			function (reason){
				if(reason.code == "NotAuthorizedException"){//la mail esiste già
					$scope.openMessageModal("La mail inserita è già presente. Inserirne un'altra valida");
				} else if(reason.code == "UserNotFoundException"){//la mail non esiste, posso procedere
					//controllo su nome e cognome?
					$scope.signUp(email, nome, cognome, password);
				}
			}
		);
	};

	$scope.signUp = function (email, nome, cognome, password){

		loginService.signUp(email, $scope.capitalizeString(nome), $scope.capitalizeString(cognome), password).then(
				function(data){
					console.log(data);
					
					utente = {};
					utente.email = email;
					//utente.username = nome + "-" +cognome;
					utente.nome = nome;
					utente.cognome = cognome;

					$scope.openMessageModal("Registrazione avvenuta con successo, adesso puoi effettuare il login con le credenziali inserite");

					//popolo il login per agevolare l'utente appena registrato
					$scope.loginEmail = email;
					$scope.loginPassword = password;

					//svuoto i campi
					$scope.svuotaCampi();
					
					//mail di avviso avvenuta registrazione
					var message = {};

					message.toEmailAddress = [email];
					message.ccEmailAddress = [];
					message.emailSubject = "Conferma registrazione";
					message.emailMessage = "Congratulazioni, ti sei registrato su annacloud.it con successo.";

					listeService.sendEmail(message).then(
						function(res2){
							if(res2.errorMessage != null && res2.errorMessage != ""){
								console.log(res2.errorMessage);
								$scope.openMessageModal("C'è stato un problema nell'invio della mail di conferma registrazione");
							} 
						}
					);
				},
				function (reason){
					console.log(reason);
				}
		);
	};
	
	$scope.forgotPassword = function(){
		loginService.forgotPassword();
	};

	$scope.svuotaCampi = function(){
		$scope.nome = "";
		$scope.cognome = "";
		$scope.emailSign = "";
		$scope.passwordSign = "";
		$scope.passwordSignRep = "";
	};

	$scope.capitalizeString = function(toCapitalize){
		//prima la metto lowercase
		var result = toCapitalize.toLowerCase();

		result = result.charAt(0).toUpperCase() + result.slice(1);

		return result;
	};
}]);
