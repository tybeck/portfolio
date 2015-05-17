var Q = require('q');

module.exports.getProject = getProject = function(req) {

	var projectName = req.params.projectName,

		deferred = Q.defer();

	switch(projectName.toLowerCase()) {

		case 'kagneysadventure':

			return deferred.resolve('app/' + req.originalUrl + 

				'/index-unminified.html');

		break;

		default:

			return deferred.resolve('app/' + req.originalUrl + 

				'/index.html');

		break;

	}

	return deferred.promise;

};