'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:resizeListener
 * @description
 * # resizeListener
 */

angular.module('tyb')

	.directive('resizeListener', function ($timeout) {

        return {

            'restrict': 'A',

            link: function (scope, element) {

            	scope.$on('tyb.resize', function (ev, data) {

            		$timeout(function () {

	            		var el = element[0],

	            			header = document.querySelector('.tyb-site-header-container');
						
						var computed = window.getComputedStyle(el, null);

                        var marginBottom = parseInt(computed.getPropertyValue('margin-bottom')),

                            marginTop = parseInt(computed.getPropertyValue('margin-top')),

                            totalHeight = (el.offsetHeight + header.offsetHeight + marginBottom + marginTop);

	            		scope.$emit('tyb.content.size', {

                            'viewport': data,

                            'height': totalHeight

                        });

            		}, 25);

            	});

            }

        };

	});