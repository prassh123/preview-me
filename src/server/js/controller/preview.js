var formidable = require('formidable'),
		_          = require('lodash'),
	  fs         = require('fs'),
		path       = require('path'),
	  imageUtils = require(path.join(__dirname, '/../utils/imageutils')),
	  s3Util     = require(path.join(__dirname, '/../utils/s3util')),
	  dbUtil     = require(path.join(__dirname, '/../utils/dbUtil')),
		url = require('url');


exports.generatePreview = function(req, res) {
  console.log('Method: generate preview');
	var fileId = req.params.fileId || req.body.fileId;
	console.log('fileId ', fileId);
	var query_params = getURLParts(req);
	console.log('query_params ' , query_params );
	if (_.isEmpty(fileId)) {
		res.json({"status": 500, "message": "error"});
	}

	// Insert the record into the database
	dbUtil.insertDocument(config.database.name, 'files', { fileId: '12345', fileName: 'taj_mahal.jpg' } );

	res.json({"status": 200, "message": "OK"});
	/* commenting out for now
	s3Util.gets3Object(fileId, query_params).then(
		function(data) {
			console.log(data);
			imageUtils.resizeImage(data);
			res.json({"status": 200, "message": "OK"});
		},
		function(error) {
			console.log(error);
			res.json({"status": 500, "message": "error"});
		}
	);
	*/
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

getURLParts = function(req) {
	var url_parts = url.parse(req.url, true);
	return url_parts.query;
};