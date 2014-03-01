(function() {
    'use strict'

    var app = angular.module('itmsApp');

    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'app/templates/myiTMS.html'
            })
            .when('/maintainNetwork', {
                templateUrl: 'app/templates/maintainNetwork.html'
            })
            .when('/eomaintain', {
                templateUrl: 'app/templates/lotusEOMaintain.html'
            });

        //$locationProvider.html5Mode(true);
    });
}());
