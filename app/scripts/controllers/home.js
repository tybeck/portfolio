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

    	angular.extend($scope, {

    		'seeMoreClicked': false,

    		seeMore: function () {

    			$scope.seeMoreClicked = true;

    			$scope.$broadcast('skills.seeMore');

    		}

    	});

    });