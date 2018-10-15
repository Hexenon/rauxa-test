const should = require('should');
should;
var contactRecord = null;
var defaultContact = {
  name:'Test',
  email:'test@test.com',
  phone:1234567890,
  file:1
};

describe('Contact', () => {
  it ('should validate name',async ()=> {
    try {
      let contact = await Contact.create({}).fetch();
      contact.should.be.null();
    }catch(err){
      err.code.should.be.eqls('E_INVALID_NEW_RECORD');
      err.details.indexOf('Missing value for required attribute `name`').should.be.above(-1);
    }
  });

  it ('should validate email', async () => {
    try {
      let contact = await Contact.create({
        name: defaultContact.name,
        email: 'badFormedEmail'
      }).fetch();

      contact.should.be.null();

    } catch (err) {
      err.code.should.be.eqls('E_INVALID_NEW_RECORD');
      err.details.indexOf('Value was not a valid email address.').should.be.above(-1);
    }
  });

  it ('should validate phone', async () => {
    try {
      let contact = await Contact.create({
        name: defaultContact.name,
        email: defaultContact.email,
        phone: 'abc'
      }).fetch();

      contact.should.be.null();
    } catch (err) {
      err.code.should.be.eqls('E_INVALID_NEW_RECORD');
      err.details.indexOf('New record contains the wrong type of data for property `phone`.').should.be.above(-1);
    }
  });
  it ('should validate file', async () => {
    try {
      let contact = await Contact.create({
        name: defaultContact.name,
        email: defaultContact.email,
        phone: defaultContact.phone
      }).fetch();

      contact.should.be.null();

    } catch (err) {
      err.code.should.be.eqls('E_INVALID_NEW_RECORD');
      err.details.indexOf('Missing value for required attribute `file`').should.be.above(-1);
    }
  });

  it ('should save', async () => {
    try {

      contactRecord = await Contact.create(defaultContact).fetch();
      contactRecord.should.not.be.null();
      contactRecord.id.should.be.eqls(1);
    }catch(err){
      throw err;
    }
  });
  it ('should edit', async () => {
    try {
      defaultContact.name = 'Test 2';
      contactRecord = await Contact.update({id: defaultContact.id}, defaultContact).fetch();
      contactRecord.length.should.be.eqls(1);
      contactRecord = contactRecord[0];
      contactRecord.name.should.be.eqls('Test 2');
      contactRecord.id.should.be.eqls(1);
    }catch(err){
      throw err;
    }
  });
  it ('should get contacts', async () => {
    try{
      let contacts = await Contact.find();
      contacts.length.should.be.above(0);
    }catch(err){
      throw err;
    }
  });
  it ('should delete', async () => {
    try{
      await Contact.destroy({});

    }catch(err){
      throw err;
    }
  });
});

