'use strict';

/**
 * @ngdoc function
 * @name tyb.controller:AppCtrl
 * @description
 * # AppCtrl
 * Main controller for our application
 */

angular.module('tyb')

    .controller('AppCtrl', function ($scope) {

    	$scope.$on('tyb.resize', function (ev, size) {

    		var main = angular.element(document.getElementById('main'));

    		main.css('height', size.h + 'px');

    	});
    	
    });