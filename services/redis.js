	
/**
 * Redis object.
 * @property redis
 * @type Object
 */

var redis = require('redis'),

	/**
	 * Client object.
	 * @property client
	 * @type Object
	 */

    client = redis.createClient({

    	'detect_buffers': true

    });

module.exports = client;