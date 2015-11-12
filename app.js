var fs = require('fs');

var express = require('express');
var lessCSS = require('less-middleware');
var morgan = require('morgan');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

// if(process.env.NODE_ENV !== 'production') {
//   require('./config/secrets');
// }
console.log('###################################');
require('./config/mongodb');

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.locals.title = 'Orator';

/*app.use(session({
  secret: 'oratororatororator'
}));*/


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(lessCSS('public/less'));

//var logStream = fs.createWriteStream('access.log', {flags: 'a'});
// app.use(morgan('combined', {stream: logStream}));
app.use(morgan('dev'));

app.use(express.static('public'));

var routes = require('./routes/index');

app.use('/', routes);

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(process.env);
  console.log('Example app listening at http://%s:%d', host, port);
});

module.exports = app;
