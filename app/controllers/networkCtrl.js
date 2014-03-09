'use strict'

angular.module('itmsApp').controller('networkCtrl', function ($scope, orderlist) {


    // DO NOT REMOVE : GLOBAL FUNCTIONS!
    //pageSetUp();
    $.device = 'desktop';
    $.enableJarvisWidgets = true;

    runAllCharts();
    nav_page_height();

    // PAGE RELATED SCRIPTS
    //by default, the selected order is the first order in the order list
    $scope.orderlist = orderlist;
    $scope.selectedOrder = $scope.orderlist[0];


    $scope.showDetail = function (order) {
        $scope.selectedOrder = order;
        var $detailPanel = $('#wid-id-2s');
        var $toggleButton = $detailPanel.find('.jarviswidget-toggle-btn');
        if ($detailPanel.hasClass('jarviswidget-collapsed')) {
            $toggleButton.trigger('click');
        }
    };


});

angular.module('itmsApp').controller('eomaintainCtrl', function ($scope, orderService) {

});

angular.module('itmsApp').controller('eomaintain3rdCtrl', function ($scope, orderService) {

    // DO NOT REMOVE : GLOBAL FUNCTIONS!
    //pageSetUp();
    $.device = 'desktop';
    $.enableJarvisWidgets = true;

    runAllCharts();
    nav_page_height();
});

angular.module('itmsApp').controller('eventmanagementCtrl', function ($scope, orderService) {

    // DO NOT REMOVE : GLOBAL FUNCTIONS!
    //pageSetUp();
    $.device = 'desktop';
    $.enableJarvisWidgets = true;

    runAllCharts();
    nav_page_height();
});

angular.module('itmsApp').controller('dashboardCtrl', function ($scope) {

});

