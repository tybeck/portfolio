'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:descriptionShortener
 * @description
 * # descriptionShortener
 */
 
angular.module('tyb')

    .directive('descriptionShortener', function () {

        return {

            'restrict': 'E',

            'replace': true,

            'templateUrl': 'templates/directives/description-shortener.html',

            'scope': {

            	'desc': '=',

            	'limit': '='

            },

            controller: function ($scope) {

            	var changed = function () {

            		var substr = ($scope.desc).substr(0, ($scope.limit - 3)) + '...';
            		
            		$scope.shortenedDesc = substr;

            	};

				angular.forEach(['desc', 'limit'], function (key) {

				  $scope.$watch(key, function () {

				    changed();

				  });

				});


            }

        };

    });
