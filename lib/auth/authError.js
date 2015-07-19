module.exports = function(req, res) {
  return function(error) {
    res.status(403).send(error.message);
  };
}
