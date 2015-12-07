/**
  * Primary Application for Tyler Beck's Portfolio
  * @author: Tyler Beck
  * @version: 0.0.3
*/

'use strict';

/**
 * Allows us to easily extend objects.
 * @property extend
 * @type Object
 */

var extend = require('node.extend'),

	/**
	 * Utility library delivering consistency, modularity, performance, & extras
	 * @property _
	 * @type Object
	 */

	_ = require('lodash'),

	/**
	 * This module contains utilities for handling and transforming file paths
	 * @property path
	 * @type Object
	 */

	path = require('path');

var Server = {

	/**
	 * Express object.
	 * @property express
	 * @type Object
	 */

	'express': require('express'),

	/**
	 * Instantiated Express application object.
	 * @property app
	 * @type Object
	 */

	'app': null,

	/**
	 * IO object (Socket.IO)
	 * @property io
	 * @type Object
	 */

	'io': null,

	/**
	 * File System
	 * @property fs
	 * @type Object
	 */

	'fs': require('./services/fs'),

	'APP_VERSION': '0.0.3',

	/**
	 * Current directory of our server application.
	 * @property dir
	 * @type String
	 */

	'dir': __dirname + '/',

	/**
	 * Queued messages
	 * @property messages
	 * @type Array
	 */

	'messages': [],

	'config': {

		/**
		 * The port our application server will be listening on.
		 * @property APP_PORT
		 * @type Integer
		 */

		'APP_PORT': 80,

		/**
		 * @property ENVIRONMENT
		 * @type String
		 */

		'ENVIRONMENT': 'development'

	},

	'statics': {

		'ENV_TYPES': {

			'DEVELOPMENT': 'development',

			'PRODUCTION': 'production'

		}

	},

	/**
	 * Configure our express application
	 * @method configure
	 * @type Function
	 */

	configure: function () {

		var server = this,

			app = server.app,

			express = server.express,

			config = server.config,

			statics = server.statics;

		app.use(function (req, res, next) {

			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
			res.header('Access-Control-Allow-Headers', 'Content-Type');
			res.header('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range');

			return next();

		});

		app.use(express.static(server.dir));

		app.use('/scripts', express.static(this.dir + 'www/scripts/'));

		app.use('/styles', express.static(this.dir + 'www/styles/'));

		app.use('/images', express.static(this.dir + 'www/images/'));

		app.use('/downloads', express.static(this.dir + 'downloads/'));

		app.use(express.static(path.join(this.dir, 'www/')));

		app.use(require('body-parser').urlencoded({

			'extended': false,

			'limit': '20mb'

		}));

		app.set('views', server.dir);

		app.engine('.html', require('ejs').renderFile);

		app.engine('.jade', require('jade').__express);

		switch(config.ENVIRONMENT) {

			case statics.ENV_TYPES.DEVELOPMENT:

				app.use(statics.ENV_TYPES.DEVELOPMENT, function () {

					app.set('view options', {

						'pretty': true

					});

					app.use(express.errorHandler({

						'dumpExceptions': true,

						'showStack': true

					}));

				});

			break;

			case statics.ENV_TYPES.PRODUCTION:

				app.use(statics.ENV_TYPES.PRODUCTION, function () {

					app.set('view options', {

						'pretty': false

					});

					app.use(express.errorHandler());

				});

			break;

		}

		return this;

	},

	/**
	 * Message System
	 * @method msg
	 * @type Function
	 */

	msg: function (message) {

		console.log(' ## Tyler+Beck ## ' + message);

		return this;

	},

	queueMsg: function (message) {

		this.messages.push(message);

		return this;

	},

	/**
	 * Setup primary application.
	 * @method setup
	 * @type Function
	 */

	setup: function () {

		var nodes = require('./services/app');

		extend(this, {

			'app': nodes.app,

			'io': nodes.io,

			'http': nodes.http

		});

		this.configure()
			.setupProjects();

		return this;

	},

	/**
	 * Setup our database.
	 * @method database
	 * @type Function
	 */

	database: function () {

		var connection = require('./services/db'),

			self = this;

		connection.setup().then(function (status) {

			if(status) {

				self
					.msg('')
					.msg('Database connection established!');

				self.listen();

			} else {

				self.msg('Could not establish database connection!');

				process.exit(0);

			}

		});

		return this;

	},

	/**
	 * Setup our projects.
	 * @method setupProjects
	 * @type Function
	 */

	setupProjects: function () {

		var client = require('./services/redis'),

			self = this,

			express = self.express;

		this.fs.getProjects('app/projects')

			.then(function (projects) {

				client.set('projects', JSON.stringify(projects));

				_.forEach(projects, function (data) {

					var project = data.project;

					_.forEach(project.assets, function (asset) {

						self.app.use(asset.web, express.static(self.dir +

							asset.server));

					});

					if(project.hook && project.hook.length) {

						require('./app/projects/' + project.name + '/' +

							project.hook).apply(self);

					}

				});

				self
					.database()
					.routes();

			});

		return this;

	},

	/**
	 * Setup our routes.
	 * @method routes
	 * @type Function
	 */

	routes: function () {

		require('./routes');

		require('./services/app').middlewares();

		return this;

	},

	/**
	 * Start listening
	 * @method listen
	 * @type Function
	 */

	listen: function () {

		var self = this;

		var instance = this.http.listen(this.config.APP_PORT, function () {

			var host = instance.address().address,

				port = instance.address().port;

			self.msg('Starting application - v' + self.APP_VERSION)
				.msg('Running on http://' + host + ':' + port);

			_.forEach(self.messages, function (message) {

				self.msg(message);

			});

		});

		return this;

	},

	/**
	 * Run primary application.
	 * @method run
	 * @type Function
	 */

	run: function () {

		return this.setup();

	}

};

module.exports.Server = Server;

Server.run();
