var content = require('../services/content');

exports.getProject = function (req, res, next) {

	content.getProject(req).then(function (url) {

		if(url) {

			return res.render(url);

		}

		return next();

	});

};

exports.getSPA = function (req, res) {

	content.getSPA().then(function (url) {

		return res.render(url);

	});

};