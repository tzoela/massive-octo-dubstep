var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var listItemSchema = mongoose.Schema({
  itemNumber: Number,
  description: String,
  claimed: Boolean,
  whoClaimed: String,
  completed: Boolean,
  link: String,
  comment: String,
  retracted: Boolean
});


module.exports = mongoose.model('listItem', listItemSchema);
