var isLoggedIn = require('../../lib/isLoggedIn');
var User = require('../../app/models/user');
var listItem = require('../../app/models/listItem');
var handleErrors = require('../../lib/auth/authError');
var email = require('../../lib/email');

function doSteal(req, res, item) {
  if (item.claimed && item.whoClaimed) {
    User.findOne({'local.username': item.whoClaimed})
    .then(function(user) {
      var emailMessage = user.local.username.toUpperCase() +
      '! \n Your item has been stolen by ' + req.user.local.username;
      email.sendTo(user.local.email, 'ITEM' + item.itemNumber + ' STOLEN!', emailMessage);
      console.log(user.local.email, 'ITEM' + item.itemNumber + ' STOLEN!', emailMessage);
    });
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
      .then(function(item) {
        return doSteal(req, res, item);
      })
      .then(function(item) {
        doClaim(req, res, item);
      }).then(null, handleErrors(req, res));
  });
}
