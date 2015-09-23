var fs = require('fs');

var lessCSS = require('less-middleware');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');

var app = express();

var routes = require('./routes/index');

app.use('/', routes);

if(process.env.NODE_ENV !== 'production') {
  require('./config/secrets');
}

require('./config/mongodb');

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.locals.title = 'Orator';

app.use(session({
  secret: 'oratororatororator'
}));


app.use(bodyParser.urlencoded({extended: true}));
app.use(lessCSS('public/less'));

var logStream = fs.createWriteStream('access.log', {flags: 'a'});
app.use(morgan('combined', {stream: logStream}));
app.use(morgan('dev'));

app.use(express.static('public'));

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(process.env);
  console.log('Example app listening at http://%s:%d', host, port);
});

module.exports = app;
