var isLoggedIn = require('../../lib/isLoggedIn');
var User = require('../../app/models/user');
var handleErrors = require('../../lib/auth/authError');

function selectRelevent(user) {
  var relevent = {
    local: {
      quote: user.local.quote,
      siteIcon: user.local.siteIcon,
      site: user.local.site,
      picture: user.local.picture,
      username: user.local.username,
    }
  };

  return relevent;

}

function sendResponse(req, res) {
  return function(user) {
    console.log(user);
    res.json(selectRelevent(user));
  }
}
module.exports = function(app) {
  app.get('/profile', isLoggedIn, function(req, res) {

    var username = req.user.local.username;

    User.findOne({
        'local.username': username
      })
      .then(sendResponse(req, res))
      .then(null, handleErrors(req, res));

  });
}
