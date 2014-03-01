//by default, the selected order is the first order in the order list
angular.module('itmsApp').controller('networkCtrl', function($scope) {
    $scope.orderlist = [{
        number: 'EO001', 
        er: 1,
        eritn: '001',
        type: '预付',
        special: 'nomal',
        delivery: 'General',
        receiver: 'nanjin',
        provice: 'jiangsu',
        city: 'nanjing',
        distact: 'xiaguan',
        deliveryDate: '2014-4-1',
        deliveryMethod: 'fly'
    },{
        number: 'EO001', 
        er: 1,
        eritn: '001',
        type: '预付',
        special: 'nomal',
        delivery: 'General',
        receiver: 'nanjin',
        provice: 'jiangsu',
        city: 'nanjing',
        distact: 'xiaguan',
        deliveryDate: '2014-4-1',
        deliveryMethod: 'fly'
    },{
        number: 'EO001', 
        er: 1,
        eritn: '001',
        type: '预付',
        special: 'nomal',
        delivery: 'General',
        receiver: 'nanjin',
        provice: 'jiangsu',
        city: 'nanjing',
        distact: 'xiaguan',
        deliveryDate: '2014-4-1',
        deliveryMethod: 'fly'
    }];

    //by default, the selected order is the first order in the order list
    $scope.selectedOrder = $scope.orderlist[0];

    $scope.showDetail = function(order){
        $scope.selectedOrder = order;
    };
});
