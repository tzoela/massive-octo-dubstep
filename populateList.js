var Item = require('./app/models/listItem');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var LineByLineReader = require('line-by-line');
mongoose.connect(configDB.url);


var LIST_NAME = 'list2015.txt'

var lr = new LineByLineReader(LIST_NAME);
var lineCount = 1;

lr.on('line', function(line) {

  var listItem = new Item();

  listItem.itemNumber = lineCount++;
  listItem.description = line;
  listItem.claimed = false;
  listItem.whoClaimed = '';
  listItem.completed = false;
  listItem.link = '';
  listItem.comment = '';

  listItem.save(function(saveError) {
      console.log('saved', listItem.itemNumber)
  });
});
