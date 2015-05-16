var app = require('../services/app').app,

	express = require('express');

app.route('/projects/:projectName')

	.get(function (req, res, next) {

		var projectName = req.params.projectName;

		switch(projectName) {

			case 'kagneysadventure':

				app.use('/projects/assets', express.static(__dirname + '/app/projects/kagneysadventure/assets/'));
				app.use('/projects/media', express.static(__dirname + '/app/projects/kagneysadventure/media/'));

				return res.render('app/' + req.originalUrl + 

					'/index-unminified.html');

			break;

			default:

				return res.render('app/' + req.originalUrl + 

					'/index.html');

			break;

		}

	});