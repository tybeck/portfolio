'use strict';

angular.module('tyb')
	
	.factory('Projects', function ($q, $http, $interpolate, PROJECTS_BY_NAME) {

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

			}

		});

	});