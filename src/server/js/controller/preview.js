var formidable = require('formidable'),
		_          = require('lodash'),
	  fs         = require('fs'),
		path       = require('path'),
	  imageUtils = require(path.join(__dirname, '/../utils/imageutils'));

exports.generatePreview = function(req, res) {
  console.log('Method: generate preview');
	var fileId = req.params.fileId || req.body.fileId;
	console.log('fileId ', fileId);
	if (_.isEmpty(fileId)) {
		res.json({"status": 500, "message": "error"});
	}
	res.json({"status": 200, "message": "ok"});
};

exports.uploadFile = function(req, res) {
	var form = new formidable.IncomingForm();

	form.uploadDir = '/Users/prashanth.raghavan/preview-me/tmp_images';
	form.keepExtensions = true;
	form.hash = 'md5';

	form.on('file', function(field, file) {
		//rename the incoming file to the file's name
		//fs.rename(file.path, form.uploadDir + "/" + file.name);
	})
	.on('error', function(err) {
		console.log("an error has occured with form upload");
		console.log(err);
		request.resume();
	})
	.on('aborted', function(err) {
		console.log("user aborted upload");
	})
	.on('end', function() {
		console.log('-> upload done');
	});

	form.parse(req, function(err, fields, files) {
		//console.log(fields, fields);
		//console.log(files, files);
		res.writeHead(200, {'content-type': 'text/plain'});
		res.write('received upload:\n\n');
		imageUtils.resizeImage(files);
		res.end();
	});
};

