var express = require('express');
var app = express();

app.use('/projects/assets', express.static(__dirname + '/app/projects/kagneysadventure/assets/'));
app.use('/projects/media', express.static(__dirname + '/app/projects/kagneysadventure/media/'));
app.use(express.static(__dirname));

app.engine('.html', require('ejs').renderFile);
app.set('views', '');

app.get('/', function(req, res, next) {
	
	res.end('Coming soon - 2015');

});

app.get('/projects/kagneysadventure', function(req, res, next) {
	
	res.render('app/projects/kagneysadventure/index-unminified.html');

});

app.listen(80);