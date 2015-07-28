var User = require('./app/models/user');
var teamData = require('./ignoreme.json');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var generatePassword = require('password-generator');

mongoose.connect(configDB.url);

nextUser(null, teamData.helpers);

function nextUser(error, restUsers) {
  if(error){ return console.log(error)}

  var teamMember = restUsers.pop();

  var user = new User();
  var password = generatePassword(12, false);

  user.local.username = teamMember.name;
  user.local.password = user.generateHash(password);
  user.local.email = teamMember.email;
  user.local.isHelper = true;

  user.save(function(saveError) {
    if(restUsers.length > 0) {
      console.log('Saved', teamMember.name, password);
      nextUser(saveError, restUsers)
    } else {

      process.exit(0);
    }
  });
}
