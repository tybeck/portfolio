var schema = require ('../../projects'),

	_ = require('lodash'),

	Q = require('q');

schema.statics.getProjectsByType = function (type) {

	var deferred = Q.defer(),

		self = this;

    console.log('get types', type);

	self
		.find({

      'type': type

    })
		.exec(function (err, projects) {

			if(!err && projects && projects.length) {

				return deferred.resolve(projects);

			} else {

        return deferred.resolve([]);

      }

		});

	return deferred.promise;

};
