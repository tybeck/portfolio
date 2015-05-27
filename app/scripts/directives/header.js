'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:header
 * @description
 * # header
 */
 
angular.module('tyb')

    .directive('headerContainer', function () {

        return {

            'restrict': 'E',

            'replace': true,

            'templateUrl': 'templates/directives/header.html',

            'scope': true,

            controller: function () {

            }

        };

    });
