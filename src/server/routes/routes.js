var express = require('express'),
    path    = require('path'),
    previewController = require(path.join(__dirname, '../js/controller/preview'));

module.exports = function(app, p) {
  var router = express.Router();
  router.route('/api/preview/:fileId')
        .post(previewController.generatePreview);

	router.route('/api/preview')
		    .post(previewController.generatePreview);
	app.use('/', router);

	// GET /static/style.css etc.
	app.use('/static', express.static(__dirname + '../client/css'));
};



