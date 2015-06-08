'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:footer
 * @description
 * # footer
 */
 
angular.module('tyb')

    .directive('footerContainer', function () {

        return {

            'restrict': 'E',

            'replace': true,

            'templateUrl': 'templates/directives/footer.html',

            'scope': true

        };

    });
