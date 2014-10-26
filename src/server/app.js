/** Express js server */

var express = require('express'),
		exphbs  = require('express-handlebars'),
    app = express(),
    bodyParser = require('body-parser'),
	  _          = require('lodash');


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
/* End Bower */

/* Add application routes */
require("./routes/routes.js")(app);

app.get('/', function (req, res) {
  //res.send('Hello World!');
	res.render('uploader');
});
/* End Routes */

var server = app.listen(3000, function () {
  var host = server.address().address;
	var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
