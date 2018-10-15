
describe('Photo', () => {
  it('should get not found',                          getNotFound);
  it('should get error parameter must be number',     getParamNaN);
  it('should get aws error',                          getAwsError);
  it('should upload bad request',                     postBadRequest);
  it('should upload server error max size',           postMaxSize);
  it('should upload aws error',                       postUploadError);
  it('should upload',                                 postUpload);
  it('should get signed url',                         getSignedUrl);
  it('should delete not found',                       deleteNotFound);
  it('should delete error parameter must be number',  deleteParamNaN);
  it('should delete aws error',                          deleteAwsError);
  it('should delete successfully',                    deleteSuccess);
});


//////////////////////////////////////////////////////////
// Variables
//////////////////////////////////////////////////////////
const supertest = require('supertest');
const should = require('should');
should;
const server = supertest.agent('http://localhost:1337');
var fileUploaded = null;

//////////////////////////////////////////////////////////
// Functions
//////////////////////////////////////////////////////////

function getNotFound(done){
  server
    .get('/api/v1/photo/1')
    .expect(404)
    .end(() => {
      done();
    });
}

function getParamNaN(done){
  server
    .get('/api/v1/photo/notanumber')
    .expect(500)
    .end(() => {
      done();
    });
}

function getAwsError(done){
  (async()=>{
    let newFile = await File.create({
      fd: 'invalid fd',
      type: 'not a type',
      filename: 'not a filename',
      status:   'not a status'
    }).fetch();

    server
      .get('/api/v1/photo/'+newFile.id)
      .expect(500)
      .end(async ()=>{
        await File.destroy({id: newFile.id});
        done();
      });
  })();
}

function postBadRequest(done){
  server
    .post('/api/v1/photo/upload')
    .expect(400)
    .end(() => {
      done();
    });
}

function postMaxSize(done){
  server
    .post('/api/v1/photo/upload')
    .attach('file', `${__dirname}/../file/heavy.png`)
    .expect(500)
    .end(() => {
      done();
    });
}

function postUploadError(done){
  server
    .post('/api/v1/photo/upload')
    .attach('file', `${__dirname}/../file/file.pdf`)
    .expect(500)
    .end(() => {
      done();
    });
}

function postUpload(done){
  server
    .post('/api/v1/photo/upload')
    .attach('file', `${__dirname}/../file/normal.jpg`)
    .expect(200)
    .end((err,res) => {
      if (err){
        return done(err);
      }
      res.status.should.equal(200);
      res.body.data.files.length.should.be.above(0);

      fileUploaded = res.body.data.files[0];

      done();
    });
}

function getSignedUrl(done){
  server
    .get('/api/v1/photo/'+fileUploaded.id)
    .expect(200)
    .end((err,res) => {
      if (err){
        return done(err);
      }
      res.status.should.equal(200);
      res.body.data.url.should.not.be.null();
      done();
    });
}

function deleteNotFound(done){
  server
    .delete('/api/v1/photo/99999')
    .expect(404)
    .end(() => {
      done();
    });
}

function deleteParamNaN(done){
  server
    .delete('/api/v1/photo/notanumber')
    .expect(500)
    .end(() => {
      done();
    });
}

function deleteAwsError(done){
  (async()=>{
    let newFile = await File.create({
      fd: 'invalid fd2',
      type: 'not a type2',
      filename: 'not a filename2',
      status:   'not a status2'
    }).fetch();

    server
      .delete('/api/v1/photo/'+newFile.id)
      .expect(500)
      .end(done);
  })();
}

function deleteSuccess(done){
  server
    .delete('/api/v1/photo/'+fileUploaded.id)
    .expect(200)
    .end((err,res) => {
      if (err){
        return done(err);
      }
      res.status.should.equal(200);
      res.body.status.should.be.eqls('SUCCESS');
      done();
    });
}
