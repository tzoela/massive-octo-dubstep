var express = require('express');
var exphbs  = require('express-handlebars');
var teamMembers = require('./teamMembers');

var app = express();
app.use(express.static('public'));


app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.get('/about', function (req, res, next) {
    res.render('partials/about', {
        teamMember: teamMembers.members
    });
});

app.get('/', function (req, res, next) {
    res.render('partials/index');
});

var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('listening at http://%s:%s', host, port);

});
