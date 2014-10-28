/** Express js server */

var express = require('express'),
	  http    = require('http'),
		exphbs  = require('express-handlebars'),
    bodyParser = require('body-parser'),
	  _          = require('lodash');

app = express();

//READ CONFIG. Picks up either development.json or production.json according to whatever is passed from Gruntfile.js
config  = require(__dirname + "/../config/" + process.env.NODE_ENV + ".json");

/* BodyParser middleware for decoding the contents sent using POST */
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

/* End BodyParser */


/* Set the view to handlebars */
var viewsPath =  __dirname + '/../client/views';
app.set('views', viewsPath);
app.engine('.hbs', exphbs({
																	layoutsDir:  viewsPath + '/layouts',
																	defaultLayout: 'main',
		                              extname: '.hbs'
																}));
app.set('view engine', '.hbs');
/* End Handlebars */

/* Static middleware to expose bower components */
app.use('/bower', express.static(__dirname + '/../../bower_components'));
app.use('/client', express.static(__dirname + '/../../src/client'));
app.use('/public', express.static(__dirname + '/../../processed-images'));
/* End Bower */

/* Add application routes */
require("./routes/routes.js")(app);

app.get('/', function (req, res) {
  //res.send('Hello World!');
	res.render('uploader');
});
/* End Routes */

dataSocket = null;

var server = http.createServer(app).listen(config.server.port, config.server.host, function() {
	console.log('Example app listening at http://%s:%s', config.server.host, config.server.port);
	io         = require('socket.io')(server);
	io.on('connection', function (socket) {
		console.log('received connection ');
		dataSocket = socket;
		//socket.emit('preview-ready', { hello: 'world' });
	});
});

//var server = app.listen(3000, function () {
//  var host = server.address().address;
//	var port = server.address().port;
//  console.log('Example app listening at http://%s:%s', host, port);
//	io         = require('socket.io')(server);
//
//	io.on('connection', function (socket) {
//		console.log('received connection ');
//		dataSocket = socket;
//		//socket.emit('preview-ready', { hello: 'world' });
//	});
//});