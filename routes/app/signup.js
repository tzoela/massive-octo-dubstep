module.exports = function(app, passport) {
  app.get('/signup', function(req, res) {

    res.render('signup.ejs', {
      message: 'Not yet available'//req.flash('signupMessage')
    });

  });


  app.post('/signup', function(req, res) {
    res.render('signup.ejs', {
      message: 'Not yet available'//req.flash('signupMessage')
    });

  });

  // app.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect: '/#profile',
  //   failureRedirect: '/signup',
  //   failureFlash: true
  // }));

}
