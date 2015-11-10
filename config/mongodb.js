var mongo = require('mongodb').MongoClient;
//var mongoose = require('mongoose');
var MONGODB_USER = process.env.MONGODB_USER;
var MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
var url = process.env.MONGODB_URL ||
  'mongodb://' +
  MONGODB_USER +
  ':' + MONGODB_PASSWORD +
  '@ds041934.mongolab.com:41934/heroku_tkzk0lsm';

if(!global.db) {
  mongo.connect(url, function(err, db) {
    console.log("mongo err: ", err);
    console.log("connected to database: " + url);
    global.db = db;
  });
};

