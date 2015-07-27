var isLoggedIn = require('../../lib/isLoggedIn');
var listItem = require('../../app/models/listItem');
var handleErrors = require('../../lib/auth/authError');

function doRevoke(req, res, item) {

  item.claimed = false;
  item.whoClaimed = '';
  item.save(function(err, success) {
    if (err) {
      res.status(500).send('it broke trying to do that');
    } else {
      res.send('done');
    }
  });
}

module.exports = function(app, passport) {

  app.put('/revokeclaim', isLoggedIn, function(req, res) {
    var itemNumber = req.body.itemNumber;
    listItem.findOne({itemNumber: itemNumber})
      .then(function(item) {
        doRevoke(req, res, item);
      }).then(null, handleErrors(req, res));
  });
}
