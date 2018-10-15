/**
 * File.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    fd:      { type: 'string',  unique: true,   required: true },
    type:     { type: 'string',  required: true },
    filename: { type: 'string',  required: true },
    status:   { type: 'string',  required: true },
  },

};

