var AWS        = require('aws-sdk');
var s3 = null;
var $q = require('Q');

if (config.storage.type === 's3') {
	AWS.config.update(config.storage);
	s3 = new AWS.S3();
}

exports.gets3Object = function(fileId, params) {
	var deferred = $q.defer();
  console.log('Getting s3 object ', fileId, params);
	//TODO Measure the time it takes for downloading the images
	s3.getObject(
		{ Bucket: config.storage.bucket, Key: fileId },
		function (error, data) {
			if (error !== null) {
				console.log("Failed to retrieve an object: " + error);
				deferred.reject(error);
			} else {
				console.log("Loaded " + data.ContentLength + " bytes");
				// do something with data.body
				deferred.resolve(data);
			}
		}
	);
	return deferred.promise;
};

