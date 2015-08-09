var login = require('../routes/app/login');
var logout = require('../routes/app/logout');
var profile = require('../routes/app/profile');
var navigation = require('../routes/app/navigation');
var update = require('../routes/app/updateUserInfo');
var listitems = require('../routes/app/listItems');
// var claimitem = require('../routes/app/claimItem');
// var revokeclaim = require('../routes/app/revokeclaim');
// var submit = require('../routes/app/submit');

module.exports = function(app, passport) {
  'use strict';

  login(app, passport);
  logout(app);
  profile(app);
  navigation(app);
  update(app, passport);
  listitems(app);
  // claimitem(app, passport);
  // revokeclaim(app, passport);
  // submit(app, passport);
};
