'use strict';

/**
 * @ngdoc function
 * @name tyb.controller:PortfolioCtrl
 * @description
 * # PortfolioCtrl
 * Main controller for our portfolio
 */

angular.module('tyb')

    .controller('PortfolioCtrl', function ($scope) {

    	angular.extend($scope, {

    		'workList': []

    	});

    });