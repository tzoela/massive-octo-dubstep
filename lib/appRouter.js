var login = require('../routes/app/login');
var logout = require('../routes/app/logout');
var profile = require('../routes/app/profile');
var navigation = require('../routes/app/navigation');

module.exports = function(app, passport) {
  'use strict';

  login(app, passport);
  logout(app);
  profile(app);
  navigation(app);
};
