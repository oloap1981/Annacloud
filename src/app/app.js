var app = angular.module('applicationModule', ['ngTouch', 'ngAnimate', 'ui.swiper', 'ui.bootstrap', 'ui.select', 'ngSanitize', 'ngRoute', 'angular-jwt', 'updateMeta', 'angular-page-loader', 'pascalprecht.translate', 'ngclipboard'])
.directive('paypalContent', function(){
	return {
		restrict: 'E',
		scope: false,
		templateUrl: 'views/paypalComponent.html'
	};
}).directive('checkoutContent', function () {
   return {
	   restrict: 'E',
	   scope: {
		   customerInfo: '=info'
	   },
	   templateUrl: 'views/checkoutContent.html'
   };
});

/*app.directive("ngMobileClick", [function () {
	return function (scope, elem, attrs) {
		elem.bind("touchstart click", function (e) {
			e.preventDefault();
			e.stopPropagation();

			scope.$apply(attrs["ngMobileClick"]);
		});
	}
}])*/

app.config(['$routeProvider', '$translateProvider', '$translatePartialLoaderProvider', '$locationProvider', '$compileProvider', function ($routeProvider, $translateProvider, $translatePartialLoaderProvider, $locationProvider, $compileProvider) {
	
	$routeProvider.
	when('/', {
		templateUrl: 'views/homeContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/home', {
		templateUrl: 'views/homeContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/accedi', {
		templateUrl: 'views/accessoContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/ordini', {
		templateUrl: 'views/ordiniContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/profilo', {
		templateUrl: 'views/profiloContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/preferiti', {
		templateUrl: 'views/preferitiContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/carrello', {
		templateUrl: 'views/carrelloContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/checkout', {
		templateUrl: 'views/checkoutContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/collezione', {
		templateUrl: 'views/collezioneContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/visione', {
		templateUrl: 'views/visioneContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/esperienza',  {
		templateUrl: 'views/esperienzaContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/chi-siamo',  {
		templateUrl: 'views/chiSiamoContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/contatti',  {
		templateUrl: 'views/contattiContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/configura/:id?',  {
		templateUrl: 'views/configuraContent.html',
		controller: 'unadunaConfiguratorController2',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/configurazione/:id',  {
		templateUrl: 'views/configurazioneContent.html',
		controller: 'configurazioneController',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/404',  {
		templateUrl: 'views/404.html'
	}).
	when('/admin-ordini', {
		templateUrl: 'views/adminOrdiniContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/admin-clienti', {
		templateUrl: 'views/adminClientiContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/conferma-newsletter', {
		templateUrl: 'views/confermaNewsletter.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	when('/cambio-password', {
		templateUrl: 'views/cambioPasswordContent.html',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	}).
	otherwise({
		redirectTo: '/',
		resolve: {
			translateReady: ['$translate', function($translate) {
				return $translate.onReady();
			}]
		}
	});

	//gestione testi e traduzioni
	$translatePartialLoaderProvider.addPart('home');
	$translateProvider.useSanitizeValueStrategy('sanitizeParameters');
	$translateProvider.preferredLanguage('it');
	$translateProvider.useLoader('$translatePartialLoader', {
		urlTemplate: 'https://s3.eu-central-1.amazonaws.com/unaduna-resources-bucket/i18n/{part}/{lang}.json'
	});
	
	
}]);
app.config(['$compileProvider', function ($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|javascript|data):/);
	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|javascript|data):/);
}]);
app.run(function ($rootScope, $translate) {
	$rootScope.$on('$translatePartialLoaderStructureChanged', function () {
		$translate.refresh();
	});
});