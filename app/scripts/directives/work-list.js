'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:workList
 * @description
 * # workList
 */

angular.module('tyb')

    .directive('workList', function (Projects) {

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

                    Projects.getFeaturedProjects()
                        .then(function (data) {

                            scope.list = data.projects;

                    });

                };

                var loadType = function (type) {

                  Projects.getProjectsByType(type)
                      .then(function (data) {

                          scope.list = data.projects;

                  });

                };

                var projectItems = angular.element(items);

                projectItems.on('click', function (ev) {

                    var actionEl = angular.element(ev.currentTarget),

                        actionType = actionEl.attr('type');

                    var source = angular.element(ev.srcElement);

                    projectItems.removeClass('selected');

                    source.addClass('selected');

                    if(actionType === 'featured') {

                        loadFeatured();

                    } else {

                      loadType(actionType);

                    }

                });

                var featuredItem = el.querySelector('li[type="featured"]');

                if(featuredItem) {

                  featuredItem.click();

                }

            }

        };

    });
