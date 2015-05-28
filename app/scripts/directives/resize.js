'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:resize
 * @description
 * # resize
 */

angular.module('tyb')

	.directive('resize', function ($window) {

	    return function (scope) {

	        var w = angular.element($window);

	        scope.getWindowDimensions = function () {

	            return {

	                'h': w[0].innerHeight,

	                'w': w[0].innerWidth

	            };

	        };

	        scope.$watch(scope.getWindowDimensions, function (newValue) {

	            scope.$emit('tyb.resize', newValue);

	        }, true);

	        w.bind('resize', function () {

	            scope.$apply();

	        });

	    };

	});