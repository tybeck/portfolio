var schema = require('./schema/projects'),

	connection = require('../services/db').db;

require('./schema/statics/projects/');

var model = connection.model('projects', schema);

module.exports = model;