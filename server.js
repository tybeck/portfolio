/**
  * Primary Application for Tyler Beck's Portfolio
  * @author: Tyler Beck
  * @version: 0.0.1
*/

'use strict';

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

	configure: function (server) {

		var app = this,

			express = server.express,

			config = server.config,

			statics = server.statics;

		app.use(function() {

			app.set('views', server.dir);

			app.engine('.html', require('ejs').renderFile);

			app.engine('.jade', require('jade').__express);

		});

		switch(config.ENVIRONMENT) {

			case statics.ENV_TYPES.DEVELOPMENT:
							
				app.use(statics.ENV_TYPES.DEVELOPMENT, function() {

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
			
				app.use(statics.ENV_TYPES.PRODUCTION, function() {

					app.set('view options', {

						'pretty': false

					});
					
					app.use(express.errorHandler());
				
				});
			
			break;

		}

	},

	/**
	 * Message System
	 * @property msg
	 * @type Function
	 */

	msg: function(message) {

		console.log(' ## Tyler+Beck ## ' + message);

		return this;

	},

	/**
	 * Setup primary application.
	 * @property setup
	 * @type Function
	 */

	setup: function () {

		this.msg('Starting application - v' + this.APP_VERSION)
			.msg('Running on <domain>:' + this.config.APP_PORT);

		this.app = this.express();

		this.configure.apply(this.app, [this]);

		return this;

	},

	/**
	 * Run primary application.
	 * @property app
	 * @type Object
	 */

	run: function () {

		this.setup();

	}

};

module.exports.Server = Server;

Server.run();