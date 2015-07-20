var listItems = require('../../lib/listitems');
var apicache = require('apicache').middleware;

module.exports = function(app) {
    app.get('/listitems', function(req, res) {
      if (req.isAuthenticated()) {
        listItems(function(items) {
          res.json(items);
        });
      } else {
        res.send(403);
      }
    });
};
