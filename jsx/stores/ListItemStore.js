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
      TeamMemberStore.addUpdateListener(this.updateListStore.bind(this));
      this.updateListStore();
    }
    return listStore;
  },

  assignPicturesToList: function() {
    var copiedListStore = JSON.parse(JSON.stringify(listStore));

    TeamMemberStore.getMembersByKey('name', function(membersByName) {

      copiedListStore.forEach(function(item) {
        if(item.claimed && membersByName[item.whoClaimed]) {
          item.claimerPicture = membersByName[item.whoClaimed].picture;
        }
      });
      listStore = copiedListStore;
      this.emit(LIST_UPDATE);
    }.bind(this));

  },

  updateListStore: function() {
    $.get('/listitems', function(result) {
      listStore = result;
      this.assignPicturesToList();
      this.emit(LIST_UPDATE);
    }.bind(this));
  }
});

module.exports = ListItemStore;
