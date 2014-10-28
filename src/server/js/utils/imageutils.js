var gm = require('gm'),
	  fs = require('fs'),
	  _  = require('lodash');

var processedImagesPath = '/Users/prashanth.raghavan/preview-me/preview-me/processed-images';

var previewThumbnails = {
  retina: {width: 1040, height: 780},
	large:  {width: 520, height: 390},
	medium: {width: 500, height: 376},
	small:  {width: 250, height: 188}
};

exports.resizeImage = function(files) {
//obtain the size of an image
	var fileExt = files.file.path.split('.').pop();

	//dataSocket.emit('preview-ready', { hello: 'world' });

	_.forIn(previewThumbnails, function(value, key){

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
			.write(processedImagesPath + '/' + files.file.hash + '_' + key + '.' + fileExt , function (err) {
				if (!err) console.log('done');
				_.assign(previewThumbnails[key], {fileId: files.file.hash + '_' + key + '.' + fileExt});
				dataSocket.emit('preview-ready', previewThumbnails[key]);
			});
	});

	//
	//console.log(files.file);
};
