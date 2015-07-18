var isLoggedIn = require('../../lib/isLoggedIn');
var userData = require('../../data/teamMembers');

var teamMembers = userData.members;

function addExraInfo(user) {
  var username = user.local.username;
  var teamNames = teamMembers.map(function(memberInfo) {
    return memberInfo.name.toLowerCase();
  });

  console.log(teamNames);
  var teamIndex = teamNames.indexOf(username.toLowerCase());
  if(teamIndex != -1) {
    user.local.picture = teamMembers[teamIndex].image;
  }

  return user;
}

module.exports = function(app) {
  app.get('/profile', isLoggedIn, function(req, res) {
    res.json(addExraInfo(req.user));
  });
}
