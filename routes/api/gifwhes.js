var gifwhes = require('../../data/gifwhes');
var apicache = require('apicache').middleware;

module.exports = function(app) {

    app.get('/api/gifwhes', apicache('1 hour'), function(req, res) {
        res.json(gifwhes);
    });
};
