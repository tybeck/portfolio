'use strict';

angular.module('tyb')

	.factory('Projects', function ($q, $http, $interpolate, PROJECTS_BY_NAME, PROJECTS_FEATURED, PROJECTS_BY_TYPE) {

		return({

			getProjectsByName: function (names) {

				var d = $q.defer(),

					context = {

						'names': names

					};

				$http.get($interpolate(PROJECTS_BY_NAME)(context))
					.success(function (data) {

						d.resolve(data);

				});

				return d.promise;

			},

			getProjectsByType: function (name) {

				var d = $q.defer(),

					context = {

						'name': name

					};

				$http.get($interpolate(PROJECTS_BY_TYPE)(context))
					.success(function (data) {

						d.resolve(data);

				});

				return d.promise;

			},

			getFeaturedProjects: function () {

				var d = $q.defer();

				$http.get(PROJECTS_FEATURED)
					.success(function (data) {

						d.resolve(data);

				});

				return d.promise;

			}

		});

	});
