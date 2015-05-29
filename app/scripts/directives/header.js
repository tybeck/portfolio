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

                var previousPath = null,

                    getElement = function (path) {

                    if(path === '/') {

                        path = '/home';

                    }

                    previousPath = path;

                    var el = element[0],

                        linkElement = el.querySelector('a[href="#' + path + '"]');

                    if(linkElement) {

                        $timeout(function () {

                            var boundingRect = linkElement.getBoundingClientRect();

                            scope.$emit('header.selector', {

                                'width': linkElement.offsetWidth,

                                'left': boundingRect.left,

                                'lastElement': linkElement

                            });

                        }, 50);

                    }

                };

                $rootScope.$on('tyb.resize', function () {

                    getElement(previousPath);

                });

                $rootScope.$on('$stateChangeStart', function (event, toState) {

                    getElement(toState.url);

                });

                angular.element(document).ready(function () {

                    getElement($location.path());

                });
                
            }

        };

    });
