var Sails = require('sails');

// Global before hook
before(done => {
  // Lift Sails with test database
  Sails.lift({
    log: {
      level: 'silent'
    },
    models: {
      connection: 'test',
      migrate: 'drop'
    }
  }, err => {
    console.log(err);
    if (err) {
      return done(err);
    }
    return done();
  });
});

// Global after hook
after(done => {
  Sails.lower(done);
});
