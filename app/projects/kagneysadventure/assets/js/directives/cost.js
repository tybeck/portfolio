'use strict';

/**
 * @ngdoc directive
 * @name KagneysAdvApp.directive:cost
 * @description
 * # cost
 */
 
angular.module('KagneysAdvApp')

    .directive('cost', function () {

        return {

            'restrict': 'E',

            'scope': true,

            link: function (scope, element, attrs) {

            	switch(attrs.upgrade) {

            		case 'health':

            			scope.cost = 10;

            		break;

            		case 'speed': 

            			scope.cost = 3;

        			break;

            	}

            	element.on('click' , function (ev) {

            		scope.$emit('upgrade.click', {

            			'type': attrs.upgrade,

            			'cost': scope.cost

            		});

            	});

            }

        };

    });
