var AWS        = require('aws-sdk');
var s3 = null;
var $q = require('Q'),
		gm = require('gm');

if (config.storage.type === 's3') {
	AWS.config.update(config.storage);
	s3 = new AWS.S3();
}



exports.gets3Object = function(fileId, params, res) {
	var deferred = $q.defer();
  console.log('Getting s3 object ', fileId, params);
	var tmpFile = require('fs').createWriteStream(config.storage.tmpdir + fileId);
	//var gmStream       = require('fs').createReadStream

	//TODO Measure the time it takes for downloading the images
	s3.getObject(
		{ Bucket: config.storage.bucket, Key: fileId })
		.on('httpData', function(chunk) { tmpFile.write(chunk);})
		.on('httpDone', function() { tmpFile.end();
			gm(config.storage.tmpdir + fileId)
				.options({imageMagick: true})
				.resize(params.width, params.height)
				.stream(function(err, stdout, stderr) {
					stdout.pipe(res);
				});
		})
		.send();
	return deferred.promise;
};