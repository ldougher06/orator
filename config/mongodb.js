var mongo = require('mongodb').MongoClient;
// var mongoose = require('mongoose');
var MONGODB_USER = process.env.MONGODB_USER || 'heroku_1dlj3vsk';
var MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "2pt5m8eq442c2a3ckpo9kfrh5e";
var url = process.env.MONGODB_URL ||
  'mongodb://' +
  MONGODB_USER +
  ':' + MONGODB_PASSWORD +
  '@ds053764.mongolab.com:53764/heroku_1dlj3vsk';

if(!global.db) {
  mongo.connect(url, function(err, db) {
    console.log("mongo err: ", err);
    console.log("connected to database: " + url);
    global.db = db;
  });
};

