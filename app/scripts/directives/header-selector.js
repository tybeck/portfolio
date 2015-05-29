'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:header
 * @description
 * # header
 */
 
angular.module('tyb')

    .directive('headerSelector', function ($rootScope) {

        return {

            'restrict': 'E',

            'replace': true,

            'templateUrl': 'templates/directives/header-selector.html',

            'scope': true,

            link: function (scope, element) {

                var lastElement = null;

                $rootScope.$on('header.selector', function (ev, data) {

                    var selector = angular.element(element.children()[0]);

                    selector
                        .css('width', data.width + 'px')
                        .css('left', data.left + 'px');

                    lastElement = data.lastElement;

                });

            }

        };

    });
