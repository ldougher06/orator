var mongo = require('mongodb').MongoClient;
//var mongoose = require('mongoose');
var url = process.env.MONGODB_URL ||
  'mongodb://' +
  process.env.MONGODB_USER +
  ':' + process.env.MONGODB_PASSWORD +
  '@ds051953.mongolab.com:51953/orator';

if(!global.db) {
  mongo.connect(url, function(err, db) {
    console.log("mongo err: ", err);
    console.log("connected to database: " + url);
    global.db = db;
  });
};

