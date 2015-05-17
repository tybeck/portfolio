/**
  * Primary Application for Tyler Beck's Portfolio
  * @author: Tyler Beck
  * @version: 0.0.1
*/

'use strict';

/**
 * Allows us to easily extend objects.
 * @property extend
 * @type Object
 */

var extend = require('node.extend');

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

	'APP_VERSION': '0.0.1',

	/**
	 * Current directory of our server application.
	 * @property dir
	 * @type String
	 */

	'dir': __dirname + '/',

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

		app.use(express.static(server.dir));

		app.use('/scripts', express.static(this.dir + 'www/scripts/'));
		
		app.use('/styles', express.static(this.dir + 'www/styles/'));

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
	 * @property msg
	 * @type Function
	 */

	msg: function (message) {

		console.log(' ## Tyler+Beck ## ' + message);

		return this;

	},

	/**
	 * Setup primary application.
	 * @property setup
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
			.assets()
			.routes()
			.listen();

		return this;

	},
	
	/**
	 * Setup our asset pathing.
	 * @property routes
	 * @type Function
	 */

	assets: function () {

		var assets = require('./config/assets.json').assets,

			express = this.express;

		for(var key in assets) {

			var projectAsset = assets[key];

			for(var i = 0; i < projectAsset.length; i++ ) {

				var asset = projectAsset[i];

				this.app.use(asset.web_path, 

					express.static(this.dir + asset.server_path));

			}

		}

		return this;

	},

	/**
	 * Setup our routes.
	 * @property routes
	 * @type Function
	 */

	routes: function () {

		require('./routes');

		this.app.use(require('./services/app').middlewares);

		return this;

	},

	/**
	 * Start listening
	 * @property listen
	 * @type Function
	 */

	listen: function () {

		var self = this;

		var instance = this.http.listen(this.config.APP_PORT, function () {

			var host = instance.address().address,

				port = instance.address().port;

			self.msg('Starting application - v' + self.APP_VERSION)
				.msg('Running on http://' + host + ':' + port);

		});

		return this;

	},

	/**
	 * Run primary application.
	 * @property run
	 * @type Function
	 */

	run: function () {

		return this.setup();

	}

};

module.exports.Server = Server;

Server.run();