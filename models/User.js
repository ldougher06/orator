var mongoose = require('mongoose');

var userProfile = mongoose.model('User', {
  name: String,
  work: String,
  position: String,
  email: String,
  availability: String
});

module.exports = userProfile;
