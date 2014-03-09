(function () {
    'use strict'

    var app = angular.module('itmsApp', [
        'ngRoute',
        'ui.bootstrap',
        'common.directives'
    ]);

    // app.run until app.config finished!!! this is important
    app.run(function ($rootScope, $templateCache, $location, config) {
        if (config.mode === 'development') {
          //  $templateCache.removeAll();
        }
        $location.path('/');
        console.log('app started!!!!');
    });
}());
