var bcrypt = require('bcrypt');
var _ = require('lodash');

function User (u) {
  this.email = u.email;
  this.hashedPassword = u.hashedPassword;
};

User.findByEmail = function (email, cb) {
  User.collection.findOne({email: email}, function (err, user) {
  cb(err, setPrototype(user));
  });
};

User.login = function (u, cb) {
  User.findByEmail(u.email, function (err, user) {
    if(user) {
      // email found
      bcrypt.compare(u.password, user.hashedPassword, function (err, match) {
        if (match) {
          // login the user
          cb(null, user);
        } else {
          // bad password etc.
          cb('Bad email or password!!!');
        }
      });
    } else {
      // no email found
      cb('Bad email or password!!!');
    }
  });
};

User.create = function (u, cb) {
  if (u.password !== u.password_confirm) {
    cb('passwords do not match');
  }
  bcrypt.hash(u.password, 8, function(err, hash) {
    u.hashedPassword = hash;
    var user = new User(u);
    user.save(cb);
  });
};

User.prototype.save = function(cb) {
  User.collection.save(this, cb);
};

Object.defineProperty(User, 'collection', {
  get: function () {
    return global.db.collection('user');
  }
});

module.exports = User;

function setPrototype(pojo) {
  return _.create(User.prototype, pojo);
}
