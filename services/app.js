	
/**
 * Express object.
 * @property express
 * @type Object
 */

var express = require('express'),

	/**
	 * Express object instantiation.
	 * @property app
	 * @type Object
	 */

	app = express(),

	/**
	 * HTTP object instantiation
	 * @property http
	 * @type Object
	 */

	http = require('http').Server(app),

	/**
	 * IO object (Socket.IO) instantiation
	 * @property io
	 * @type Object
	 */

	io = require('socket.io')(http);

module.exports = {

	'app': app,

	'http': http,

	'io': io,

	middlewares: function () {

		app.use(function (req, res, next) {

			return res.status(404).send('Not Found.');

		});

	}

};