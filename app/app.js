(function() {
    'use strict'

    var app = angular.module('itmsApp', ['ngRoute']);

// app.run until app.config finished!!! this is important
    app.run(function(){
        console.log('app started!!!!');
    });
}());
