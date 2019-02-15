angular.module("applicationModule").controller("cambioPasswordController", ["$scope", "loginService", "$location", function($scope, loginService, getOrdiniService, $location) {
	var cambioPasswordController = this;

	cambioPasswordController.cognitoUserPasswordChange = null;

	$scope.codiceVerifica = "";
	$scope.passwordCP = "";
	$scope.passwordRepeatCP = "";


	cambioPasswordController.init = function () {		
		//avvio
		loginService.forgotPasswordInput($scope.getChangePasswordEmail());
	};

	cambioPasswordController.submit = function(){

		//verifiche di validità

		cambioPasswordController.cognitoUserPasswordChange.confirmPassword($scope.codiceVerifica, $scope.passwordCP, {
			onSuccess: function(result){
				$scope.openMessageModal('Aggiornamento Password avventuto correttamente');
				$scope.changePath('/accedi');
			},
			onFailure: function(err){
				$scope.openMessageModal('Aggiornamento Password non possibile: ' + err);
			}
		});
	};

	cambioPasswordController.passwordUguali = function(){
		return $scope.passwordCP != "" && $scope.passwordRepeatCP != "" && $scope.passwordRepeatCP == $scope.passwordCP;
	};

	$scope.$on("insertConfirmData", function(event, data){
		cambioPasswordController.cognitoUserPasswordChange = data.data.cognitoUser;
	});
}]);
