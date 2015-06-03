var find = require('findit'),

	path = require('path'),

	fs = require('fs'),

	Q = require('q'),

	async = require('async');

/**
 * Get directories based on past given in return all top level
 * directories within parent.
 * @method getDirs
 * @type Function
 */

module.exports.getDirs = getDirs = function (dir) {

	var finder = find(dir),

		dirs = [],

		skipped = false,

		deferred = Q.defer();

	finder.on('directory', function (directory) {

		directory = directory.replace(/\\/g, '/');

		dir = dir.replace(/\\/g, '/');

		if(skipped) {

			var _dir = directory.split(dir)[1];

			if(_dir.lastIndexOf('/') === 0) {

				dirs.push(_dir.replace(/\//g, ''));

			}

		}

		skipped = true;

	});

	finder.on('end', function () {

		return deferred.resolve(dirs);

	});

	return deferred.promise;

};

/**
 * Get projects based on a particular directory.
 * @method getProjects
 * @type Function
 */

module.exports.getProjects = getProjects = function (dir) {

	var deferred = Q.defer(),

		projects = [];

	getDirs(dir).then(function (dirs) {

		async.each(dirs, function (projectDir, next) {

			var projectRoot = (dir + '/' + projectDir),

				projectInfo = projectRoot + '/project.json';

			fs.stat(projectRoot, function (errDir, statDirectory) {

				if(statDirectory.isDirectory()) {

					fs.stat(projectInfo, function (errFile, statFile) {

						if(statFile.isFile()) {

							fs.readFile(projectInfo, 'utf8', function (err, data) {

							  if (!err) {

							    data = JSON.parse(data);

							    projects.push(data);

							    return next();

							  }

							});

						}

					});

				}

			});

		}, function () {

			deferred.resolve(projects);

		});

	});

	return deferred.promise;

};