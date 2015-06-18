'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:resizeContent
 * @description
 * # resizeContent
 */

angular.module('tyb')

	.directive('resizeContent', function () {

        return {

            'restrict': 'A',

            link: function (scope, element) {

            	scope.$on('tyb.content.size', function (ev, size) {

                    var h = size.height,

                        hResult = size.viewport.h > (h + 60);

                    element[!hResult ? 'addClass' : 'removeClass']('tyb-resize-content');

                    if(hResult) {

                        h = size.viewport.h;


                    }

            		element[0].style.height = h + 'px';

            	});

            }

        };

	});