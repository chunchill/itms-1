(function() {
    'use strict'

    angular.module('itmsApp').controller('shellCtrl', function($rootScope) {

        drawBreadCrumb();
        $rootScope.$on('$routeChangeStart',
            function(event, current, previous) {
                console.log('rout change start');
                drawBreadCrumb();
                // update title with breadcrumb...
                document.title = $(".breadcrumb li:last-child").text();
            });

        $.menu_speed = 235;

        nav_page_height();
        $('nav ul').jarvismenu({
            accordion: true,
            speed: $.menu_speed,
            closedSign: '<em class="fa fa-expand-o"></em>',
            openedSign: '<em class="fa fa-collapse-o"></em>'
        });

        $('#main').resize(function() {
            nav_page_height();
            //check_if_mobile_width();
        });

        $('nav').resize(function() {
            nav_page_height();
        });

        $('#hide-menu >:first-child > a').click(function(e) {
            $('body').toggleClass("hidden-menu");
            e.preventDefault();
        });

        $('#show-shortcut').click(function(e) {
            if ($.shortcut_dropdown.is(":visible")) {
                shortcut_buttons_hide();
            } else {
                shortcut_buttons_show();
            }
            e.preventDefault();
        });
    });

}());
