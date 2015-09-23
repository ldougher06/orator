var mongo = require('mongodb').MongoClient;
//var mongoose = require('mongoose');
var url = process.env.MONGODB_URL || 'mongodb://<ldougher>:<"Gandolfs_Kitchen394">@ds051953.mongolab.com:51953/orator';

if(!global.db) {
  mongo.connect(url, function(err, db) {
    global.db = db;
  });
};