angular.module('itmsApp').controller('eoAssignCtrl', function ($scope, $modal, $log, orderService) {

    $scope.module = '计划';
    $scope.title = '需求分配';

    $scope.searchAssignableRequest = function () {
        orderService.queryAll().success(function (data) {
            $scope.orders = data;
        });
    };

    $scope.selectedItems = function () {
        return $scope.orders.filter(function (item) {
            return !!item.selected;
        });
    };

    $scope.columns = [
        {"mData": "number", "sTitle": "ER"},
        {"mData": "er", "sTitle": "ERITN"},
        {"mData": "type", "sTitle": "类型"},
        {"mData": "special", "sTitle": "特殊"},
        {"mData": "delivery", "sTitle": "发货方"},
        {"mData": "receiver", "sTitle": "收货方"},
        {"mData": "provice", "sTitle": "省"},
        {"mData": "city", "sTitle": "市"},
        {"mData": "distact", "sTitle": "区县"},
        {"mData": "deliveryDate", "sTitle": "送达日期"},
        {"mData": "deliveryMethod", "sTitle": "方式"},
        {"mData": "thirdParty", "sTitle": "第三方"}
    ];

    $scope.searchCriteria = {
        site: '',
        senderCode: 'AB00011',
        receiverCode: 'AB00012',
        senderLocation: 'AB00013',
        receiverLocation: 'AB00014',
        reset: function () {
            this.site = '';
            this.senderCode = '';
            this.receiverCode = '';
            this.senderLocation = '';
            this.receiverLocation = '';
        }
    };

    $scope.orders = [];

    $scope.mergeERRequest = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/templates/planning/mergeERRequest.html',
            controller: MergeERRequestCtrl,
            resolve: {
                items: function () {
                    return $scope.selectedItems();
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.adjustDeliveryMethod = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/templates/planning/adjustDeliveryMethod.html',
            controller: AdjustDeliveryMethodCtrl,
            resolve: {
                items: function () {
                    return $scope.selectedItems();
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.orders = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.searchSite = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/templates/planning/searchSite.html',
            controller: SearchSiteCtrl,
            resolve: {
                items: function () {
                    return $scope.selectedItems();
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.searchCustomer = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/templates/planning/searchCustomer.html',
            controller: SearchCustomerCtrl,
            resolve: {
                items: function () {
                    return $scope.selectedItems();
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.searchLocation = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/templates/planning/searchCustomer.html',
            controller: SearchLocationCtrl,
            resolve: {
                items: function () {
                    return $scope.selectedItems();
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

angular.module('itmsApp').controller('EOAssignAdjustCtrl', function ($scope, $modal, $log, orderService) {

    $scope.module = '计划';
    $scope.title = '分配调整';

    $scope.searchAssignableRequest = function () {
        orderService.queryAll().success(function (data) {
            $scope.orders = orderService.getRequirementPartial(data);
        });
    };

    $scope.selectedItems = function () {
        return $scope.orders.filter(function (item) {
            return !!item.selected;
        });
    };

    $scope.reallocate = function () {
        $.SmartMessageBox({
            title: "分配至其它运单",
            content: "请输入运单号",
            buttons: '[No][Yes]',
            input: "text",
            placeholder: "EO运单编号"
        }, function (option, value) {
            if (option === "Yes") {
                orderService.erAssignChange({
                    selectedItems: $scope.selectedItems(),
                    eoid: value
                }).success(function () {
                        $.smallBox({
                            title: "操作回执",
                            content: "<i class='fa fa-clock-o'></i> <i>已成功分配至订单 " + value + "</i>",
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 4000
                        });
                        $scope.searchAssignableRequest();
                    });
            }
            if (option === "No") {
                $.smallBox({
                    title: "操作回执",
                    content: "<i class='fa fa-clock-o'></i> <i>操作取消...</i>",
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 4000
                });
            }
        });
    };

    $scope.cancelAssignment = function () {
        $.SmartMessageBox({
            title: "提示信息!",
            content: "是否取消所选择记录的运单分配?",
            buttons: '[No][Yes]'
        }, function (option) {
            if (option === "Yes") {
                orderService.erDeleteAssignment({
                    selectedItems: $scope.selectedItems()
                }).success(function () {
                        $.smallBox({
                            title: "操作回执",
                            content: "<i class='fa fa-clock-o'></i> <i>已成功取消运单分配...</i>",
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 4000
                        });
                        $scope.searchAssignableRequest();
                    });
            }
            if (option === "No") {
                $.smallBox({
                    title: "操作回执",
                    content: "<i class='fa fa-clock-o'></i> <i>操作取消...</i>",
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 4000
                });
            }

        });
    };

    $scope.disableAction = function () {
        return $scope.selectedItems().length === 0;
    };

    $scope.columns = [
        {"mData": "eoID", "sTitle": "EO"},
        {"mData": "erID", "sTitle": "ER"},
        {"mData": "erITN", "sTitle": "ERITN"},
        {"mData": "erType", "sTitle": "类型"},
        {"mData": "erTag", "sTitle": "特殊"},
        {"mData": "depCustomer", "sTitle": "发货方"},
        {"mData": "recCustomer", "sTitle": "收货方"},
        {"mData": "customerOrder1", "sTitle": "客户订单号"},
        {"mData": "customerOrder2", "sTitle": "客户运单号"},
        {"mData": "customerOrder3", "sTitle": "客户出库号"},
        {"mData": "matIID", "sTitle": "物料"},
        {"mData": "packNum", "sTitle": "箱号"},
        {"mData": "amt", "sTitle": "件数"},
        {"mData": "reqDelDate", "sTitle": "送达日期"},
        {"mData": "ertrType", "sTitle": "方式"},
        {"mData": "ertrVendor", "sTitle": "第三方"}
    ];

    $scope.searchCriteria = {
        site: '',
        senderCode: 'AB00011',
        receiverCode: 'AB00012',
        senderLocation: 'AB00013',
        receiverLocation: 'AB00014',
        reset: function () {
            this.site = '';
            this.senderCode = '';
            this.receiverCode = '';
            this.senderLocation = '';
            this.receiverLocation = '';
        }
    };

    $scope.orders = [];

    $scope.searchSite = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/templates/planning/searchSite2.html',
            controller: SearchSiteCtrl,
            resolve: {
                items: function () {
                    return $scope.selectedItems();
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.searchDepCustomer = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/templates/planning/searchCustomer2.html',
            controller: SearchCustomerCtrl,
            resolve: {
                items: function () {
                    return $scope.selectedItems();
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.searchRecCustomer = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/templates/planning/searchCustomer2.html',
            controller: SearchCustomerCtrl,
            resolve: {
                items: function () {
                    return $scope.selectedItems();
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});


var MergeERRequestCtrl = function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.ok = function () {
        $modalInstance.close($scope.items);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var AdjustDeliveryMethodCtrl = function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.adjust = {
        deliveryMethod: '',
        vendor: ''
    }
    $scope.ok = function () {
        $scope.items.forEach(function (element) {
            if (!!element.selected) {
                element.deliveryMethod = $scope.adjust.deliveryMethod;
                element.thirdParty = $scope.adjust.vendor;
            }
        });
        $modalInstance.close($scope.items);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var SearchSiteCtrl = function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.adjust = {
        deliveryMethod: '',
        vendor: ''
    };
    $scope.ok = function () {
        $scope.items.forEach(function (element) {
            if (!!element.selected) {
                element.deliveryMethod = $scope.adjust.deliveryMethod;
                element.thirdParty = $scope.adjust.vendor;
            }
        });
        $modalInstance.close($scope.items);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var SearchCustomerCtrl = function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.adjust = {
        deliveryMethod: '',
        vendor: ''
    }
    $scope.ok = function () {
        $scope.items.forEach(function (element) {
            if (!!element.selected) {
                element.deliveryMethod = $scope.adjust.deliveryMethod;
                element.thirdParty = $scope.adjust.vendor;
            }
        });
        $modalInstance.close($scope.items);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var SearchLocationCtrl = function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.adjust = {
        deliveryMethod: '',
        vendor: ''
    }
    $scope.ok = function () {
        $scope.items.forEach(function (element) {
            if (!!element.selected) {
                element.deliveryMethod = $scope.adjust.deliveryMethod;
                element.thirdParty = $scope.adjust.vendor;
            }
        });
        $modalInstance.close($scope.items);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
