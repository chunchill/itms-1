'use strict'

angular.module('itmsApp',['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('/maintainNetwork',{
                templateUrl: 'app/templates/maintainNetwork.html' 
            });
    });
