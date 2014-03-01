'use strict'

angular.module('itmsApp').factory('orderService', function(config) {

    function queryAllLocal() {
        return [{
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
        }, {
            number: 'EO002',
            er: 1,
            eritn: '001',
            type: '紧急',
            special: 'nomal',
            delivery: 'General',
            receiver: 'nanjin',
            provice: 'jiangsu',
            city: 'nanjing',
            distact: 'xiaguan',
            deliveryDate: '2014-4-1',
            deliveryMethod: 'fly'
        }, {
            number: 'EO003',
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
        }]
    }

    var orderService = {};
    if(config.mode === 'development'){
        orderService.queryAll = queryAllLocal
    }
    return orderService;
});
