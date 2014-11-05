var gm = require('gm'),
	  fs = require('fs'),
	  _  = require('lodash');

var processedImagesPath = '/Users/prashanth.raghavan/preview-me/preview-me/processed-images';

var previewThumbnails = {
	//retina: {width: 1040, height: 780},
	//large:  {width: 520, height: 390},
	//medium: {width: 500, height: 376},
	small:  {width: 250, height: 188}
};

exports.resizeImage = function(files, res) {
//obtain the size of an image
	var fileExt = files.file.path.split('.').pop();

	_.forIn(previewThumbnails, function(value, key){
		console.log('in preview thumbnails ');
		gm(files.file.path)
			.options({imageMagick: true})
			.size(function (err, size) {
				if (!err) {
					console.log(size.width > size.height ? 'wider' : 'taller than you');
				} else {
					console.log(err);
				}
			})
			.resize(value.width, value.height)
			//.write(processedImagesPath + '/' + files.file.hash + '_' + key + '.' + fileExt , function (err) {
			//	if (!err) console.log('done');
			//	_.assign(previewThumbnails[key], {fileId: files.file.hash + '_' + key + '.' + fileExt});
			//	dataSocket.emit('preview-ready', previewThumbnails[key]);
			//});
			.stream(function streamOut (err, stdout, stderr) {
				console.log('about to stream ');
				if (err) return next(err);
				stdout.pipe(res); //pipe to response

				// the following line gave me an error compaining for already sent headers
				//stdout.on('end', function(){res.writeHead(200, { 'Content-Type': 'ima    ge/jpeg' });});

				stdout.on('error', next);
			});
	});

	//
	//console.log(files.file);
};
