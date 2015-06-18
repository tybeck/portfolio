'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:workList
 * @description
 * # workList
 */
 
angular.module('tyb')

    .directive('workList', function (Projects, PORTFOLIO_FEATURED) {

        return {

            'restrict': 'E',

            'replace': true,

            'templateUrl': 'templates/directives/work-list.html',

            'scope': {

                'list': '='

            },

            link: function (scope, element) {

                var el = element[0],

                    items = Array.prototype.slice.call(el.querySelectorAll('li'));

                var loadFeatured = function () {

                    Projects.getProjectsByName(PORTFOLIO_FEATURED)
                        .then(function (data) {

                            scope.list = data.projects;

                    });

                };

                angular.element(items).on('click', function (ev) {

                    var actionEl = angular.element(ev.currentTarget),

                        actionType = actionEl.attr('type');

                    if(actionType === 'featured') {

                        loadFeatured();

                    } else {

                    }

                });

                loadFeatured();

            }

        };

    });
