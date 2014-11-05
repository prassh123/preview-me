var express = require('express'),
    path    = require('path'),
    previewController = require(path.join(__dirname, '../js/controller/preview'));

module.exports = function(app, p) {
  var router = express.Router();
  router.route('/api/preview/:fileId')
		    .get(previewController.generatePreview)
        .post(previewController.generatePreview);

	router.route('/api/preview')
		    .post(previewController.generatePreview);

	router.route('/api/file-upload')
		    .post(previewController.uploadFile);

	app.use('/', router);
};
