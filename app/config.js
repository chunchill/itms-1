(function(){
    'use strict'

    var app = angular.module('itmsApp');

    var config = {
        version: '0.0.1',
        mode: 'development', //development or production
    };

    app.config(['$logProvider', function($logProvider){
        if($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    
    }]);

    app.value('config', config);

}());
