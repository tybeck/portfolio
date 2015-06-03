var mongoose = require('mongoose'),

	schema = require('./schema/projects');

require('./schema/statics/projects/');

var model = mongoose.model('projects', schema);

module.exports = model;