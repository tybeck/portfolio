var schema = require ('../../projects'),

	_ = require('lodash'),

	Q = require('q');

schema.statics.getProjectsByName = function (names) {

	var deferred = Q.defer(),

		self = this,

		query = { $or: [] };

	names = names.split(',');

	_.forEach(names, function (name) {

		var regex = new RegExp(['^', name, '$'].join(''), 'i');

		query.$or.push({

			'name': regex

		});

	});

	self
		.find(query)
		.exec(function (err, projects) {

			if(!err && projects && projects.length) {

				var sortedProjects = [];

				_.forEach(names, function (projectName) {

					_.forEach(projects, function (project) {

						var resultProjectName = project.name;

						if(projectName.toLowerCase() === resultProjectName.toLowerCase()) {

							sortedProjects.push(project);

							return false;

						}

					});

				});

				return deferred.resolve(sortedProjects);

			}

		});

	return deferred.promise;

};