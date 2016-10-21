// app.js
var acquisitionApp = angular.module('acquisitionApp', ['ui.router', 'ngAnimate']);
var acquiURL = '/api/acquis';

acquisitionApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES
        .state('home', {
            url: '/',
            templateUrl: 'index.html'
        })
        
        // ADVERTISE WITH US PAGE
        .state('advertise', {
            url: '/advertise',
            templateUrl: 'advertise.html'      
        });
});
