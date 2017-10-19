/**
 * User schema for Mongoose.
 *
 * @module models/user
 */
var mongoose = require('mongoose');
var Event = require('./event');

var userSchema = mongoose.Schema({
  googleId: String,
  googleToken: String,
  googleEmail: String,
  googleName: String,
  events: [{
    id: {type: mongoose.Schema.Types.ObjectId},
    name: String,
    confirmed: Boolean
  }]
});

module.exports = mongoose.model('User', userSchema);
