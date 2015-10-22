var mongo = require('mongodb').MongoClient;
//var mongoose = require('mongoose');
var url = process.env.MONGODB_URL;

if(!global.db) {
  mongo.connect(url, function(err, db) {
    console.log("mongo err: ", err);
    global.db = db;
  });
};

