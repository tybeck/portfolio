'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:featuredCarousel
 * @description
 * # featuredCarousel
 */
 
angular.module('tyb')

    .directive('featuredCarousel', function (Projects) {

        return {

            'restrict': 'E',

            'replace': true,

            'templateUrl': 'templates/directives/featured-carousel.html',

            'scope': true,

            link: function () {

                console.log(Projects);

            }

        };

    });
