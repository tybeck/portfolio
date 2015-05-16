	
/**
 * Express object.
 * @property express
 * @type Object
 */

var express = require('express'),

	app = express(),

	http = require('http').Server(app),

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