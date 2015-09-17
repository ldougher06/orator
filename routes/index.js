var express = require('express');
var router = express.Router();

/// ROUTES ////

//////route, callback
router.get('/', function (req, res) {
  res.send('Yelloooooo');
});

router.get('/hello', function (req, res) {
  res.send('Hello!');
});


router.get('/test', function (req, res, next) {
  res.write('test1');
  next();
});

router.get('/test', function (req, res) {
  res.end('test2');
});

router.get('/json', function (req, res) {
  res.send({an: 'object'});
});

router.get('/thisshoulderror', function (req, res) {
  res.send(badVariable);
});

module.exports = router;
