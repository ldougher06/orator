var express = require('express');
//var moment = require('moment');
var router = express.Router();

var User = require('../models/User');

router.get('/', function goHome (req, res) {
  res.render('./user/index.ejs');
});

router.get('/profile', function (req, res) {
  res.render('./user/profile.ejs');
});

router.post('/profile', function (req, res) {
  console.log(req.body);
  var collection = global.db.collection('user');
  collection.save(req.body, function(){
    res.redirect('/calendar');
  });
});

router.get('/calendar', function userCalendar(req, res) {
  res.render('./user/calendar.ejs');
});

module.exports = router;
