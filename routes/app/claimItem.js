var isLoggedIn = require('../../lib/isLoggedIn');
var listItem = require('../../app/models/listItem');
var checkUserIsSelf = require('../../lib/auth/checkUserIsSelf');
var handleErrors = require('../../lib/auth/authError');

function doSteal(req, res, item) {
  if (item.claimed) {
    console.log('stolen, send email!', item.itemNumber, item.whoClaimed, 'by', req.user.local.username);
  }

  return item;
}

function doClaim(req, res, item) {

  item.claimed = true;
  item.whoClaimed = req.user.local.username;
  item.save(function(err, success) {
    if (err) {
      res.status(500).send('it broke trying to do that');
    } else {
      res.send('done');
    }
  });
}

module.exports = function(app, passport) {

  app.put('/claim', isLoggedIn, function(req, res) {
    var itemNumber = req.body.itemNumber;
    listItem.findOne({itemNumber: itemNumber})
      .then(checkUserIsSelf(req, res))
      .then(function(item) {
        return doSteal(req, res, item);
      })
      .then(function(item) {
        doClaim(req, res, item);
      }).then(null, handleErrors(req, res));
  });
}
