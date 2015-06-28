var express = require('express');

var app = express();
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
