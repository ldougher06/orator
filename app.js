var fs = require('fs');

var express = require('express');
var lessCSS = require('less-middleware');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var user = require('./routes/user');

var app = express();

if(process.env.NODE_ENV !== 'production') {
  require('./config/secrets');
}

require('./config/mongodb');

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.locals.title = 'Orator';
app.locals.user = null;

app.use(bodyParser.urlencoded({extended: true}));
app.use(lessCSS('public'));

var logStream = fs.createWriteStream('access.log', {flags: 'a'});
app.use(morgan('combined', {stream: logStream}));
app.use(morgan('dev'));
app.use(session({
  secret: 'oratororatororator',
  resave: false,
  saveUninitialized: true
}));

app.use('/user', user);

app.use(function requireAuth(req, res, next) {
  if(req.session.user) {
    res.locals.user = req.session.user;
    next();
  } else {
    res.locals.user = null;
    res.redirect('/user/login');
  }
});

app.use(function (req, res, next) {
  var client = require('./lib/loggly')('incoming');

  client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method
  });
  next();
});

app.use(express.static('public'));

app.use('/', routes);

app.use(function(req, res) {
  res.status(403).send('Unauthorized');
});

var port = process.env.PORT || 2525;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(process.env);
  console.log('Example app listening at http://%s:%d', host, port);
});

module.exports = app;
