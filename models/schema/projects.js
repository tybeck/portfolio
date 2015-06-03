var mongoose = require('mongoose'),

	schema = mongoose.Schema({

		'name': String,
		'logoLabel': String,
		'skills': [String],
		'description': String,
		'link': String,
		'backdrop': String,
		'view': String,
		'zoom': String,
		'carousel': String,
		'carouselView': String

	});

module.exports = schema;