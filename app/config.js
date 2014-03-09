(function(){
    'use strict'

    var app = angular.module('itmsApp');

    var config = {
        version: '0.0.1',
        mode: 'production' //development or production
    };

    app.config(['$logProvider', function($logProvider){
        if($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);

    app.config(['$provide', function($provide){
        $provide.decorator('$exceptionHandler', function(){
            return function(exception, cause){
                var error = { exception: exception, cause: cause};
                throw error;
            };
        }); 
    }]);

    app.value('config', config);

}());
