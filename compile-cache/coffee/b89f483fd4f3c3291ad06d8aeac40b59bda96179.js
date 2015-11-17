(function() {
  var fs,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  fs = require('fs');

  fs.readFile(process.env.HOME + "/.zshrc", "utf8", function(err, zshFile) {
    var e, envPaths, l, x, _i, _j, _len, _len1, _ref, _ref1;
    envPaths = [];
    _ref = zshFile.split('\n');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      l = _ref[_i];
      if (l.substring(0, 11) === 'export PATH') {
        e = l.split('=').splice(-1)[0];
        e = e.replace(':$PATH', '').replace(/"/g, '');
        if (__indexOf.call(e, ':') >= 0) {
          _ref1 = e.split(':');
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            x = _ref1[_j];
            envPaths.push(x);
          }
        } else {
          envPaths.push(e);
        }
      }
    }
    return process.env.PATH = envPaths.join(':');
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2dtYXNvbi8uYXRvbS9pbml0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQWNBO0FBQUEsTUFBQSxFQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBR0EsRUFBRSxDQUFDLFFBQUgsQ0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQVosR0FBaUIsU0FBN0IsRUFBd0MsTUFBeEMsRUFBZ0QsU0FBQyxHQUFELEVBQU0sT0FBTixHQUFBO0FBQzlDLFFBQUEsbURBQUE7QUFBQSxJQUFBLFFBQUEsR0FBVyxFQUFYLENBQUE7QUFDQTtBQUFBLFNBQUEsMkNBQUE7bUJBQUE7QUFDRSxNQUFBLElBQUcsQ0FBQyxDQUFDLFNBQUYsQ0FBWSxDQUFaLEVBQWMsRUFBZCxDQUFBLEtBQXFCLGFBQXhCO0FBQ0UsUUFBQSxDQUFBLEdBQUksQ0FBQyxDQUFDLEtBQUYsQ0FBUSxHQUFSLENBQVksQ0FBQyxNQUFiLENBQW9CLENBQUEsQ0FBcEIsQ0FBd0IsQ0FBQSxDQUFBLENBQTVCLENBQUE7QUFBQSxRQUNBLENBQUEsR0FBSSxDQUFDLENBQUMsT0FBRixDQUFVLFFBQVYsRUFBbUIsRUFBbkIsQ0FBc0IsQ0FBQyxPQUF2QixDQUErQixJQUEvQixFQUFvQyxFQUFwQyxDQURKLENBQUE7QUFFQSxRQUFBLElBQUcsZUFBTyxDQUFQLEVBQUEsR0FBQSxNQUFIO0FBQ0U7QUFBQSxlQUFBLDhDQUFBOzBCQUFBO0FBQ0UsWUFBQSxRQUFRLENBQUMsSUFBVCxDQUFjLENBQWQsQ0FBQSxDQURGO0FBQUEsV0FERjtTQUFBLE1BQUE7QUFJRSxVQUFBLFFBQVEsQ0FBQyxJQUFULENBQWMsQ0FBZCxDQUFBLENBSkY7U0FIRjtPQURGO0FBQUEsS0FEQTtXQVVBLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBWixHQUFtQixRQUFRLENBQUMsSUFBVCxDQUFjLEdBQWQsRUFYMkI7RUFBQSxDQUFoRCxDQUhBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/gmason/.atom/init.coffee
