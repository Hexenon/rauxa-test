'use strict';
module.exports = photoGet;


const AWS = require('aws-sdk');
const signedUrlExpireSeconds = 60 * 5;
AWS.config.update({accessKeyId: sails.config.custom.aws.key, secretAccessKey: sails.config.custom.aws.secret});
const s3 = new AWS.S3();


/**
 * Returns any file uploaded by its id, so it can find its key from aws and retrieve a signed url for 5 minutes of usage.
 * @param req
 * @param res
 * @returns {Promise.<*>}
 */
async function photoGet(req, res) {

  if (_.isNaN(+req.params.id)) {
    return res.serverError(response(new Error('id parameter must be number')));
  }

  let file = await File.find({id: req.params.id});

  if (file.length > 0) {
    file = file[0];
    let params = {
      Bucket: sails.config.custom.aws.s3BucketName,
      Key: file.fd,
      Expires: signedUrlExpireSeconds
    };
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err || url.indexOf('invalid') > -1) {
        return res.serverError(response(err));
      }
      return res.ok(response(null, {url: url}));
    });
  } else {
    res.notFound();
  }
}
