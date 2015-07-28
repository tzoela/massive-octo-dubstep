var User = require('./app/models/user');
var teamData = require('./ignoreme.json');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

nextUser(null, teamData.members);

function nextUser(error, restUsers) {
  if(error){ return console.log(error)}

  var teamMember = restUsers.pop();

  User.findOne({'local.username': teamMember.name})
  .then(function(user) {
    user.local.email = teamMember.email;

    user.save(function(saveError) {
      if(restUsers.length > 0) {
        console.log('Saved', teamMember.name);
        nextUser(saveError, restUsers)
      } else {

        process.exit(0);
      }
    });
  });




}
