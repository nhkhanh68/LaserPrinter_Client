'use strict';

// Declare app level module which depends on views, and components
angular.module('services', []);
angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    'ngRoute',
    'services',
    'angular-md5'
]).
config(['$locationProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.hashPrefix('');
        if (sessionStorage["User-Data"] == null) {
            $routeProvider
                .when("/login", {
                    templateUrl: "/main/login.html",
                    controller: "mainCtrl"
                }).otherwise({ redirectTo: "/login" });
        } else {
            // $urlRouterProvider.otherwise('/partner/contract');
            $stateProvider
                .state('/404', {
                    url: '/404',
                    templateUrl: '404.html'
                })
                .state('/table', {
                    url: '/table',
                    templateUrl: '/main/views/table/table.html'
                })
        }
    }]);