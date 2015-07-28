var User = require('../app/models/user');


module.exports = function(callback) {
  User.find({}, 'local')
    .then(function(users) {
      var members = [];
      users.forEach(function(user) {
        if(!user.local.isHelper) {
          members.push({
            name: user.local.username,
            site: user.local.site,
            siteIcon: user.local.siteIcon,
            quote: user.local.quote,
            picture: user.local.picture,
            id: user._id.toString()
          });
        }
      });

      members.sort(function(a, b){
        return a.id.localeCompare(b.id);
      }).reverse();

      callback({members: members});

    });
}
