'use strict'

angular.module('itmsApp',['ngRoute'])
    .config(function($routeProvider,$locationProvider){
        $routeProvider
            .when('/maintainNetwork',{
                templateUrl: 'app/templates/maintainNetwork.html' 
            });
        
        //$locationProvider.html5Mode(true);
    });
