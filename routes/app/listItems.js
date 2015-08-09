var listItems = require('../../lib/listitems');
var apicache = require('apicache').middleware;

module.exports = function(app) {
  app.get('/listitems', apicache('1 hour'), function(req, res) {
    listItems(function(items) {
      res.json(items);
    });
  });
};
