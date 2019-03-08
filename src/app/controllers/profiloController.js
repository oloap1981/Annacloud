angular.module("applicationModule").controller("profiloController", ["$scope", "getConfigurazioniService", "loginService", "ANAGRAFICHE",
	function($scope, getConfigurazioniService, loginService, ANAGRAFICHE) {

	$scope.comuni = ANAGRAFICHE.comuni.listaComuni;
	$scope.comune = {}; 

	$scope.editNome = false;
	$scope.editEmail = false;
	$scope.editTelefono = false;
	$scope.editPassword = false;
	$scope.editDatiSpedizione = false;

	$scope.listaPreferiti = [];
	loginService.getUserAttributes().then(
		function (attList){
			console.log(attList);
			attList.forEach(function (a){
				if (a.Name == "email" ){
					$scope.email = a.Value;
				}
				if (a.Name == "custom:telefono" ){
					$scope.tel = a.Value;
				}
				if (a.Name == "name" ){
					$scope.nome = a.Value;
				}
				if (a.Name == "family_name" ){
					$scope.cognome = a.Value;
				}
				if (a.Name == "custom:nomeSpe" ){
					$scope.nomeSpe = a.Value;
				}
				if (a.Name == "custom:indSpe" ){
					$scope.indSpe = a.Value;
				}
				if (a.Name == "custom:indSpe2" ){
					$scope.indSpe2 = a.Value;
				}
				if (a.Name == "custom:capSpe" ){
					$scope.capSpe = a.Value;
				}
				if (a.Name == "custom:cittaSpe" ){
					$scope.cittaSpe = a.Value;
				}
				if (a.Name == "custom:nomeFat" ){
					$scope.nomeFat = a.Value;
				}
				if (a.Name == "custom:indFat" ){
					$scope.indFat = a.Value;
				}
				if (a.Name == "custom:indFat2" ){
					$scope.indFat2 = a.Value;
				}
				if (a.Name == "custom:capFatNum" ){
					$scope.capFat = a.Value;
				}
				if (a.Name == "custom:cittaFat" ){
					$scope.cittaFat = a.Value;
				}
			});
		},
		function (reason){
			console.log(reason);
		}
	);

	$scope.cambiaTelefono = function(tel){
		var attributeList = [];
	    var attribute = {
	        Name : 'custom:telefono',
	        Value : $scope.tel
	    };
	    attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
	    attributeList.push(attribute);
		loginService.updateAttributes(attributeList).then(
				function (res){
					console.log(res);
					$scope.reloadAttributes();
					$scope.openMessageModal("Dati cambiati con successo");
					//$scope.openMessageModal("Telefono cambiata con successo");
				},
				function (reason){
					console.log(reason);
				}
		);
	};

	$scope.modificaNome = function(){
		$scope.editNome = true;	
	};

	$scope.annullaModificaNome = function(){
		$scope.editNome = false;	
	};

	$scope.modificaEmail = function(){
		$scope.editEmail = true;	
	};

	$scope.annullaModificaEmail = function(){
		$scope.editEmail = false;	
	};

	$scope.modificaTelefono = function(){
		$scope.editTelefono = true;	
	};

	$scope.annullaModificaTelefono = function(){
		$scope.editTelefono = false;	
	};

	$scope.modificaPassword = function(){
		$scope.editPassword = true;	
	};

	$scope.annullaModificaPassword = function(){
		$scope.editPassword = false;	
	};

	$scope.modificaDatiSpedizione = function(){
		$scope.editDatiSpedizione = true;	
	};

	$scope.annullaModificaDatiSpedizione = function(){
		$scope.editDatiSpedizione = false;	
	};

	$scope.cambiaNome = function(nome, cognome){
			var attributeList = [];
		    var attribute = {
		        Name : 'name',
		        Value : nome
		    };
		    attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
		    attributeList.push(attribute);
		    var attribute1 = {
			        Name : 'family_name',
			        Value : cognome
			    };
		    attribute1 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute1);
		    attributeList.push(attribute1);
			loginService.updateAttributes(attributeList).then(
					function (res){
						console.log(res);
						$scope.reloadAttributes();
						$scope.openMessageModal("Dati cambiati con successo");
						$scope.editNome = false;
					},
					function (reason){
						$scope.openMessageModal("Problemi nell'aggiornamento dei dati: " + reason);
						$scope.editNome = false;
					}
			);
	};
	
	$scope.cambiaEmail = function(email, email1){
		if (email == email1){
			var attributeList = [];
		    var attribute = {
		        Name : 'email',
		        Value : email
		    };
		    attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
		    attributeList.push(attribute);
			loginService.updateAttributes(attributeList).then(
					function (res){
						console.log(res);
						$scope.reloadAttributes();
						$scope.openMessageModal("Dati cambiati con successo");
						//$scope.openMessageModal("Email cambiata con successo");
						$scope.editEmail = false;
					},
					function (reason){
						$scope.openMessageModal("Problemi nell'aggiornamento dei dati: " + reason);
						$scope.editEmail = false;
					}
			);
		}else {
			$scope.openMessageModal("le email non corrispondono");
		}	
	};

	$scope.cambiaTelefono = function(telefono){
		var attributeList = [];
		var attribute = {
			Name : 'custom:telefono',
			Value : telefono
		};
		attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
		attributeList.push(attribute);
		loginService.updateAttributes(attributeList).then(
				function (res){
					console.log(res);
					$scope.reloadAttributes();
					$scope.openMessageModal("Dati cambiati con successo");
					//$scope.openMessageModal("Email cambiata con successo");
					$scope.editTelefono = false;
				},
				function (reason){
					$scope.openMessageModal("Problemi nell'aggiornamento dei dati: " + reason);
					$scope.editTelefono = false;
				}
		);
	};

	
	$scope.cambiaPassword = function(o, n, n1){
		if (n == n1){
			loginService.changePassword(o, n).then (
				function (res){
					console.log(res);
					$scope.reloadAttributes();
					$scope.openMessageModal("Dati cambiati con successo");
					//$scope.openMessageModal("Password cambiata con successo");
				},
				function (reason){
					console.log(reason);
					$scope.openMessageModal("Errore nel cambio password");
				}
			);
		}else{
			$scope.openMessageModal("Le password non corrispondono");
		}
		
	};
	
	$scope.cambiaIndirizzoSpedizione = function (ns, i1s , cs, caps){
		var attributeList = [];
	    var attribute = {
	        Name : 'custom:nomeSpe',
	        Value : ns
	    };
	    attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
	    attributeList.push(attribute);
		var attribute1 = {
		        Name : 'custom:indSpe',
		        Value : i1s
		    };
		attribute1 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute1);
		attributeList.push(attribute1);
	    var attribute3 = {
		        Name : 'custom:cittaSpe',
		        Value : cs
		    };
		attribute3 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute3);
		attributeList.push(attribute3);
		var attribute4 = {
		        Name : 'custom:capSpe',
		        Value : caps
		    };
		attribute4 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute4);
	    attributeList.push(attribute4);
		loginService.updateAttributes(attributeList).then(
				function (res){
					console.log(res);
					$scope.reloadAttributes();
					if($scope.pendingCheckout){
						$scope.setPendingCheckout(false);
						$scope.changePath('/checkout');
					}
					$scope.editDatiSpedizione = false;
					$scope.openMessageModal("Dati Aggiornati correttamente");
				},
				function (reason){
					console.log(reason);
				}
		);
	};
	
	$scope.cambiaIndirizzoFatturazione = function (nomeFatturazione, indirizzo1Fatturazione , indirizzo2Fatturazione, cittaFatturazione, capFatturazione){
		var attributeList = [];
	    var attribute = {
	        Name : 'custom:nomeFat',
	        Value : nomeFatturazione
	    };
	    attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
	    attributeList.push(attribute);
		var attribute1 = {
		        Name : 'custom:indFat',
		        Value : indirizzo1Fatturazione
		    };
		attribute1 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute1);
		attributeList.push(attribute1);
		var attribute2 = {
		        Name : 'custom:indFat2',
		        Value : indirizzo2Fatturazione
		    };
	    attribute2 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute2);
	    attributeList.push(attribute2);
	    var attribute3 = {
		        Name : 'custom:cittaFat',
		        Value : cittaFatturazione
		    };
		attribute3 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute3);
		attributeList.push(attribute3);
		var attribute4 = {
		        Name : 'custom:capFatNum',
		        Value : capFatturazione
		    };
		attribute4 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute4);
	    attributeList.push(attribute4);
		loginService.updateAttributes(attributeList).then(
				function (res){
					console.log(res);
				},
				function (reason){
					console.log(reason);
				}
		);
	};
	
}]);
