'use strict'

angular.module('itmsApp').controller('networkCtrl', function($scope, orderService) {

    $scope.orderlist = orderService.queryAll();

    //by default, the selected order is the first order in the order list
    $scope.selectedOrder = $scope.orderlist[0];

    $scope.showDetail = function(order) {
        $scope.selectedOrder = order;
        var $detailPanel = $('#wid-id-2s');
        var $toggleButton = $detailPanel.find('.jarviswidget-toggle-btn');
        if ($detailPanel.hasClass('jarviswidget-collapsed')) {
            $toggleButton.trigger('click');
        }
    };
});
