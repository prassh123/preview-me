/** Express js server */

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
	  _          = require('lodash');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

require("./routes/routes.js")(app);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
	var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

