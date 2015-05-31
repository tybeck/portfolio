'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:header
 * @description
 * # header
 */
 
angular.module('tyb')

    .directive('skill', function () {

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

            	$scope.lvl = $scope.level + '%';

            }

        };

    });
