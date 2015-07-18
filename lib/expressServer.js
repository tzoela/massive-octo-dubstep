var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('../config/database.js');

mongoose.connect(configDB.url);

require('../config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');
app.use(session({
  secret: 'somesecretthingshouldbeputhereafterinstall'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static('public'));

var server = {
  use: function(arrayOfFunctions) {
    arrayOfFunctions.forEach(function(fun) {
      fun.call({}, app, passport);
    });
  },

  listen: function() {
    var httpServer = app.listen(8080, function() {
      var host = httpServer.address().address;
      var port = httpServer.address().port;
      console.log('listening at http://%s:%s', host, port);
    });
  }
};


module.exports = server;
