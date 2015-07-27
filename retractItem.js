var Item = require('./app/models/listItem');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var RETRACTED_ITEM_NUMBER = process.argv[2];
var RETRACT_COMMENT = process.argv[3];

Item.findOne({
  itemNumber: RETRACTED_ITEM_NUMBER
})
.then(function(item) {

  item.retracted = true;
  item.comment = RETRACT_COMMENT;

  item.save(function() {
    console.log('saved', item.itemNumber)
    process.exit();
  });

});
