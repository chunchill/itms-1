'use strict'

angular.module('itmsApp').factory('orderService', function ($http, config) {

    var baseUrl = 'http://211.144.85.15:8080/ordermanagement/rest/';
    var searchUrl = baseUrl + 'ER/ERQuickSearch?SerType=AND&userID=&depAreaCode=&depCustomer=&depLocCode=&recCustomer=&recLocCode=&createDate=&ERITNStatus=ASGN&ERStatus=';

    function queryAllLocal() {
        return $http({method: 'GET', url: '/mock/order.json'});
    }

    function queryAllRemote() {
        return $http.post(searchUrl);
    }

    // data: {selectedItems:[], eoid:''}
    function erAssignChange(data) {
        var erid = data.selectedItems.map(function(item){
            return item.erID;
        });
        var eritn = data.selectedItems.map(function(item){
            return item.erITN;
        });
        var assignChange = baseUrl+'ER/ERAssignChange?ERID[]='+erid.join()+'&ERITN[]='+eritn.join()+'&EOID='+data.eoid;
        return $http.post(assignChange);
    }

    // data: {selectedItems:[]}
    function erDeleteAssignment(data) {
        var erid = data.selectedItems.map(function(item){
            return item.erID;
        });
        var eritn = data.selectedItems.map(function(item){
            return item.erITN;
        });
        var assignChange = baseUrl+'ER/ERAssignDel?ERID[]='+erid.join()+'&ERITN[]='+eritn.join();
        return $http.post(assignChange);
    }

    function getRequirementPartial(items) {
        return items.map(mapRequirement);

        function mapRequirement(item) {
            return {
                eoID: item.requirementDetail && item.requirementDetail.eoid,
                erID: item.requirementDetail && item.requirementDetail.pk.erID,
                erITN: item.requirementDetail && item.requirementDetail.pk.erITN,
                erType: item.requirement.erType,
                erTag: item.requirement.erTag,
                depCustomer: item.requirement.depCustomer,
                recCustomer: item.requirement.recCustomer,
                customerOrder1: item.requirement.customerOrder1,
                customerOrder2: item.requirement.customerOrder2,
                customerOrder3: item.requirement.customerOrder3,
                matIID: item.requirementDetail && item.requirementDetail.matIID,
                packNum: item.requirementDetail && item.requirementDetail.packNum,
                amt: item.requirementDetail && item.requirementDetail.amt,
                reqDelDate: item.requirement.reqDelDate,
                ertrType: item.requirement.erTRType,
                ertrVendor: item.requirement.ertrvendor
            };
        }
    }

    var orderService = {
        getRequirementPartial: getRequirementPartial,
        erAssignChange: erAssignChange,
        erDeleteAssignment: erDeleteAssignment
    };

    if (config.mode === 'development') {
        orderService.queryAll = queryAllLocal
    } else {
        orderService.queryAll = queryAllRemote
    }

    return orderService;
});
