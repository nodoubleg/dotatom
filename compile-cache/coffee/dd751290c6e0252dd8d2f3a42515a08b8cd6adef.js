(function() {
  var BufferedProcess, Linter, LinterErb, Point, Range, linterPath, log, warn, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  linterPath = atom.packages.getLoadedPackage("linter").path;

  Linter = require("" + linterPath + "/lib/linter");

  _ref = require('atom'), Range = _ref.Range, Point = _ref.Point, BufferedProcess = _ref.BufferedProcess;

  _ref1 = require("" + linterPath + "/lib/utils"), log = _ref1.log, warn = _ref1.warn;

  LinterErb = (function(_super) {
    __extends(LinterErb, _super);

    LinterErb.syntax = ['text.html.erb'];

    LinterErb.prototype.rubyCmd = 'ruby -c -';

    LinterErb.prototype.erbCmd = 'erb -x -T -';

    LinterErb.prototype.executablePath = null;

    LinterErb.prototype.linterName = 'erb';

    LinterErb.prototype.regex = '.+:(?<line>\\d+):(?<error>)(?<message>.+)';

    function LinterErb(editor) {
      LinterErb.__super__.constructor.call(this, editor);
      atom.config.observe('linter-erb.erbExecutablePath', (function(_this) {
        return function() {
          return _this.executablePath = atom.config.get('linter-erb.erbExecutablePath');
        };
      })(this));
    }

    LinterErb.prototype.destroy = function() {
      return atom.config.unobserve('linter-erb.erbExecutablePath');
    };

    LinterErb.prototype.lintFile = function(filePath, callback) {
      var data, erbArgs, erbCommand, erbExit, erbOptions, erbProcess, erbStdout, rubyArgs, rubyCommand, rubyExit, rubyOptions, rubyProcess, rubyStderr, _ref2, _ref3;
      this.cmd = this.rubyCmd;
      _ref2 = this.getCmdAndArgs(null), rubyCommand = _ref2.command, rubyArgs = _ref2.args;
      this.cmd = this.erbCmd;
      _ref3 = this.getCmdAndArgs(filePath), erbCommand = _ref3.command, erbArgs = _ref3.args;
      rubyOptions = {
        stdio: ['pipe', null, null]
      };
      erbOptions = {
        cwd: this.cwd
      };
      data = [];
      rubyStderr = function(output) {
        warn('stderr', output);
        return data += output;
      };
      rubyExit = (function(_this) {
        return function() {
          return _this.processMessage(data, callback);
        };
      })(this);
      erbStdout = function(output) {
        log('stdout', output);
        return rubyProcess.process.stdin.write(output);
      };
      erbExit = (function(_this) {
        return function() {
          return rubyProcess.process.stdin.end();
        };
      })(this);
      rubyProcess = new BufferedProcess({
        command: rubyCommand,
        args: rubyArgs,
        options: rubyOptions,
        stderr: rubyStderr,
        exit: rubyExit
      });
      erbProcess = new BufferedProcess({
        command: erbCommand,
        args: erbArgs,
        options: erbOptions,
        stdout: erbStdout,
        exit: erbExit
      });
      return setTimeout(function() {
        rubyProcess.kill();
        return erbProcess.kill();
      }, 5000);
    };

    LinterErb.prototype.createMessage = function(match) {
      if (match.line > this.editor.getLineCount()) {
        match.line = this.editor.getLineCount();
      }
      return LinterErb.__super__.createMessage.call(this, match);
    };

    return LinterErb;

  })(Linter);

  module.exports = LinterErb;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9GQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxVQUFBLEdBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZCxDQUErQixRQUEvQixDQUF3QyxDQUFDLElBQXRELENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVMsT0FBQSxDQUFRLEVBQUEsR0FBRSxVQUFGLEdBQWMsYUFBdEIsQ0FEVCxDQUFBOztBQUFBLEVBRUEsT0FBa0MsT0FBQSxDQUFRLE1BQVIsQ0FBbEMsRUFBQyxhQUFBLEtBQUQsRUFBUSxhQUFBLEtBQVIsRUFBZSx1QkFBQSxlQUZmLENBQUE7O0FBQUEsRUFHQSxRQUFjLE9BQUEsQ0FBUSxFQUFBLEdBQUUsVUFBRixHQUFjLFlBQXRCLENBQWQsRUFBQyxZQUFBLEdBQUQsRUFBTSxhQUFBLElBSE4sQ0FBQTs7QUFBQSxFQUtNO0FBR0osZ0NBQUEsQ0FBQTs7QUFBQSxJQUFBLFNBQUMsQ0FBQSxNQUFELEdBQVMsQ0FBQyxlQUFELENBQVQsQ0FBQTs7QUFBQSx3QkFJQSxPQUFBLEdBQVMsV0FKVCxDQUFBOztBQUFBLHdCQUtBLE1BQUEsR0FBUSxhQUxSLENBQUE7O0FBQUEsd0JBT0EsY0FBQSxHQUFnQixJQVBoQixDQUFBOztBQUFBLHdCQVNBLFVBQUEsR0FBWSxLQVRaLENBQUE7O0FBQUEsd0JBWUEsS0FBQSxHQUFPLDJDQVpQLENBQUE7O0FBY2EsSUFBQSxtQkFBQyxNQUFELEdBQUE7QUFDWCxNQUFBLDJDQUFNLE1BQU4sQ0FBQSxDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FBb0IsOEJBQXBCLEVBQW9ELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ2xELEtBQUMsQ0FBQSxjQUFELEdBQWtCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiw4QkFBaEIsRUFEZ0M7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFwRCxDQUZBLENBRFc7SUFBQSxDQWRiOztBQUFBLHdCQW9CQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFaLENBQXNCLDhCQUF0QixFQURPO0lBQUEsQ0FwQlQsQ0FBQTs7QUFBQSx3QkF1QkEsUUFBQSxHQUFVLFNBQUMsUUFBRCxFQUFXLFFBQVgsR0FBQTtBQUVSLFVBQUEsMEpBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxHQUFELEdBQU8sSUFBQyxDQUFBLE9BQVIsQ0FBQTtBQUFBLE1BQ0EsUUFBeUMsSUFBQyxDQUFBLGFBQUQsQ0FBZSxJQUFmLENBQXpDLEVBQVUsb0JBQVQsT0FBRCxFQUE2QixpQkFBTixJQUR2QixDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsR0FBRCxHQUFPLElBQUMsQ0FBQSxNQUZSLENBQUE7QUFBQSxNQUdBLFFBQXVDLElBQUMsQ0FBQSxhQUFELENBQWUsUUFBZixDQUF2QyxFQUFVLG1CQUFULE9BQUQsRUFBNEIsZ0JBQU4sSUFIdEIsQ0FBQTtBQUFBLE1BTUEsV0FBQSxHQUFjO0FBQUEsUUFBQyxLQUFBLEVBQU8sQ0FBQyxNQUFELEVBQVMsSUFBVCxFQUFlLElBQWYsQ0FBUjtPQU5kLENBQUE7QUFBQSxNQU9BLFVBQUEsR0FBYTtBQUFBLFFBQUMsR0FBQSxFQUFLLElBQUMsQ0FBQSxHQUFQO09BUGIsQ0FBQTtBQUFBLE1BU0EsSUFBQSxHQUFPLEVBVFAsQ0FBQTtBQUFBLE1BV0EsVUFBQSxHQUFhLFNBQUMsTUFBRCxHQUFBO0FBQ1gsUUFBQSxJQUFBLENBQUssUUFBTCxFQUFlLE1BQWYsQ0FBQSxDQUFBO2VBQ0EsSUFBQSxJQUFRLE9BRkc7TUFBQSxDQVhiLENBQUE7QUFBQSxNQWVBLFFBQUEsR0FBVyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNULEtBQUMsQ0FBQSxjQUFELENBQWdCLElBQWhCLEVBQXNCLFFBQXRCLEVBRFM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQWZYLENBQUE7QUFBQSxNQWtCQSxTQUFBLEdBQVksU0FBQyxNQUFELEdBQUE7QUFDVixRQUFBLEdBQUEsQ0FBSSxRQUFKLEVBQWMsTUFBZCxDQUFBLENBQUE7ZUFDQSxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUExQixDQUFnQyxNQUFoQyxFQUZVO01BQUEsQ0FsQlosQ0FBQTtBQUFBLE1Bc0JBLE9BQUEsR0FBVSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNSLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQTFCLENBQUEsRUFEUTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBdEJWLENBQUE7QUFBQSxNQXlCQSxXQUFBLEdBQWtCLElBQUEsZUFBQSxDQUFnQjtBQUFBLFFBQUMsT0FBQSxFQUFTLFdBQVY7QUFBQSxRQUF1QixJQUFBLEVBQU0sUUFBN0I7QUFBQSxRQUNDLE9BQUEsRUFBUyxXQURWO0FBQUEsUUFDdUIsTUFBQSxFQUFRLFVBRC9CO0FBQUEsUUFFQyxJQUFBLEVBQU0sUUFGUDtPQUFoQixDQXpCbEIsQ0FBQTtBQUFBLE1BNkJBLFVBQUEsR0FBaUIsSUFBQSxlQUFBLENBQWdCO0FBQUEsUUFBQyxPQUFBLEVBQVMsVUFBVjtBQUFBLFFBQXNCLElBQUEsRUFBTSxPQUE1QjtBQUFBLFFBQ0MsT0FBQSxFQUFTLFVBRFY7QUFBQSxRQUNzQixNQUFBLEVBQVEsU0FEOUI7QUFBQSxRQUVDLElBQUEsRUFBTSxPQUZQO09BQWhCLENBN0JqQixDQUFBO2FBa0NBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxRQUFBLFdBQVcsQ0FBQyxJQUFaLENBQUEsQ0FBQSxDQUFBO2VBQ0EsVUFBVSxDQUFDLElBQVgsQ0FBQSxFQUZTO01BQUEsQ0FBWCxFQUdFLElBSEYsRUFwQ1E7SUFBQSxDQXZCVixDQUFBOztBQUFBLHdCQWdFQSxhQUFBLEdBQWUsU0FBQyxLQUFELEdBQUE7QUFFYixNQUFBLElBQUcsS0FBSyxDQUFDLElBQU4sR0FBYSxJQUFDLENBQUEsTUFBTSxDQUFDLFlBQVIsQ0FBQSxDQUFoQjtBQUNFLFFBQUEsS0FBSyxDQUFDLElBQU4sR0FBYSxJQUFDLENBQUEsTUFBTSxDQUFDLFlBQVIsQ0FBQSxDQUFiLENBREY7T0FBQTthQUVBLDZDQUFNLEtBQU4sRUFKYTtJQUFBLENBaEVmLENBQUE7O3FCQUFBOztLQUhzQixPQUx4QixDQUFBOztBQUFBLEVBOEVBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBOUVqQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/gmason/.atom/packages/linter-erb/lib/linter-erb.coffee