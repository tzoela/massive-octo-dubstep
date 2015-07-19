var teamInfo = require('../../lib/teamInfo');
var apicache = require('apicache').middleware;

module.exports = function(app) {
    app.get('/api/about', apicache('1 hour'),function(req, res) {
        teamInfo(function(aboutInfo) {
          console.log('refresh cache /api/about');
          res.json(aboutInfo);
        });
    });
};
