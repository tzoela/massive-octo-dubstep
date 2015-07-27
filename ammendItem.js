var Item = require('./app/models/listItem');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var ITEM_NUMBER = PUT ITEM NUMBER HERE!!!;


Item.findOne({
  itemNumber: ITEM_NUMBER
})
.then(function(item) {
  // ITEMS CAN HAVE:
  // itemNumber: Number,
  // description: String,
  // claimed: Boolean,
  // whoClaimed: String,
  // completed: Boolean,
  // link: String,
  // comment: String,
  // retracted: Boolean

  item.save(function() {
    console.log('saved', item.itemNumber)
    process.exit();
  });

});
