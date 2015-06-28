var about = require('../../data/teamMembers');
var apicache = require('apicache').middleware;

module.exports = function(app) {

    app.get('/api/about', apicache('1 hour'), function(req, res) {
        res.json(about);
    });
};
