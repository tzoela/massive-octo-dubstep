var isLoggedIn = require('../../lib/isLoggedIn');
var listItem = require('../../app/models/listItem');
var handleErrors = require('../../lib/auth/authError');

function doSubmit(req, res, item) {

  item.link = req.body.link;
  item.completed = true;
  item.save(function(err, success) {
    if (err) {
      res.status(500).send('it broke trying to do that');
    } else {
      res.send('done');
    }
  });
}

module.exports = function(app, passport) {

  app.put('/submit', isLoggedIn, function(req, res) {
    var itemNumber = req.body.itemNumber;
    listItem.findOne({itemNumber: itemNumber})
      .then(function(item) {
        doSubmit(req, res, item);
      }).then(null, handleErrors(req, res));
  });
}
