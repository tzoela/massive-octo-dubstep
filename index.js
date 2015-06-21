var express = require('express');
var exphbs  = require('express-handlebars');
var cache = require('memory-cache');

var router = require('./lib/router');
var setUpHeaders = require('./lib/setUpHeaders');

var app = express();
app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

setUpHeaders(app);
router(app, cache);

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});
