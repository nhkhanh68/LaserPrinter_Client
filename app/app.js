'use strict';

// Declare app level module which depends on views, and components
angular.module('services', []);
angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    'ngRoute',
    'services',
    'angular-md5',
    'ngSanitize'
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
                .state('/student', {
                    url: '/student',
                    templateUrl: 'main/student.html'
                })
                .state('/patient', {
                    url: '/patient',
                    templateUrl: 'main/patient.html'
                })
                .state('/guixe', {
                    url: '/guixe',
                    templateUrl: 'main/guixe.html'
                })
                .state('/nhanvien', {
                    url: '/nhanvien',
                    templateUrl: 'main/nhanvien.html'
                });
        }
    }]);