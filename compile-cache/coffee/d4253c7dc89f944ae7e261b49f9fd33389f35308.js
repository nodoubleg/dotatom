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
      this.configSubscription = atom.config.observe('linter-shellcheck.shellcheckExecutablePath', (function(_this) {
        return function() {
          return _this.executablePath = atom.config.get('linter-shellcheck.shellcheckExecutablePath');
        };
      })(this));
    }

    LinterShellcheck.prototype.destroy = function() {
      LinterShellcheck.__super__.destroy.apply(this, arguments);
      return this.configSubscription.dispose();
    };

    return LinterShellcheck;

  })(Linter);

  module.exports = LinterShellcheck;

}).call(this);
