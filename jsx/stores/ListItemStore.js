var Dispatcher = require('../Dispatchers/Dispatcher');
var TeamMemberStore = require('./TeamMemberStore');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var listStore = [];

var LIST_UPDATE = 'LIST_UPDATE';

var ListItemStore = assign({}, EventEmitter.prototype, {

  addUpdateListener: function(callback) {
    this.on(LIST_UPDATE, callback);
  },

  removeUpdateListener: function(callback) {
    this.removeListener(LIST_UPDATE, callback);
  },

  getMemberList: function() {
    if(listStore.length === 0) {
      TeamMemberStore.addUpdateListener(this.updateListStore);
      this.updateListStore();
    }
    return listStore;
  },

  updateListStore: function() {
    $.get('/listitems', function(result) {
      listStore = result;
      this._assignPicturesToList();
      this.emit(LIST_UPDATE);
    }.bind(this));
  },

  _assignPicturesToList: function() {
    listStore.forEach(function(item) {
      if(item.claimed) {
        item.claimerPicture = TeamMemberStore.getMemberByKeyValue('name', item.whoClaimed);
      }
    });
    window.JOEL = listStore;
  }
});

module.exports = ListItemStore;
