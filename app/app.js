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
config(['$locationProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider',
    function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
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
                    templateUrl: 'main/student.html',
                    controller: function($rootScope) {
                        $rootScope.title = "Quản lý thư viện";
                    }
                })
                .state('/partner.information', {
                    url: '/information',
                    views: {
                        '': {
                            templateUrl: 'main/views/partner/partner.all.html',
                            // controller: 'partnerCtrl'
                        },
                        'contract@/partner.information': {
                            templateUrl: 'main/views/partner/partner.contract.html',
                            // controller: 'partnerCtrl'
                        },
                        'activity@/partner.information': {
                            templateUrl: 'main/views/partner/partner.annualActivity.html',
                            // controller: 'partnerCtrl'
                        },
                        'information@/partner.information': {
                            templateUrl: 'main/views/partner/partner.information.html',
                            // controller: 'partnerCtrl'
                        },
                        'contact@/partner.information': {
                            templateUrl: 'main/views/partner/partner.contact.html',
                            // controller: 'partnerCtrl'
                        }
                    }
                })
                .state('/patient', {
                    url: '/patient',
                    // templateUrl: 'main/patient.html',
                    // controller: function($rootScope) {
                    //     $rootScope.title = "Quản lý khám bệnh";
                    // },
                    views: {
                        '': {
                            templateUrl: 'main/patient.html'
                        },
                        'tinhtranglucsinh@/patient': {
                            templateUrl: 'main/patient/tinhtranglucsinh.html'
                        },
                        'khuyettat@/patient': {
                            templateUrl: 'main/patient/khuyettat.html'
                        },
                        'tiensugiadinh@/patient': {
                            templateUrl: 'main/patient/tiensugiadinh.html'
                        },
                        'tiensuphauthuat@/patient': {
                            templateUrl: 'main/patient/tiensuphauthuat.html'
                        },
                        'tiensubenhtat@/patient': {
                            templateUrl: 'main/patient/tiensubenhtat.html'
                        },
                        'suckhoesinhsan@/patient': {
                            templateUrl: 'main/patient/suckhoesinhsan.html'
                        },
                        'cacbenhkhac@/patient': {
                            templateUrl: 'main/patient/cacbenhkhac.html'
                        },
                        'thongtincanhan@/patient': {
                            templateUrl: 'main/patient/thongtincanhan.html'
                        },
                        // modal,
                        'tinhtranglucsinhModal@/patient': {
                            templateUrl: 'main/patient/modal/tinhtranglucsinh.html'
                        },
                        'khuyettatModal@/patient': {
                            templateUrl: 'main/patient/modal/khuyettat.html'
                        },
                        'tiensugiadinhModal@/patient': {
                            templateUrl: 'main/patient/modal/tiensugiadinh.html'
                        },
                        'tiensuphauthuatModal@/patient': {
                            templateUrl: 'main/patient/modal/tiensuphauthuat.html'
                        },
                        'tiensubenhtatModal@/patient': {
                            templateUrl: 'main/patient/modal/tiensubenhtat.html'
                        },
                        'suckhoesinhsanModal@/patient': {
                            templateUrl: 'main/patient/modal/suckhoesinhsan.html'
                        },
                        'cacbenhkhacModal@/patient': {
                            templateUrl: 'main/patient/modal/cacbenhkhac.html'
                        },
                        'thongtincanhanModal@/patient': {
                            templateUrl: 'main/patient/modal/thongtincanhan.html'
                        },
                        // phieu kham
                        'phieukham@/patient': {
                            templateUrl: 'main/patient/phieukham/phieukham.html'
                        },
                        'benhsu@/patient': {
                            templateUrl: 'main/patient/phieukham/benhsu.html'
                        },
                        'thamkhamlamsang@/patient': {
                            templateUrl: 'main/patient/phieukham/thamkhamlamsang.html'
                        },
                        'canlamsang@/patient': {
                            templateUrl: 'main/patient/phieukham/canlamsang.html'
                        },
                        'chuandoan@/patient': {
                            templateUrl: 'main/patient/phieukham/chuandoan.html'
                        },
                        'thongtinbenhnhan@/patient': {
                            templateUrl: 'main/patient/phieukham/thongtinbenhnhan.html'
                        },
                        // modal
                        'benhsuModal@/patient': {
                            templateUrl: 'main/patient/modal/phieukhamModal/benhsumodal.html'
                        },
                        'thamkhamlamsangModal@/patient': {
                            templateUrl: 'main/patient/modal/phieukhamModal/thamkhamlamsangmodal.html'
                        },
                        'canlamsangModal@/patient': {
                            templateUrl: 'main/patient/modal/phieukhamModal/canlamsangmodal.html'
                        },
                        'chuandoanModal@/patient': {
                            templateUrl: 'main/patient/modal/phieukhamModal/chuandoanmodal.html'
                        },
                    }
                })
                .state('/guixe', {
                    url: '/guixe',
                    templateUrl: 'main/guixe.html',
                    controller: function($rootScope) {
                        $rootScope.title = "Quản lý gửi xe";
                    }
                })
                .state('/nhanvien', {
                    url: '/nhanvien',
                    templateUrl: 'main/nhanvien.html',
                    controller: function($rootScope) {
                        $rootScope.title = "Quản lý gửi xe";
                    }
                });
        }
    }
]);