angular.module("applicationModule").controller("profiloController", ["$scope", "getConfigurazioniService", "loginService",
	function($scope, getConfigurazioniService, loginService) {

	$scope.listaPreferiti = [];
	loginService.getUserAttributes().then(
		function (attList){
			console.log(attList);
			attList.forEach(function (a){
				if (a["Name"] == "email" ){
					$scope.email = a["Value"];
				}
				if (a["Name"] == "custom:telefono" ){
					$scope.tel = a["Value"];
				}
				if (a["Name"] == "name" ){
					$scope.nome = a["Value"];
				}
				if (a["Name"] == "family_name" ){
					$scope.cognome = a["Value"];
				}
				if (a["Name"] == "custom:nomeSpe" ){
					$scope.nomeSpe = a["Value"];
				}
				if (a["Name"] == "custom:indSpe" ){
					$scope.indSpe = a["Value"];
				}
				if (a["Name"] == "custom:indSpe2" ){
					$scope.indSpe2 = a["Value"];
				}
				if (a["Name"] == "custom:capSpeNum" ){
					$scope.capSpe = a["Value"];
				}
				if (a["Name"] == "custom:cittaSpe" ){
					$scope.cittaSpe = a["Value"];
				}
				if (a["Name"] == "custom:nomeFat" ){
					$scope.nomeFat = a["Value"];
				}
				if (a["Name"] == "custom:indFat" ){
					$scope.indFat = a["Value"];
				}
				if (a["Name"] == "custom:indFat2" ){
					$scope.indFat2 = a["Value"];
				}
				if (a["Name"] == "custom:capFatNum" ){
					$scope.capFat = a["Value"];
				}
				if (a["Name"] == "custom:cittaFat" ){
					$scope.cittaFat = a["Value"];
				}
			})
		},
		function (reason){
			console.log(reason)
		}
	)	
//		getConfigurazioniService.response("john@bea.com").then(function (data) {
//			$scope.listaPreferiti = data.data.configurazioni;
//			console.log(data);
//			console.log($scope.listaPreferiti);
//
//		})

	$scope.cambiaTelefono = function(tel){
		var attributeList = [];
	    var attribute = {
	        Name : 'custom:telefono',
	        Value : $scope.tel
	    };
	    var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
	    attributeList.push(attribute);
		loginService.updateAttributes(attributeList).then(
				function (res){
					console.log(res)
				},
				function (reason){
					console.log(reason)
				}
		)
	}

	$scope.cambiaNome = function(nome, cognome){
			var attributeList = [];
		    var attribute = {
		        Name : 'name',
		        Value : nome
		    };
		    var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
		    attributeList.push(attribute);
		    var attribute1 = {
			        Name : 'family_name',
			        Value : cognome
			    };
		    var attribute1 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute1);
		    attributeList.push(attribute1);
			loginService.updateAttributes(attributeList).then(
					function (res){
						console.log(res)
					},
					function (reason){
						console.log(reason)
					}
			)
	}
	
	$scope.cambiaEmail = function(email, email1){
		if (email == email1){
			var attributeList = [];
		    var attribute = {
		        Name : 'email',
		        Value : email
		    };
		    var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
		    attributeList.push(attribute);
			loginService.updateAttributes(attributeList).then(
					function (res){
						console.log(res)
					},
					function (reason){
						console.log(reason)
					}
			)
		}else {
			alert ("le email non corrispondono");
		}	
	}
	
	$scope.cambiaPassword = function(o, n, n1){
		if (n == n1){
			loginService.changePassword(o, n).then (
				function (res){
					console.log(res);
					alert("Password cambiata con successo");
				},
				function (reason){
					console.log(reason)
					allert ("Errore nel cambio password");
				}
			)
		}else{
			alert ("Le password non corrispondono");
		}
		
	}
	
	$scope.cambiaIndirizzoSpedizione = function (ns, i1s , cs, caps){
		var attributeList = [];
	    var attribute = {
	        Name : 'custom:nomeSpe',
	        Value : ns
	    };
	    var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
	    attributeList.push(attribute);
		var attribute1 = {
		        Name : 'custom:indSpe',
		        Value : i1s
		    };
		var attribute1 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute1);
		attributeList.push(attribute1);
	    var attribute3 = {
		        Name : 'custom:cittaSpe',
		        Value : cs
		    };
		var attribute3 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute3);
		attributeList.push(attribute3);
		var attribute4 = {
		        Name : 'custom:capSpeNum',
		        Value : $scope.capSpe
		    };
		var attribute4 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute4);
	    attributeList.push(attribute4);
		loginService.updateAttributes(attributeList).then(
				function (res){
					console.log(res)
				},
				function (reason){
					console.log(reason)
				}
		)
	}
	
	$scope.cambiaIndirizzoFatturazione = function (nomeFatturazione, indirizzo1Fatturazione , indirizzo2Fatturazione, cittaFatturazione, capFatturazione){
		var attributeList = [];
	    var attribute = {
	        Name : 'custom:nomeFat',
	        Value : nomeFatturazione
	    };
	    var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
	    attributeList.push(attribute);
		var attribute1 = {
		        Name : 'custom:indFat',
		        Value : indirizzo1Fatturazione
		    };
		var attribute1 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute1);
		attributeList.push(attribute1);
		var attribute2 = {
		        Name : 'custom:indFat2',
		        Value : indirizzo2Fatturazione
		    };
	    var attribute2 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute2);
	    attributeList.push(attribute2);
	    var attribute3 = {
		        Name : 'custom:cittaFat',
		        Value : cittaFatturazione
		    };
		var attribute3 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute3);
		attributeList.push(attribute3);
		var attribute4 = {
		        Name : 'custom:capFatNum',
		        Value : capFatturazione
		    };
		var attribute4 = new AmazonCognitoIdentity.CognitoUserAttribute(attribute4);
	    attributeList.push(attribute4);
		loginService.updateAttributes(attributeList).then(
				function (res){
					console.log(res)
				},
				function (reason){
					console.log(reason)
				}
		)
	}
	
}]);
