var Dispatcher = require('../Dispatchers/Dispatcher');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var teamMembersStore = {members:[]};

var MEMBERS_UPDATE = 'members_update';

var TeamMemberStore = assign({}, EventEmitter.prototype, {

  addUpdateListener: function(callback) {
    this.on(MEMBERS_UPDATE, callback);
  },

  removeUpdateListener: function(callback) {
    this.removeListener(MEMBERS_UPDATE, callback);
  },

  getMemberList: function() {
    if(teamMembersStore.members.length === 0) {
      this.updateMemberList();
    }
    return teamMembersStore;
  },

  updateMemberList: function() {
    console.log('update member');
    $.get('/api/about', function(result) {
      teamMembersStore = result;
      this.emit(MEMBERS_UPDATE);
    }.bind(this));
  },

  getMembersByKey: function(key, callback) {
    var membersByKey = {};
    this.getMemberList().members.forEach(function(teamMember) {
      membersByKey[teamMember[key]] = teamMember;
    });
    callback(membersByKey);
  }
});

module.exports = TeamMemberStore;
