(function() {
    'use strict'

    var app = angular.module('itmsApp', ['ngRoute', 'ngAnimate']);

    // app.run until app.config finished!!! this is important
    app.run(function($location) {
        $location.path('/');
        console.log('app started!!!!');
    });
}());
