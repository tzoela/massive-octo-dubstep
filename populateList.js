var Item = require('./app/models/listItem');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var LineByLineReader = require('line-by-line');
mongoose.connect(configDB.url);


var LIST_NAME = 'list2013.txt'

var lr = new LineByLineReader(LIST_NAME);
var lineCount = 1;

lr.on('line', function(line) {

  var listItem = new Item();

  listItem.itemNumber = lineCount++;
  listItem.description = line;
  listItem.claimed = true;
  listItem.whoClaimed = 'Joel';
  listItem.completed = false;
  listItem.link = '';
  listItem.comment = '';

  listItem.save(function(saveError) {
      console.log('saved', listItem.itemNumber)
  });
});
