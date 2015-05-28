'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:header
 * @description
 * # header
 */
 
angular.module('tyb')

    .directive('headerContainer', function ($rootScope, $location, $timeout) {

        return {

            'restrict': 'E',

            'replace': true,

            'templateUrl': 'templates/directives/header.html',

            'scope': true,

            link: function (scope, element) {

                var getElement = function (path) {

                    if(path === '/') {

                        path = '/home';

                    }

                    var el = element[0],

                        linkElement = el.querySelector('a[href="#' + path + '"]');

                    if(linkElement) {

                        $timeout(function () {

                            var boundingRect = linkElement.getBoundingClientRect();

                            scope.$emit('header.selector', {

                                'width': linkElement.offsetWidth,

                                'left': boundingRect.left

                            });

                        }, 50);

                    }

                };

                $rootScope.$on('$stateChangeStart', function (event, toState) {

                    getElement(toState.url);

                });

                angular.element(document).ready(function () {

                    getElement($location.path());

                });
                
            }

        };

    });
