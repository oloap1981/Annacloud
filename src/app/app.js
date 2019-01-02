var app = angular.module('applicationModule', ['ngAnimate', 'ui.swiper', 'ui.bootstrap', 'ngRoute', 'angular-jwt'])
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
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	//$locationProvider.hashPrefix('');
	$routeProvider.
	when('/', {
		templateUrl: 'views/homeContent.html'
	}).
	when('/accedi', {
		templateUrl: 'views/accessoContent.html'
	}).
	when('/ordini', {
		templateUrl: 'views/ordiniContent.html'
	}).
	when('/profilo', {
		templateUrl: 'views/profiloContent.html'
	}).
	when('/preferiti', {
		templateUrl: 'views/preferitiContent.html'
	}).
	when('/carrello', {
		templateUrl: 'views/carrelloContent.html'
	}).
	when('/checkout', {
		templateUrl: 'views/checkoutContent.html'
	}).
	/*when('/come-funziona', {
		templateUrl: 'comefunzionaContent.html'
	}).
	when('/shop', {
		templateUrl: 'shopContent.html'
	}).*/
	when('/collezione', {
		templateUrl: 'views/collezioneContent.html'
	}).
	when('/visione', {
		templateUrl: 'views/visioneContent.html'
	}).
	when('/esperienza',  {
		templateUrl: 'views/esperienzaContent.html'
	}).
	when('/chi-siamo',  {
		templateUrl: 'views/contattiContent.html'
	}).
	when('/contatti',  {
		templateUrl: 'views/contattiContent.html'
	}).
	when('/configura',  {
		templateUrl: 'views/configuraContent.html',
		controller: 'unadunaConfiguratorController2'
	}).
	when('/404',  {
		templateUrl: 'views/404.html'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);
app.config(['$compileProvider', function ($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
}]);