(function() {
  var CompositeDisposable;

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = {
    config: {
      shellcheckExecutablePath: {
        type: 'string',
        title: 'Shellcheck Executable Path',
        "default": 'shellcheck'
      },
      enableNotice: {
        type: 'boolean',
        title: 'Enable Notice Messages',
        "default": false
      }
    },
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.config.observe('linter-shellcheck.shellcheckExecutablePath', (function(_this) {
        return function(executablePath) {
          return _this.executablePath = executablePath;
        };
      })(this)));
      return this.subscriptions.add(atom.config.observe('linter-shellcheck.enableNotice', (function(_this) {
        return function(enableNotice) {
          return _this.enableNotice = enableNotice;
        };
      })(this)));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    provideLinter: function() {
      var helpers, provider;
      helpers = require('atom-linter');
      return provider = {
        grammarScopes: ['source.shell'],
        scope: 'file',
        lintOnFly: true,
        lint: (function(_this) {
          return function(textEditor) {
            var filePath, parameters, showAll, text;
            filePath = textEditor.getPath();
            text = textEditor.getText();
            showAll = _this.enableNotice;
            parameters = ['-f', 'gcc', '-'];
            return helpers.exec(_this.executablePath, parameters, {
              stdin: text
            }).then(function(output) {
              var colEnd, colStart, lineEnd, lineStart, match, messages, regex;
              regex = /.+?:(\d+):(\d+):\s(\w+?):\s(.+)/g;
              messages = [];
              while ((match = regex.exec(output)) !== null) {
                if (showAll || match[3] === "warning" || match[3] === "error") {
                  lineStart = match[1] - 1;
                  colStart = match[2] - 1;
                  lineEnd = match[1] - 1;
                  colEnd = textEditor.getBuffer().lineLengthForRow(lineStart);
                  messages.push({
                    type: match[3],
                    filePath: filePath,
                    range: [[lineStart, colStart], [lineEnd, colEnd]],
                    text: match[4]
                  });
                }
              }
              return messages;
            });
          };
        })(this)
      };
    }
  };

}).call(this);
