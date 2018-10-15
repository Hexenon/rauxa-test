/**
 * Contact.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:  { type: 'string',  unique: true,   required: true },
    email: { type: 'string',  isEmail: true,  unique: true, required: true },
    phone: { type: 'number',  unique: true,   required: true },
    file: { model:'File', required: true }
  },

  afterCreate: function(attrs, next) {
    sails.sockets.blast('contact_add', attrs);
    next();
  },
  afterUpdate: function(attrs, next) {
    sails.sockets.blast('contact_update', attrs);
    next();
  },
  beforeDestroy: function(attrs, next) {
    sails.sockets.blast('contact_delete', attrs.where);
    next();
  }
};

