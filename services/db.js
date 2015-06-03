var mongoose = require('mongoose'),

	Q = require('q'),

	db = null,

	Connection = {

		/**
		 * Create a connection to our database.
		 * @method create
		 */

		create: function () {

			mongoose.connect('mongodb://localhost/tyb');

			db = mongoose.connection;

			return this;

		},

		/**
		 * Register events to our database (errors, open)
		 * @method registerEvents
		 */

		registerEvents: function () {

			var events = this.events,

				deferred = Q.defer();

			db.on('error', function () {

				return deferred.resolve(false);

			});

			db.once('open', function () {

				return deferred.resolve(true);

			});

			return deferred.promise;

		},

		/**
		 * Setup our database connection
		 * @method setup
		 */

		setup: function () {

			var deferred = Q.defer();

			this.create()
				.registerEvents().then(function (status) {

					return deferred.resolve(status);

				});

			return deferred.promise;

		}

	};

module.exports = Connection;