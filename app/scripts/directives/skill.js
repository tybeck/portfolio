'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:skill
 * @description
 * # skill
 */
 
angular.module('tyb')

    .directive('skill', function ($rootScope) {

        return {

            'restrict': 'E',

            'replace': true,

            'templateUrl': 'templates/directives/skill.html',

            'scope': {

            	'level': '=',

            	'type': '@',

            	'typeExtra': '@'

            },

            controller: function ($scope) {

            	angular.extend($scope, {

            		'lvl': $scope.level + '%',

            		isElementInViewport: function (el) {

						var rect = el.getBoundingClientRect();

						return (
							rect.top >= 0 &&
							rect.left >= 0 &&
							rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
							rect.right <= (window.innerWidth || document.documentElement.clientWidth)
						);

            		}

            	});

            },

            link: function (scope, element) {

            	scope.hasAnimated = false;

            	$rootScope.$on('tyb.visibility', function () {

            		var el = element[0];

            		if(scope.isElementInViewport(el)) {

            			var elemBar = el.querySelector('.tyb-progress-bar');

            			if(elemBar) {

            				angular.element(elemBar)
            					.css('width', scope.lvl);

            			}

            			scope.hasAnimated = true;

            		}

            	});

            }

        };

    });
