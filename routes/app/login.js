module.exports = function(app, passport) {
  app.get('/login', function(req, res) {

    res.json(req.flash('signupMessage'));

  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/#profile',
    failureRedirect: '/'
  }));

}
