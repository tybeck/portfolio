var Q = require('q'),

	client = require('./redis');

module.exports.getProject = getProject = function (req) {

	var projectName = (req.params.projectName).toLowerCase(),

		deferred = Q.defer();

	client.get('projects', function (err, data) {

		if(!err && data) {

			data = JSON.parse(data);

			for(var key in data) {

				var project = data[key].project;

				if(project.name === projectName) {

					if(project.index) {

						deferred.resolve('app' + req.originalUrl + 

							'/' + project.index);

					} else {

						deferred.resolve(null);

					}

				}

			}

		}

	});

	return deferred.promise;

};

module.exports.getSPA = getSPA = function () {

	var deferred = Q.defer();

	deferred.resolve('www/index.html');

	return deferred.promise;

};