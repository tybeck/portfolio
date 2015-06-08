'use strict';

/**
 * @ngdoc directive
 * @name tyb.directive:featuredCarousel
 * @description
 * # featuredCarousel
 */
 
angular.module('tyb')

    .directive('featuredCarousel', function (Projects, PROJECTS_LOAD_FEATURED) {

        return {

            'restrict': 'E',

            'replace': true,

            'templateUrl': 'templates/directives/featured-carousel.html',

            'scope': true,

            controller: function ($scope) {

                Projects.getProjectsByName(PROJECTS_LOAD_FEATURED)
                    .then(function (data) {

                        $scope.featuredProjects = data.projects;

                });

            }

        };

    });
