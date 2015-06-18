'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:tybBg
 * @description
 * # tybBg
 */
 
angular.module('tyb')

    .directive('tybBg', function () {

        return {

            'restrict': 'A',

            'scope': true,

            link: function (scope, element, attributes) {

                attributes.$observe('tybBg', function () {

                    var bgSrc = scope.$eval(attributes.tybBg),

                        bgImg = document.createElement('img');

                    angular.extend(bgImg, {

                        'src': bgSrc,

                        onload: function () {

                            angular.extend(element[0].style, {
                                
                                'backgroundImage': 'url("' + bgSrc + '")',

                                'height': bgImg.height + 'px'

                            });

                            if(typeof attributes.tybBgWidth === 'string') {

                                element[0].style.width = bgImg.width + 'px';

                            }

                        }

                    });

                });
                
            }

        };

    });
