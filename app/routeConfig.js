(function () {
    'use strict'

    var app = angular.module('itmsApp');

    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/templates/myiTMS.html'
            })
            .when('/dashboard', {
                templateUrl: 'app/templates/myiTMS.html'
            })
            .when('/transportation/maintainNetwork', {
                templateUrl: 'app/templates/transportation/maintainNetwork.html',
                controller: "networkCtrl",
                resolve: {
                    orderlist: orderReteiver
                }
            })
            .when('/transportation/eomaintain', {
                templateUrl: 'app/templates/transportation/lotusEOMaintain.html'
            })
            .when('/transportation/eomaintain3rd', {
                templateUrl: 'app/templates/transportation/lotusEOMaintain3RD.html'
            })
            .when('/transportation/lotusnewer', {
                templateUrl: 'app/templates/transportation/lotusNewER.html'
            })
            .when('/transportation/eomaintainevent', {
                templateUrl: 'app/templates/transportation/lotusEOMaintainEvent.html'
            })
            .when('/requirement/myer', {
                templateUrl: 'app/templates/requirement/itmsMyER.html'
            })
            .when('/requirement/ermaintain', {
                templateUrl: 'app/templates/requirement/lotusERMaintain.html'
            })
            .when('/requirement/ermaintain2', {
                templateUrl: 'app/templates/requirement/lotusERMaintain2.html'
            })
            .when('/requirement/requirementupload', {
                templateUrl: 'app/templates/requirement/LotusdropzoneSingle.html'
            })
            .when('/planning/eoassign', {
                templateUrl: 'app/templates/planning/lotusEOAssign.html'
            })
            .when('/planning/eoassignad', {
                templateUrl: 'app/templates/planning/lotusEOAssignAD.html'
            })
            .when('/planning/autoassign', {
                templateUrl: 'app/templates/planning/lotusEOAuto.html'
            })
            .when('/planning/booking', {
                templateUrl: 'app/templates/planning/lotusBooking.html'
            })
            .when('/blankfunction', {
                templateUrl: 'app/templates/lotusblankFunction.html'
            })
            .otherwise({ redirectTo: '/' });


        orderReteiver.$inject = ['$q', 'orderService'];
        function orderReteiver($q, orderService) {
            var deferred = $q.defer();
            orderService.queryAll()
                .then(function (result) {
                    deferred.resolve(result);
                });
            return deferred.promise;
        }

        //$locationProvider.html5Mode(true);
    });
}());
