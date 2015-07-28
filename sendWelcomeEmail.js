var User = require('./lib/email');
var teamData = require('./ignoreme.json');

nextUser(teamData.members);

function nextUser(restUsers) {

  var teamMember = restUsers.pop();

  var message = "Welcome to teamoxfordsnotbrogues.com, if you haven't done so, please get your login details from Joel" +
  "\n You should also add this address to your contacts, so that future emails don't get put in your spam" +
  "\n Updates during the hunt may come from this address, such as if another team member has stolen an item you claimed" +
  "\n This address is a noreply email address and has no inbox, so emails sent to it will be rejected by the mail server" +
  "\n if you need to contact anyone, contact that person directly." +
  "\n LOTS OF LOVE," +
  "\n teamoxfordsnotbrogues mailbot :)";

  email.sendTo(teamMember.email, "Welcome to teamoxfordsnotbrogues.com", message);

  nextUser(restUsers)
  });
}
