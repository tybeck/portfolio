var io = require('../services/app').io;

var img = '';

io.on('connection', function (socket) {

	socket.on('save.img', function (image) {

		console.log('save image...', image)

		img = image;

	});

	socket.on('load.img', function () {

		console.log('load image...', img);

		socket.emit('load.img', img);

	});

	socket.on('move.to', function (coords) {

		socket.broadcast.emit('move.to', coords);

	});

	socket.on('line.to', function (coords) {

		socket.broadcast.emit('line.to', coords);

	});

});