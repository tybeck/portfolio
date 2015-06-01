'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:resize
 * @description
 * # resize
 */

angular.module('tyb')

	.directive('resize', function ($rootScope, $window) {

	    return function (scope) {

	        var w = angular.element($window);

	        angular.extend(scope, {

				getWindowDimensions: function () {

				    return {

				        'h': w[0].innerHeight,

				        'w': w[0].innerWidth

				    };

				},

				broadcastVisibility: function () {

					$rootScope.$broadcast('tyb.visibility');

				}

	        });

	        scope.$watch(scope.getWindowDimensions, function (newValue) {

	            scope.$emit('tyb.resize', newValue);

	        }, true);

	        w.bind('resize', function () {

	        	scope.broadcastVisibility();

	            scope.$apply();

	        });

	        w.bind('DOMContentLoaded load', scope.broadcastVisibility);

	        angular.element(document).ready(function () {

	        	var main = angular.element(document.getElementById('main'));

	        	main.bind('scroll', scope.broadcastVisibility);

	        });

	    };

	});