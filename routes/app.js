var app = require('../services/app').app,

	controller = require('../controllers/app');

app.route('/projects/:projectName')

	.get(controller.getProject);