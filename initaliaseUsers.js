var User = require('./app/models/user');
var teamData = require('./data/teamMembers');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var generatePassword = require('password-generator');

mongoose.connect(configDB.url);

nextUser(null, teamData.members);

function nextUser(error, restUsers) {
  if(error){ return console.log(error)}

  var teamMember = restUsers.pop();

  var user = new User();
  var password = generatePassword(12, false);

  user.local.username = teamMember.name;
  user.local.password = user.generateHash(password);
  user.local.picture = teamMember.image;
  user.local.site = teamMember.website;
  user.local.siteIcon = teamMember.class;
  user.local.quote = teamMember.quote;

  user.save(function(saveError) {
    if(restUsers.length > 0) {
      console.log('Saved', teamMember.name, password);
      nextUser(saveError, restUsers)
    } else {

      process.exit(0);
    }
  });
}
