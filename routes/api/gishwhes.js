var gishwhes = require('../../data/gishwhes');
var apicache = require('apicache').middleware;

module.exports = function(app) {

    app.get('/api/gishwhes', apicache('1 hour'), function(req, res) {
        res.json(gishwhes);
    });
};
