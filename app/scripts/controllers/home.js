'use strict';

/**
 * @ngdoc function
 * @name tyb.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Main controller for our homepage
 */

angular.module('tyb')

    .controller('HomeCtrl', function ($scope) {

    	$scope.$on('tyb.resize', function (ev, size) {

    		var main = angular.element(document.getElementById('main'));

    		main.css('height', size.h + 'px');

    	});

    });