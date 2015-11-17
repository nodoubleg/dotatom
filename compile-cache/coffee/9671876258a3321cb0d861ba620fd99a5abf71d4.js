(function() {
  var TaskList, WorkspaceView;

  WorkspaceView = require('atom').WorkspaceView;

  TaskList = require('../lib/task-list');

  describe("TaskList", function() {
    var activationPromise;
    activationPromise = null;
    beforeEach(function() {
      atom.workspaceView = new WorkspaceView();
      atom.workspaceView.openSync("script.js");
      return activationPromise = atom.packages.activatePackage('task-list');
    });
    return describe("when the task-list:toggle event is triggered", function() {
      return it("attaches and then detaches the view", function() {
        expect(atom.workspaceView.find('.task-list')).not.toExist();
        atom.workspaceView.trigger('task-list:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          expect(atom.workspaceView.find('.task-list')).toExist();
          atom.workspaceView.trigger('task-list:toggle');
          return expect(atom.workspaceView.find('.task-list')).not.toExist();
        });
      });
    });
  });

}).call(this);
