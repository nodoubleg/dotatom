(function() {
  var Linter, LinterShellcheck, findFile, linterPath,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  linterPath = atom.packages.getLoadedPackage("linter").path;

  Linter = require("" + linterPath + "/lib/linter");

  findFile = require("" + linterPath + "/lib/util");

  LinterShellcheck = (function(_super) {
    __extends(LinterShellcheck, _super);

    LinterShellcheck.syntax = 'source.shell';

    LinterShellcheck.prototype.cmd = 'shellcheck -f gcc';

    LinterShellcheck.prototype.executablePath = null;

    LinterShellcheck.prototype.linterName = 'shellcheck';

    LinterShellcheck.prototype.regex = '.+?:(?<line>\\d+):(?<col>\\d+):\\s((?<error>error)|(?<warning>.+)):\\s(?<message>.+)';

    function LinterShellcheck(editor) {
      LinterShellcheck.__super__.constructor.call(this, editor);
      atom.config.observe('linter-shellcheck.shellcheckExecutablePath', (function(_this) {
        return function() {
          return _this.executablePath = atom.config.get('linter-shellcheck.shellcheckExecutablePath');
        };
      })(this));
    }

    LinterShellcheck.prototype.destroy = function() {
      return atom.config.unobserve('linter-shellcheck.shellcheckExecutablePath');
    };

    return LinterShellcheck;

  })(Linter);

  module.exports = LinterShellcheck;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxVQUFBLEdBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZCxDQUErQixRQUEvQixDQUF3QyxDQUFDLElBQXRELENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVMsT0FBQSxDQUFRLEVBQUEsR0FBRSxVQUFGLEdBQWMsYUFBdEIsQ0FEVCxDQUFBOztBQUFBLEVBRUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxFQUFBLEdBQUUsVUFBRixHQUFjLFdBQXRCLENBRlgsQ0FBQTs7QUFBQSxFQUlNO0FBR0osdUNBQUEsQ0FBQTs7QUFBQSxJQUFBLGdCQUFDLENBQUEsTUFBRCxHQUFTLGNBQVQsQ0FBQTs7QUFBQSwrQkFJQSxHQUFBLEdBQUssbUJBSkwsQ0FBQTs7QUFBQSwrQkFNQSxjQUFBLEdBQWdCLElBTmhCLENBQUE7O0FBQUEsK0JBUUEsVUFBQSxHQUFZLFlBUlosQ0FBQTs7QUFBQSwrQkFXQSxLQUFBLEdBQ0Usc0ZBWkYsQ0FBQTs7QUFjYSxJQUFBLDBCQUFDLE1BQUQsR0FBQTtBQUNYLE1BQUEsa0RBQU0sTUFBTixDQUFBLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQiw0Q0FBcEIsRUFBa0UsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDaEUsS0FBQyxDQUFBLGNBQUQsR0FBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDRDQUFoQixFQUQ4QztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxFLENBRkEsQ0FEVztJQUFBLENBZGI7O0FBQUEsK0JBb0JBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVosQ0FBc0IsNENBQXRCLEVBRE87SUFBQSxDQXBCVCxDQUFBOzs0QkFBQTs7S0FINkIsT0FKL0IsQ0FBQTs7QUFBQSxFQThCQSxNQUFNLENBQUMsT0FBUCxHQUFpQixnQkE5QmpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/gmason/.atom/packages/linter-shellcheck/lib/linter-shellcheck.coffee