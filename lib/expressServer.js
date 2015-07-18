var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

// require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'somesecretthingshouldbeputhereafterinstall' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.use(express.static('public'));

var server = {
    use: function(arrayOfFunctions) {
        arrayOfFunctions.forEach(function(fun) {
            fun.call({}, app);
        });
    },

    listen: function() {
        var httpServer = app.listen(8080, function () {
            var host = httpServer.address().address;
            var port = httpServer.address().port;
            console.log('listening at http://%s:%s', host, port);
        });
    }
};


module.exports = server;
