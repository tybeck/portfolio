var projects = require('../models/projects');

exports.getProjects = function (req, res) {

	projects.getProjectsByName(req.query.names).then(function (data) {

		var JSON = {

			'projects': data

		}

		return res.json(JSON);

	});

};