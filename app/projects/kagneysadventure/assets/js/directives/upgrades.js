'use strict';

/**
 * @ngdoc directive
 * @name KagneysAdvApp.directive:upgrades
 * @description
 * # upgrades
 */
 
angular.module('KagneysAdvApp')

    .directive('upgrades', function () {

        return {

            'restrict': 'E',

            'replace': true,

            'templateUrl': 'assets/partials/upgrades.html',

            'scope': true,

            controller: function ($scope) {

            	$scope.$on('upgrade.click', function (ev, data) {

            		var fn = $scope.$parent;

            		if(fn && fn.invokeFn && fn.invokeScope) {

            			fn.invokeFn.apply(fn.invokeScope, [data]);

            		}

            	});

            }

        };

    });
