var schema = require ('../../projects'),

	_ = require('lodash'),

	Q = require('q');

schema.statics.getFeatured = function () {

	var deferred = Q.defer(),

		self = this;

	self
		.find({

      'featured': true

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
