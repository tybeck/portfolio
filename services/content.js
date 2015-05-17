var Q = require('q');

module.exports.getProject = getProject = function (req) {

	var projectName = req.params.projectName,

		deferred = Q.defer();

	switch(projectName.toLowerCase()) {

		case 'kagneysadventure':

			deferred.resolve('app' + req.originalUrl + 

				'/index-unminified.html');

		break;

		default:

			deferred.resolve('app' + req.originalUrl + 

				'/index.html');

		break;

	}

	return deferred.promise;

};

module.exports.getSPA = getSPA = function () {

	var deferred = Q.defer();

	deferred.resolve('www/index.html');

	return deferred.promise;

};