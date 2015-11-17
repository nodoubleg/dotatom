(function() {
  var TaskListView;

  TaskListView = require('./task-list-view');

  module.exports = {
    taskListView: null,
    activate: function(state) {
      return new TaskListView();
    }
  };

}).call(this);
