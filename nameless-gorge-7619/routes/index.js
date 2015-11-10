var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Nodemailer = require('../models/Nodemailer');

router.get('/', function goHome (req, res) {
  res.render('./user/index.ejs');
});

router.get('/profile', function (req, res) {
  res.render('./user/profile.ejs');
});

router.post('/profile', function (req, res) {
  console.log(req.body);
  var collection = global.db.collection('heroku_orator');
  collection.save(req.body, function(){
    Nodemailer.send(req.body, function (){
       res.redirect('/exit');
     });
  });
});

router.get('/exit', function(req, res){
  res.render('./user/exit.ejs');
});

module.exports = router;
