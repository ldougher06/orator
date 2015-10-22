var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');
var mongo = require('../config/mongodb');

function User (u) {
  this.text = u.text;
};

Object.defineProperty(User, 'collection', {
  get: function () {
    return mongo.getDb().collection('user');
    //return global.db.collection('user');
  }
});

User.create = function (u, cb) {
  User.collection.insertOne(user, cb);
};

User.prototype.save = function(cb) {
  User.collection.save(user, cb);
}

User.setHidden = function (id, cb) {
  User.collection.findOneAndUpdate({_id: ObjectID(id)},
    {$set: {hidden : true}},
    {returnOriginal : false},
  cb);
};

User.dropCollection = function (cb) {
  User.collection.drop(cb);
};

User.findById = function (id, cb) {
  User.collection.findOne({_id: ObjectID(id)}, function (err, users) {
    cb(err, setPrototype(user));
  });
};

User.findAll = function (cb) {
  User.collection.find({hidden: {$ne: true}}).toArray(function (err, users) {
    var prototypedUsers = users.map(function (user) {
      return setPrototype(user);
    });

    cb(err, prototypedUsers);
  });
};

module.exports = User;

function setPrototype(pojo) {
  return _.create(User.prototype, pojo);
}
