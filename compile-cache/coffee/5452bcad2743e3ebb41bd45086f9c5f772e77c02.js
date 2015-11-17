(function() {
  describe('Commands', function() {
    var getMessage, linter;
    linter = null;
    beforeEach(function() {
      return waitsForPromise(function() {
        return atom.packages.activatePackage('linter').then(function() {
          return linter = atom.packages.getActivePackage('linter').mainModule.instance;
        });
      });
    });
    getMessage = function(type, filePath) {
      return {
        type: type,
        text: 'Some Message',
        filePath: filePath
      };
    };
    describe('linter:togglePanel', function() {
      return it('toggles the panel visibility', function() {
        var visibility;
        linter.views.panel.scope = 'Project';
        linter.views.panel.setMessages({
          added: [getMessage('Error')],
          removed: []
        });
        visibility = linter.views.panel.getVisibility();
        expect(visibility).toBe(true);
        linter.commands.togglePanel();
        expect(linter.views.panel.getVisibility()).toBe(!visibility);
        linter.commands.togglePanel();
        return expect(linter.views.panel.getVisibility()).toBe(visibility);
      });
    });
    return describe('linter:toggle', function() {
      return it('relint when enabled', function() {
        return waitsForPromise(function() {
          return atom.workspace.open(__dirname + '/fixtures/file.txt').then(function() {
            spyOn(linter.commands, 'lint');
            linter.commands.toggleLinter();
            linter.commands.toggleLinter();
            return expect(linter.commands.lint).toHaveBeenCalled();
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2dtYXNvbi8uYXRvbS9wYWNrYWdlcy9saW50ZXIvc3BlYy9jb21tYW5kcy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsVUFBVCxFQUFxQixTQUFBLEdBQUE7QUFDbkIsUUFBQSxrQkFBQTtBQUFBLElBQUEsTUFBQSxHQUFTLElBQVQsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTthQUNULGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLFFBQTlCLENBQXVDLENBQUMsSUFBeEMsQ0FBNkMsU0FBQSxHQUFBO2lCQUMzQyxNQUFBLEdBQVMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZCxDQUErQixRQUEvQixDQUF3QyxDQUFDLFVBQVUsQ0FBQyxTQURsQjtRQUFBLENBQTdDLEVBRGM7TUFBQSxDQUFoQixFQURTO0lBQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxJQU9BLFVBQUEsR0FBYSxTQUFDLElBQUQsRUFBTyxRQUFQLEdBQUE7QUFDWCxhQUFPO0FBQUEsUUFBQyxNQUFBLElBQUQ7QUFBQSxRQUFPLElBQUEsRUFBTSxjQUFiO0FBQUEsUUFBNkIsVUFBQSxRQUE3QjtPQUFQLENBRFc7SUFBQSxDQVBiLENBQUE7QUFBQSxJQVVBLFFBQUEsQ0FBUyxvQkFBVCxFQUErQixTQUFBLEdBQUE7YUFDN0IsRUFBQSxDQUFHLDhCQUFILEVBQW1DLFNBQUEsR0FBQTtBQUVqQyxZQUFBLFVBQUE7QUFBQSxRQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQW5CLEdBQTJCLFNBQTNCLENBQUE7QUFBQSxRQUNBLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQW5CLENBQStCO0FBQUEsVUFBQyxLQUFBLEVBQU8sQ0FBQyxVQUFBLENBQVcsT0FBWCxDQUFELENBQVI7QUFBQSxVQUErQixPQUFBLEVBQVMsRUFBeEM7U0FBL0IsQ0FEQSxDQUFBO0FBQUEsUUFHQSxVQUFBLEdBQWEsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBbkIsQ0FBQSxDQUhiLENBQUE7QUFBQSxRQUlBLE1BQUEsQ0FBTyxVQUFQLENBQWtCLENBQUMsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FKQSxDQUFBO0FBQUEsUUFLQSxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQWhCLENBQUEsQ0FMQSxDQUFBO0FBQUEsUUFNQSxNQUFBLENBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBbkIsQ0FBQSxDQUFQLENBQTBDLENBQUMsSUFBM0MsQ0FBZ0QsQ0FBQSxVQUFoRCxDQU5BLENBQUE7QUFBQSxRQU9BLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBaEIsQ0FBQSxDQVBBLENBQUE7ZUFRQSxNQUFBLENBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBbkIsQ0FBQSxDQUFQLENBQTBDLENBQUMsSUFBM0MsQ0FBZ0QsVUFBaEQsRUFWaUM7TUFBQSxDQUFuQyxFQUQ2QjtJQUFBLENBQS9CLENBVkEsQ0FBQTtXQXVCQSxRQUFBLENBQVMsZUFBVCxFQUEwQixTQUFBLEdBQUE7YUFDeEIsRUFBQSxDQUFHLHFCQUFILEVBQTBCLFNBQUEsR0FBQTtlQUN4QixlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsU0FBQSxHQUFZLG9CQUFoQyxDQUFxRCxDQUFDLElBQXRELENBQTJELFNBQUEsR0FBQTtBQUN6RCxZQUFBLEtBQUEsQ0FBTSxNQUFNLENBQUMsUUFBYixFQUF1QixNQUF2QixDQUFBLENBQUE7QUFBQSxZQUNBLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBaEIsQ0FBQSxDQURBLENBQUE7QUFBQSxZQUVBLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBaEIsQ0FBQSxDQUZBLENBQUE7bUJBR0EsTUFBQSxDQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBdkIsQ0FBNEIsQ0FBQyxnQkFBN0IsQ0FBQSxFQUp5RDtVQUFBLENBQTNELEVBRGM7UUFBQSxDQUFoQixFQUR3QjtNQUFBLENBQTFCLEVBRHdCO0lBQUEsQ0FBMUIsRUF4Qm1CO0VBQUEsQ0FBckIsQ0FBQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/gmason/.atom/packages/linter/spec/commands-spec.coffee
