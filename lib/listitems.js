var ListItem = require('../app/models/listItem');
var User = require('../app/models/user');

module.exports = function(callback) {
  ListItem.find({completed: true})
    .then(function(items) {
      var items = items.map(function(item) {
        item._id = item._id.toString();
        return item;
      });

      items.sort(function(a, b){
        return a.itemNumber - b.itemNumber;
      });

      callback(items);

    });
}
