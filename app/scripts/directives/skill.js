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

            	'typeExtra': '@',

                'isHidden': '='

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

                var visibility = function () {

                    var el = element[0];

                    if(scope.isElementInViewport(el) && !scope.hiddenStatus) {

                        var elemBar = el.querySelector('.tyb-progress-bar');

                        if(elemBar) {

                            angular.element(elemBar)
                                .css('width', scope.lvl);

                        }

                        scope.hasAnimated = true;

                    }

                };

                if(scope.isHidden) {

                    var parent = null;

                    angular.element(document).ready(function () {

                        parent = element[0].parentNode;

                        var computed = window.getComputedStyle(parent, null);

                        angular.extend(scope, {

                            'computedHeight': parent.offsetHeight,

                            'computedMarginBottom': computed.getPropertyValue('margin-bottom'),

                            'computedMarginTop': computed.getPropertyValue('margin-top'),

                            'hiddenStatus': true

                        });

                        angular.extend(parent.style, {
                            
                            'height': '0rem',

                            'overflow': 'hidden',

                            'marginBottom': '0rem',

                            'marginTop': '0rem'
                        
                        });

                    });

                    scope.$on('skills.seeMore', function () {

                        angular.extend(parent.style, {
                            
                            'height': scope.computedHeight + 'px',

                            'overflow': 'hidden',

                            'marginBottom': scope.computedMarginBottom,

                            'marginTop': scope.computedMarginTop
                        
                        });

                        scope.hiddenStatus = false;

                        visibility();

                    });

                }

                $rootScope.$on('tyb.visibility', visibility);

            }

        };

    });
