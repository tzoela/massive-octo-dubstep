var isLoggedIn = require('../../lib/isLoggedIn');
var User = require('../../app/models/user');
var handleErrors = require('../../lib/auth/authError');
var checkUserIsSelf = require('../../lib/auth/checkUserIsSelf');
var checkUserPass = require('../../lib/auth/checkUserPass');
var apicache = require('apicache');

function doUpdateInfo(req, res) {
  return function(user) {
    // req.body.toupdate;
    var username = user.local.username;
    var updated = user;
    user.local[req.body.updatekey] = req.body.updatevalue;

    user.save(function(err, success) {
      if(err){console.log('error updating', err);}
      console.log('user', user, 'success', success);
      apicache.clear();
      res.send(success);
    });
  };
}

module.exports = function(app, passport) {

  app.put('/update', isLoggedIn, function(req, res) {
      res.status(200).send('Pretend done');

    // User.findOne({
    //     'local.username': req.body.username
    //   })
    //   .then(checkUserPass(req, res))
    //   .then(checkUserIsSelf(req, res))
    //   .then(doUpdateInfo(req, res))
    //   .then(null, handleErrors(req, res));
  });

}
