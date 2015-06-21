var express = require('express');
var exphbs  = require('express-handlebars');
var cache = require('memory-cache');

var app = express();
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var server = {
    use: function(arrayOfFunctions) {
        arrayOfFunctions.forEach(function(fun) {
            fun.call({}, app, cache);
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
