_          = require('lodash');

exports.generatePreview = function(req, res) {
  console.log('Method: generate preview');
	var fileId = req.params.fileId || req.body.fileId;
	console.log('fileId ', fileId);
	if (_.isEmpty(fileId)) {
		res.json({"status": 500, "message": "error"});
	}
	res.json({"status": 200, "message": "ok"});
};