var app = require('../services/app').app,

	controller = require('../controllers/api');

app.route('/api/projects')

	.get(controller.getProjects);