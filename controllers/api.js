var projects = require('../models/projects');

exports.getProjects = function (req, res) {

	if(req.query.names) {

		projects.getProjectsByName(req.query.names).then(function (data) {

			var JSON = {

				'projects': data

			}

			return res.json(JSON);

		});

	} else if (req.query.featured) {

		projects.getFeatured().then(function (data) {

			var JSON = {

				'projects': data

			}

			return res.json(JSON);

		});

	} else if (req.query.type) {

		projects.getProjectsByType(req.query.type).then(function (data) {

			var JSON = {

				'projects': data

			}

			return res.json(JSON);

		});

	} else {

		return res.json({});

	}

};
