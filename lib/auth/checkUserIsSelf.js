module.exports = function(req, res) {
  return function(user) {
    if (req.user.local.username === req.body.username) {
      return user;
    }

    throw Error('something messed up during authenticating');
  };
}
