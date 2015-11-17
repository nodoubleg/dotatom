(function() {
  var TaskListView, WorkspaceView;

  WorkspaceView = require('atom').WorkspaceView;

  TaskListView = require('../lib/task-list-view');

  describe("TaskListView", function() {
    beforeEach(function() {
      atom.workspaceView = new WorkspaceView();
      return atom.workspaceView.openSync("script.js");
    });
    return describe("when the task-list:toggle event is triggered", function() {
      it("parses TODO comments and adds them to the list", function() {
        var taskView;
        taskView = new TaskListView();
        taskView.attach();
        return expect(atom.workspaceView.find('.task-list ol.list-group li.selected .task-item').text()).toBe("Test Comment");
      });
      return it("displays No Tasks Found if there are not comments", function() {
        var taskView;
        atom.workspaceView.getActivePaneItem().setText("");
        taskView = new TaskListView();
        taskView.attach();
        return expect(atom.workspaceView.find('.task-list ol.list-group li.selected').text()).toBe("No Tasks Found");
      });
    });
  });

}).call(this);
