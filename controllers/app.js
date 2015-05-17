var content = require('../services/content');

exports.getProject = function (req) {

	content.getProject(req).then(function (url) {

		return res.render(url);

	});

};