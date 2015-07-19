module.exports = function(req, res) {
  return function(user) {
    if (user.validPassword(req.body.password)) {
      return user;
    }

    throw Error('things went wrong authenticating');
  };
}
