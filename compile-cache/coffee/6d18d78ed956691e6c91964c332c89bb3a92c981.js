(function() {
  describe('Linter Indie API', function() {
    var Remote, linter, wait;
    linter = null;
    wait = require('./common').wait;
    Remote = require('remote');
    beforeEach(function() {
      global.setTimeout = Remote.getGlobal('setTimeout');
      global.setInterval = Remote.getGlobal('setInterval');
      return waitsForPromise(function() {
        return atom.packages.activate('linter').then(function() {
          return linter = atom.packages.getActivePackage(linter);
        });
      });
    });
    return describe('it works', function() {
      var indieLinter;
      indieLinter = linter.indieLinter.register({
        name: 'Wow'
      });
      indieLinter.setMessages([
        {
          type: 'Error',
          text: 'Hey!'
        }
      ]);
      return waitsForPromise(function() {
        return wait(100).then(function() {
          expect(linter.messages.publicMessages.length).toBe(1);
          indieLinter.deleteMessages();
          return wait(100);
        }).then(function() {
          return expect(linter.messages.publicMessages.length).toBe(0);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2dtYXNvbi8uYXRvbS9wYWNrYWdlcy9saW50ZXIvc3BlYy9saW50ZXItaW5kaWUtYXBpLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsa0JBQVQsRUFBNkIsU0FBQSxHQUFBO0FBRTNCLFFBQUEsb0JBQUE7QUFBQSxJQUFBLE1BQUEsR0FBUyxJQUFULENBQUE7QUFBQSxJQUNDLE9BQVEsT0FBQSxDQUFRLFVBQVIsRUFBUixJQURELENBQUE7QUFBQSxJQUVBLE1BQUEsR0FBUyxPQUFBLENBQVEsUUFBUixDQUZULENBQUE7QUFBQSxJQUlBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLE1BQU0sQ0FBQyxVQUFQLEdBQW9CLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFlBQWpCLENBQXBCLENBQUE7QUFBQSxNQUNBLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLE1BQU0sQ0FBQyxTQUFQLENBQWlCLGFBQWpCLENBRHJCLENBQUE7YUFFQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixRQUF2QixDQUFnQyxDQUFDLElBQWpDLENBQXNDLFNBQUEsR0FBQTtpQkFDcEMsTUFBQSxHQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWQsQ0FBK0IsTUFBL0IsRUFEMkI7UUFBQSxDQUF0QyxFQURjO01BQUEsQ0FBaEIsRUFIUztJQUFBLENBQVgsQ0FKQSxDQUFBO1dBV0EsUUFBQSxDQUFTLFVBQVQsRUFBcUIsU0FBQSxHQUFBO0FBQ25CLFVBQUEsV0FBQTtBQUFBLE1BQUEsV0FBQSxHQUFjLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBbkIsQ0FBNEI7QUFBQSxRQUFDLElBQUEsRUFBTSxLQUFQO09BQTVCLENBQWQsQ0FBQTtBQUFBLE1BQ0EsV0FBVyxDQUFDLFdBQVosQ0FBd0I7UUFBQztBQUFBLFVBQUMsSUFBQSxFQUFNLE9BQVA7QUFBQSxVQUFnQixJQUFBLEVBQU0sTUFBdEI7U0FBRDtPQUF4QixDQURBLENBQUE7YUFFQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUEsQ0FBSyxHQUFMLENBQVMsQ0FBQyxJQUFWLENBQWUsU0FBQSxHQUFBO0FBQ2IsVUFBQSxNQUFBLENBQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBdEMsQ0FBNkMsQ0FBQyxJQUE5QyxDQUFtRCxDQUFuRCxDQUFBLENBQUE7QUFBQSxVQUNBLFdBQVcsQ0FBQyxjQUFaLENBQUEsQ0FEQSxDQUFBO2lCQUVBLElBQUEsQ0FBSyxHQUFMLEVBSGE7UUFBQSxDQUFmLENBSUEsQ0FBQyxJQUpELENBSU0sU0FBQSxHQUFBO2lCQUNKLE1BQUEsQ0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUF0QyxDQUE2QyxDQUFDLElBQTlDLENBQW1ELENBQW5ELEVBREk7UUFBQSxDQUpOLEVBRGM7TUFBQSxDQUFoQixFQUhtQjtJQUFBLENBQXJCLEVBYjJCO0VBQUEsQ0FBN0IsQ0FBQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/gmason/.atom/packages/linter/spec/linter-indie-api.coffee
