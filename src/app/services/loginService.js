angular.module("applicationModule").service("loginService", function($q) {
	
    this.userPool = null;
	this.cognitoUser = null;
	
    this.getUserPool = function(){
    	if (this.userPool == null){
		    var data = { 
					  UserPoolId : 'eu-central-1_NMPGOZAz3',
				      ClientId : '1qet3gt3jpfaa5dcalbr9iq3ca'
				    };
		    this.userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
    	}
		return this.userPool;
    };
    
    this.getCognitoUser = function (){
    	if(this.cognitoUser == null){
    		var userPool = this.getUserPool();
    		this.cognitoUser = userPool.getCurrentUser();   		
    	}
    	return this.cognitoUser;
    };
	
	this.getPostAccessToken = function(){
		var cognitoUser = this.getCognitoUser();
		if (cognitoUser != null) {
			return cognitoUser.signInUserSession.idToken.jwtToken;
		}else{
			deferred.reject("non sei loggato");
			return "";
		}
	};

    this.getSession = function () {
    	 var deferred = $q.defer();
    	 var cognitoUser = this.getCognitoUser();
		 if (cognitoUser != null) {
			cognitoUser.getSession(function (err, session) {
				if (err) {
					deferred.reject(err);
					alert(err.message);
					return;
				}
				deferred.resolve(session);
			});
		}else{
			deferred.reject("non sei loggato");
		}
		return deferred.promise;
    };
    
	this.signUp = function(email, nome, cognome, password){
		var username = nome + "-" + cognome;
		
	    var userPool = this.getUserPool();

	    var attributeList = [];
	    
	    var dataEmail = {
	        Name : 'email',
	        Value : email
	    };
	    
	    var dataName = {
	    	Name : 'name',
	    	Value : nome
	    };
	    
	    var dataFamilyName = {
    		Name : 'family_name',
    		Value : cognome
	    };
	    
	    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
	    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
	    var attributeFamilyName = new AmazonCognitoIdentity.CognitoUserAttribute(dataFamilyName);
	    
		attributeList.push(attributeEmail);
		attributeList.push(attributeName);
		attributeList.push(attributeFamilyName);

	    //attributeList.push(attributePhoneNumber);
	    var deferred = $q.defer();
	    userPool.signUp(username, password, attributeList, null, function(err, result){
	        if (err) {
				deferred.reject (err);
				alert("Errore durante registrazione: " + err.message);
	            return;
	        }
	        cognitoUser = result.user;
	        console.log('user name is ' + cognitoUser.getUsername());
	        this.cognitoUser = cognitoUser;
	        deferred.resolve (cognitoUser);
	    });
	    return deferred.promise;
	};
	
	this.login = function(email, password){
		var authenticationData = {
		        Username : email,
		        Password : password,
		    };
	    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

	    var userPool = this.getUserPool();
	    var userData = {
	        Username : email,
	        Pool : userPool
	    };
	    this.cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
	    var deferred = $q.defer();
	    this.cognitoUser.authenticateUser(authenticationDetails, {
	        onSuccess: function (result) {
	                console.log (result);
	                deferred.resolve (result);

	            },
	        onFailure: function(err) {
	            console.log(err);
	            deferred.reject (err);
	        },
	    });
	    return deferred.promise;
	};
	
	this.getCurrentUser = function (){
		var deferred = $q.defer();
	    var cognitoUser = this.getCognitoUser();

	    if (cognitoUser != null) {
	        cognitoUser.getSession(function(err, session) {
	            if (err) {
	            	deferred.reject(err);
	               alert(err.message);
	                return;
	            }
	            deferred.resolve(cognitoUser);
	            console.log(session);
	            console.log('session validity: ' + session.isValid());
	        });
	    }
		return deferred.promise;
	};
	
	this.logOut = function (){
	    var cognitoUser = this.getCognitoUser();
	    if (cognitoUser == null){
			deferred.reject ('non sei loggato');
            return deferred.promise;
		}
	    cognitoUser.signOut();
	    this.userPool = null;
		this.cognitoUser = null;
	    console.log("logOut");
	};
	
	this.getSession = function (){
	    var deferred = $q.defer();

	    var cognitoUser = this.getCognitoUser();
	   
	    if (cognitoUser != null) {
	    	console.log(cognitoUser);
	        cognitoUser.getSession(function(err, session) {
	            if (err) {
	            	deferred.reject('error');
	            	return deferred.promise;
	            }
	            console.log('session validity: ' + session.isValid());
	            console.log(session);
	            deferred.resolve(session);
	        });
	        
	    }else{
	    	deferred.reject ('non sei loggato');
	          return deferred.promise;
	    }
	    return deferred.promise;
	};
	
	this.forgotPassword = function(){
		var deferred = $q.defer();
		var cognitoUser = this.getCognitoUser();
		if (cognitoUser == null){
			deferred.reject ('non sei loggato');
            return deferred.promise;
		}
	    cognitoUser.forgotPassword({
	        onSuccess: function (result) {
	            console.log('call result: ' + result);
	            deferred.resolve(result);
	        },
	        onFailure: function(err) {
	            alert(err.message);
	            console.log(err.message);
	            deferred.reject (err);
	        },
	        inputVerificationCode: function() {
	            var verificationCode = prompt('Please input verification code ' ,'');
	            var newPassword = prompt('Enter new password ' ,'');
	            cognitoUser.confirmPassword(verificationCode, newPassword, this);
	        }
	    });
	    return deferred.promise;
	};
	
	this.changePassword = function(oldp, newp){
		var deferred = $q.defer();
		var cognitoUser = this.getCognitoUser();
		if (cognitoUser == null){
			deferred.reject ('non sei loggato');
            return deferred.promise;
		}
		cognitoUser.changePassword(oldp, newp, function(err, result) {
	        if (err) {
	            alert(err.message);
	            console.log(err.message);
	            deferred.reject (err);
	            return deferred.promise;
	        }
	        deferred.resolve (result);
	        console.log('call result: ' + result);
	    });
		return deferred.promise;
	};
	
	this.deleteUser = function(){
		var deferred = $q.defer();
		var cognitoUser = this.getCognitoUser();
		if (cognitoUser == null){
			deferred.reject ('non sei loggato');
            return deferred.promise;
		}
		cognitoUser.deleteUser(function(err, result) {
	        if (err) {
	            alert(err.message);
	            console.log(err.message);
	            deferred.reject (err);
	            return deferred.promise;
	        }
	        console.log('call result: ' + result);
	        deferred.resolve (result);
	    });
		return deferred.promise;
	};
	
	this.isLoggedIn = function(){
		return this.getCognitoUser() != null;
	};

	this.getUserAttributes = function (){
		var deferred = $q.defer();
		var cognitoUser = this.getCognitoUser();
		if (cognitoUser == null){
			deferred.reject ('non sei loggato');
            return deferred.promise;
		}
		cognitoUser.getUserAttributes(function(err, result) {
	        if (err) {
	            alert(err.message);
	            console.log(err.message);
	            deferred.reject (err);
	            return deferred.promise;
	        }
	        for (i = 0; i < result.length; i++) {
	            console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
	        }
	        deferred.resolve (result);
	    });
		return deferred.promise;
	};
	
	this.setDeviceStatusRemembered= function (){
		var userPool = this.getUserPool();
	    var cognitoUser = this.getCognitoUser();
		var deferred = $q.defer();
		if (cognitoUser != null){
			cognitoUser.setDeviceStatusRemembered({
		        onSuccess: function (result) {
		        	deferred.resolve (result);
		            console.log('call result: ' + result);
		        },
		        onFailure: function(err) {
		        	deferred.reject (err);
		            alert(err.message);
		            console.log(err.message);
		        }
		    });
		}else{
			deferred.reject("non connesso");
		}
		return deferred.promise;
	};
	
	this.setDeviceStatusNotRemembered = function(){
	    var cognitoUser = this.getCognitoUser();
		var deferred = $q.defer();
		if (cognitoUser != null){
			cognitoUser.setDeviceStatusNotRemembered({
		        onSuccess: function (result) {
		        	deferred.resolve (result);
		            console.log('call result: ' + result);
		        },
		    onFailure: function(err) {
		            alert(err.message);
		            console.log(err.message);
		            deferred.reject (err);
		        }
		    });
		}else{
			deferred.reject("non connesso");
		}
		return deferred.promise;
	};
	
	this.forgotDevice= function (){
	    var cognitoUser = this.getCognitoUser();
		var deferred = $q.defer();
	  cognitoUser.forgetDevice({
	        onSuccess: function (result) {
	        	deferred.resolve (result);
	            console.log('call result: ' + result);
	        },
	        onFailure: function(err) {
	        	deferred.reject (err);
	            alert(err.message);
	            console.log(err.message);
	        }
	    });
	  return deferred.promise;
	};
	
	this.updateAttributes = function(attributeList){
		var cognitoUser = this.getCognitoUser();
		var deferred = $q.defer();
	    cognitoUser.updateAttributes(attributeList, function(err, result) {
	        if (err) {
	            deferred.reject (err);
	            return;
	        }
	        deferred.resolve (result);
	        console.log('call result: ' + result);
	    });
	    return deferred.promise;
	};
	
});