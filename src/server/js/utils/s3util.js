var AWS        = require('aws-sdk');
var s3 = null;

if (config.storage.type === 's3') {
	AWS.config.update(config.storage);
	s3 = new AWS.S3();
}

exports.gets3Object = function(fileId) {
  console.log('getting s3 object ', fileId);
};

