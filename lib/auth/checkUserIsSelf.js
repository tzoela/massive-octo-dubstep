module.exports = function(req, res) {
  return function(dbItem) {
    if (req.user.local.username === req.body.username) {
      return dbItem;
    }

    throw Error('something messed up during authenticating');
  };
}
