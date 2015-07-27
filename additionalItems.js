var Item = require('./app/models/listItem');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var ADDED_ITEM_NUMBER = process.argv[2];
var ADDED_DESCRIPTION = process.argv[3];

var listItem = new Item();

listItem.itemNumber = ADDED_ITEM_NUMBER;
listItem.description = ADDED_DESCRIPTION;
listItem.claimed = false;
listItem.whoClaimed = '';
listItem.completed = false;
listItem.link = '';
listItem.comment = '';

listItem.save(function() {
  console.log('saved', listItem.itemNumber);
  process.exit();
});
