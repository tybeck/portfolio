var content = require('../services/content');

exports.getProject = function (req, res) {

	content.getProject(req).then(function (url) {

		return res.render(url);

	});

};

exports.getSPA = function (req, res) {

	content.getSPA().then(function (url) {

		return res.render(url);

	});

};