var express = require('express');
var exphbs  = require('express-handlebars');
var apicache  = require('apicache');
var cache = apicache.middleware;

var teamMembers = require('./data/teamMembers');
var gifwhes = require('./data/gifwhes');
var gishwhes = require('./data/gishwhes');
var showcase = require('./data/showcase');

var app = express();
app.use(express.static('public'));


app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.use(function(req, res, next) {
    res.set({
        'Cache-Control':'maxAge=3600',
        'X-Gish-Type': 'DinoMite'
    });
    next();
});

app.get('/showcase', cache('1 hour'), function(req, res, next) {
    res.render('partials/showcase', {
        images: showcase
    });
});

app.get('/gifwhes', cache('1 hour'), function(req, res, next) {
    res.render('partials/submissions', {
        submissions: gifwhes,
        title: "GifWhes"
    });
});
app.get('/gishwhes', cache('1 hour'), function(req, res, next) {
    res.render('partials/submissions', {
        submissions: gishwhes,
        title: "GISHWHES"
    });
});

app.get('/about', cache('1 hour'), function (req, res, next) {
    res.render('partials/about', {
        teamMember: teamMembers.members
    });
});

app.get('/', cache('1 hour'), function (req, res, next) {
    res.render('partials/index');
});

var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('listening at http://%s:%s', host, port);

});
