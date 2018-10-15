'use strict';
module.exports = photoUpload;

/**
 * Handle the file upload and save the result in a model for further management
 * @param req
 * @param res
 */
function photoUpload(req, res) {

  req.file('file').upload({
    adapter: require('skipper-s3'),
    key: sails.config.custom.aws.key,
    secret: sails.config.custom.aws.secret,
    bucket: sails.config.custom.aws.s3BucketName,
    maxBytes: 2000000
  }, async (err, filesUploaded) => {
    if (err) {
      return res.serverError(response(err));
    }
    // If no files were uploaded, respond with an error.
    if (filesUploaded.length === 0) {
      return res.badRequest(response(new Error('No file was uploaded')));
    }
    try {
      filesUploaded.forEach(file=>{
        if (file.type.indexOf('image') === -1){
          throw new Error('Invalid file type');
        }
      });

      let createdFiles = await File.createEach(filesUploaded).fetch();
      return res.ok(response(null,{files: createdFiles}));
    } catch (err) {
      return res.serverError(response(err));
    }

  });
}
