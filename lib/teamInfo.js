var User = require('../app/models/user');


module.exports = function(callback) {
  User.find({}, 'local')
    .then(function(users) {
      var members = users.map(function(member) {
        return {
          name: member.local.username,
          site: member.local.site,
          siteIcon: member.local.siteIcon,
          quote: member.local.quote,
          picture: member.local.picture,
          id: member._id.toString()
        }
      });

      members.sort(function(a, b){
        return a.id.localeCompare(b.id);
      }).reverse();

      callback({members: members});

    });
}
