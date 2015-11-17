"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  config: {
    executablePath: {
      title: "Executable path",
      type: "string",
      description: "Path to puppet-lint executable",
      "default": "puppet-lint"
    },
    skipRigthToLeftRelationship: {
      title: 'Skip the right_to_left_relationship check',
      type: 'boolean',
      "default": false
    },
    skipAutoloaderLayout: {
      title: 'Skip the autoloader_layout check',
      type: 'boolean',
      "default": false
    },
    skipNamesContainingDash: {
      title: 'Skip the names_containing_dash check',
      type: 'boolean',
      "default": false
    },
    skipClassInherithsFromParamClass: {
      title: 'Skip the class_inherits_from_params_class check',
      type: 'boolean',
      "default": false
    },
    skipParameterOrder: {
      title: 'Skip the parameter_order check',
      type: 'boolean',
      "default": false
    },
    skipInheritsAcrossNamespaces: {
      title: 'Skip the inherits_across_namespaces check',
      type: 'boolean',
      "default": false
    },
    skipNestedClassesOrDefines: {
      title: 'Skip the nested_classes_or_defines check',
      type: 'boolean',
      "default": false
    },
    skipVariableScope: {
      title: 'Skip the variable_scope check',
      type: 'boolean',
      "default": false
    },
    skipSlashComments: {
      title: 'Skip the slash_comments check',
      type: 'boolean',
      "default": false
    },
    skipStarComments: {
      title: 'Skip the star_comments check',
      type: 'boolean',
      "default": false
    },
    skipSelectorInsideResource: {
      title: 'Skip the selector_inside_resource check',
      type: 'boolean',
      "default": false
    },
    skipCaseWithoutDefault: {
      title: 'Skip the case_without_default check',
      type: 'boolean',
      "default": false
    },
    skipDocumentation: {
      title: 'Skip the documentation check',
      type: 'boolean',
      "default": false
    },
    skipDoubleQuotedStrings: {
      title: 'Skip the double_quoted_strings check',
      type: 'boolean',
      "default": false
    },
    skipOnlyVariableString: {
      title: 'Skip the only_variable_string check',
      type: 'boolean',
      "default": false
    },
    skipVariablesNotEnclosed: {
      title: 'Skip the variables_not_enclosed check',
      type: 'boolean',
      "default": false
    },
    skipSingleQuoteStringWithVariables: {
      title: 'Skip the single_quote_string_with_variables check',
      type: 'boolean',
      "default": false
    },
    skipQuotedBooleans: {
      title: 'Skip the quoted_booleans check',
      type: 'boolean',
      "default": false
    },
    skipPuppetUrlWhitoutModules: {
      title: 'Skip the puppet_url_without_modules check',
      type: 'boolean',
      "default": false
    },
    skipVariableContainsDash: {
      title: 'Skip the variable_contains_dash check',
      type: 'boolean',
      "default": false
    },
    skipHardTabs: {
      title: 'Skip the hard_tabs check',
      type: 'boolean',
      "default": false
    },
    skipTrailingWhitespace: {
      title: 'Skip the trailing_whitespace check',
      type: 'boolean',
      "default": false
    },
    skip80Chars: {
      title: 'Skip the 80chars check',
      type: 'boolean',
      "default": false
    },
    skip2spSoftTabs: {
      title: 'Skip the 2sp_soft_tabs check',
      type: 'boolean',
      "default": false
    },
    skipArrowAlignment: {
      title: 'Skip the arrow_alignment check',
      type: 'boolean',
      "default": false
    },
    skipUnquotedResourceTitle: {
      title: 'Skip the unquoted_resource_title check',
      type: 'boolean',
      "default": false
    },
    skipEnsureFirstParam: {
      title: 'Skip the ensure_first_param check',
      type: 'boolean',
      "default": false
    },
    skipDuplicateParams: {
      title: 'Skip the duplicate_params check',
      type: 'boolean',
      "default": false
    },
    skipUnquotedFileMode: {
      title: 'Skip the unquoted_file_mode check',
      type: 'boolean',
      "default": false
    },
    skipFileMode: {
      title: 'Skip the file_mode check',
      type: 'boolean',
      "default": false
    },
    skipEnsureNotSymlinkTarget: {
      title: 'Skip the ensure_not_symlink_target check',
      type: 'boolean',
      "default": false
    },
    skipUnquotedNodeName: {
      title: 'Skip the unquoted_node_name check',
      type: 'boolean',
      "default": false
    }
  },

  activate: function activate() {
    require("atom-package-deps").install("linter-puppet-lint");

    // Check if puppet-lint has support for the %{column} placeholder
    var command = atom.config.get("linter-puppet-lint.executablePath");
    var version = require('child_process').spawn(command, ['--help']);
    version.stdout.on('data', function (data) {
      var regexColumn = /%{column}/;
      if (regexColumn.exec(data) === null) {
        atom.config.set("linter-puppet-lint.oldVersion", true);
        atom.notifications.addError("You are using an old version of puppet-lint!!!", {
          detail: "Please upgrade you version of puppet-lint.\n" + "Check the README for further information."
        });
      } else {
        atom.config.set("linter-puppet-lint.oldVersion", false);
      }
    });
  },

  provideLinter: function provideLinter() {
    // With the custom format the puppet-int ouput looks like this:
    // error mongodb::service not in autoload module layout 3 7
    var helpers = require("atom-linter");
    var path = require("path");
    var regexLine = /^(warning|error)\s(.*)\s(\d+)\s(\d+)$/;
    var regexFlag = /^skip.*/;

    return {
      grammarScopes: ["source.puppet"],
      scope: "file",
      lintOnFly: false,
      lint: function lint(activeEditor) {
        if (atom.config.get("linter-puppet-lint.oldVersion") === true) {
          atom.notifications.addError("You are using an old version of puppet-lint!!!", {
            detail: "Please upgrade you version of puppet-lint.\n" + "Check the README for further information."
          });
          return [];
        }

        var command = atom.config.get("linter-puppet-lint.executablePath");
        var file = activeEditor.getPath();
        var cwd = path.dirname(file);
        var args = ['--log-format', '%{kind} %{message} %{line} %{column}'];

        var optionsMap = require('./flags.js');
        var config = atom.config.getAll('linter-puppet-lint');
        var flags = config[0]["value"];

        // If the option match /skip.*/ and is true
        // add the flag to the command options
        for (var flag in flags) {
          if (regexFlag.exec(flag) === null) {
            continue;
          }
          if (flags[flag] === true) {
            args.push(optionsMap[flag]);
          }
        }

        args.push(file);

        return helpers.exec(command, args, { stream: "stdout", cwd: cwd }).then(function (output) {
          var toReturn = [];
          output.split(/\r?\n/).forEach(function (line) {
            var matches = regexLine.exec(line);
            if (matches === null) {
              return;
            }
            errLine = Number.parseInt(matches[3]) - 1;
            errCol = Number.parseInt(matches[4]) - 1;
            toReturn.push({
              range: [[errLine, errCol], [errLine, errCol + 1]],
              type: matches[1],
              text: matches[2],
              filePath: file
            });
          });
          return toReturn;
        });
      }
    };
  }
};
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9nbWFzb24vLmF0b20vcGFja2FnZXMvbGludGVyLXB1cHBldC1saW50L2xpYi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7Ozs7cUJBRUc7QUFDYixRQUFNLEVBQUU7QUFDTixrQkFBYyxFQUFFO0FBQ2QsV0FBSyxFQUFFLGlCQUFpQjtBQUN4QixVQUFJLEVBQUUsUUFBUTtBQUNkLGlCQUFXLEVBQUUsZ0NBQWdDO0FBQzdDLGlCQUFTLGFBQWE7S0FDdkI7QUFDRCwrQkFBMkIsRUFBRTtBQUMzQixXQUFLLEVBQUUsMkNBQTJDO0FBQ2xELFVBQUksRUFBRSxTQUFTO0FBQ2YsaUJBQVMsS0FBSztLQUNmO0FBQ0Qsd0JBQW9CLEVBQUU7QUFDcEIsV0FBSyxFQUFFLGtDQUFrQztBQUN6QyxVQUFJLEVBQUUsU0FBUztBQUNmLGlCQUFTLEtBQUs7S0FDZjtBQUNELDJCQUF1QixFQUFFO0FBQ3ZCLFdBQUssRUFBRSxzQ0FBc0M7QUFDN0MsVUFBSSxFQUFFLFNBQVM7QUFDZixpQkFBUyxLQUFLO0tBQ2Y7QUFDRCxvQ0FBZ0MsRUFBRTtBQUNoQyxXQUFLLEVBQUUsaURBQWlEO0FBQ3hELFVBQUksRUFBRSxTQUFTO0FBQ2YsaUJBQVMsS0FBSztLQUNmO0FBQ0Qsc0JBQWtCLEVBQUU7QUFDbEIsV0FBSyxFQUFFLGdDQUFnQztBQUN2QyxVQUFJLEVBQUUsU0FBUztBQUNmLGlCQUFTLEtBQUs7S0FDZjtBQUNELGdDQUE0QixFQUFFO0FBQzVCLFdBQUssRUFBRSwyQ0FBMkM7QUFDbEQsVUFBSSxFQUFFLFNBQVM7QUFDZixpQkFBUyxLQUFLO0tBQ2Y7QUFDRCw4QkFBMEIsRUFBRTtBQUMxQixXQUFLLEVBQUUsMENBQTBDO0FBQ2pELFVBQUksRUFBRSxTQUFTO0FBQ2YsaUJBQVMsS0FBSztLQUNmO0FBQ0QscUJBQWlCLEVBQUU7QUFDakIsV0FBSyxFQUFFLCtCQUErQjtBQUN0QyxVQUFJLEVBQUUsU0FBUztBQUNmLGlCQUFT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O1dBQ0osQ0FBQyxDQUFDO0FBQ0gsaUJBQU8sUUFBUSxDQUFDO1NBQ2pCLENBQUMsQ0FBQztPQUNKO0tBQ0YsQ0FBQztHQUNIO0NBQ0YiLCJmaWxlIjoiL1VzZXJzL2dtYXNvbi8uYXRvbS9wYWNrYWdlcy9saW50ZXItcHVwcGV0LWxpbnQvbGliL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIGV4ZWN1dGFibGVQYXRoOiB7XG4gICAgICB0aXRsZTogXCJFeGVjdXRhYmxlIHBhdGhcIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHB1cHBldC1saW50IGV4ZWN1dGFibGVcIixcbiAgICAgIGRlZmF1bHQ6IFwicHVwcGV0LWxpbnRcIlxuICAgIH0sXG4gICAgc2tpcFJpZ3RoVG9MZWZ0UmVsYXRpb25zaGlwOiB7XG4gICAgICB0aXRsZTogJ1NraXAgdGhlIHJpZ2h0X3RvX2xlZnRfcmVsYXRpb25zaGlwIGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwQXV0b2xvYWRlckxheW91dDoge1xuICAgICAgdGl0bGU6ICdTa2lwIHRoZSBhdXRvbG9hZGVyX2xheW91dCBjaGVjaycsXG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgc2tpcE5hbWVzQ29udGFpbmluZ0Rhc2g6IHtcbiAgICAgIHRpdGxlOiAnU2tpcCB0aGUgbmFtZXNfY29udGFpbmluZ19kYXNoIGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwQ2xhc3NJbmhlcml0aHNGcm9tUGFyYW1DbGFzczoge1xuICAgICAgdGl0bGU6ICdTa2lwIHRoZSBjbGFzc19pbmhlcml0c19mcm9tX3BhcmFtc19jbGFzcyBjaGVjaycsXG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgc2tpcFBhcmFtZXRlck9yZGVyOiB7XG4gICAgICB0aXRsZTogJ1NraXAgdGhlIHBhcmFtZXRlcl9vcmRlciBjaGVjaycsXG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgc2tpcEluaGVyaXRzQWNyb3NzTmFtZXNwYWNlczoge1xuICAgICAgdGl0bGU6ICdTa2lwIHRoZSBpbmhlcml0c19hY3Jvc3NfbmFtZXNwYWNlcyBjaGVjaycsXG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgc2tpcE5lc3RlZENsYXNzZXNPckRlZmluZXM6IHtcbiAgICAgIHRpdGxlOiAnU2tpcCB0aGUgbmVzdGVkX2NsYXNzZXNfb3JfZGVmaW5lcyBjaGVjaycsXG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgc2tpcFZhcmlhYmxlU2NvcGU6IHtcbiAgICAgIHRpdGxlOiAnU2tpcCB0aGUgdmFyaWFibGVfc2NvcGUgY2hlY2snLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIHNraXBTbGFzaENvbW1lbnRzOiB7XG4gICAgICB0aXRsZTogJ1NraXAgdGhlIHNsYXNoX2NvbW1lbnRzIGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwU3RhckNvbW1lbnRzOiB7XG4gICAgICB0aXRsZTogJ1NraXAgdGhlIHN0YXJfY29tbWVudHMgY2hlY2snLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIHNraXBTZWxlY3Rvckluc2lkZVJlc291cmNlOiB7XG4gICAgICB0aXRsZTogJ1NraXAgdGhlIHNlbGVjdG9yX2luc2lkZV9yZXNvdXJjZSBjaGVjaycsXG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgc2tpcENhc2VXaXRob3V0RGVmYXVsdDoge1xuICAgICAgdGl0bGU6ICdTa2lwIHRoZSBjYXNlX3dpdGhvdXRfZGVmYXVsdCBjaGVjaycsXG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgc2tpcERvY3VtZW50YXRpb246IHtcbiAgICAgIHRpdGxlOiAnU2tpcCB0aGUgZG9jdW1lbnRhdGlvbiBjaGVjaycsXG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgc2tpcERvdWJsZVF1b3RlZFN0cmluZ3M6IHtcbiAgICAgIHRpdGxlOiAnU2tpcCB0aGUgZG91YmxlX3F1b3RlZF9zdHJpbmdzIGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwT25seVZhcmlhYmxlU3RyaW5nOiB7XG4gICAgICB0aXRsZTogJ1NraXAgdGhlIG9ubHlfdmFyaWFibGVfc3RyaW5nIGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwVmFyaWFibGVzTm90RW5jbG9zZWQ6IHtcbiAgICAgIHRpdGxlOiAnU2tpcCB0aGUgdmFyaWFibGVzX25vdF9lbmNsb3NlZCBjaGVjaycsXG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgc2tpcFNpbmdsZVF1b3RlU3RyaW5nV2l0aFZhcmlhYmxlczoge1xuICAgICAgdGl0bGU6ICdTa2lwIHRoZSBzaW5nbGVfcXVvdGVfc3RyaW5nX3dpdGhfdmFyaWFibGVzIGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwUXVvdGVkQm9vbGVhbnM6IHtcbiAgICAgIHRpdGxlOiAnU2tpcCB0aGUgcXVvdGVkX2Jvb2xlYW5zIGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwUHVwcGV0VXJsV2hpdG91dE1vZHVsZXM6IHtcbiAgICAgIHRpdGxlOiAnU2tpcCB0aGUgcHVwcGV0X3VybF93aXRob3V0X21vZHVsZXMgY2hlY2snLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIHNraXBWYXJpYWJsZUNvbnRhaW5zRGFzaDoge1xuICAgICAgdGl0bGU6ICdTa2lwIHRoZSB2YXJpYWJsZV9jb250YWluc19kYXNoIGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwSGFyZFRhYnM6IHtcbiAgICAgIHRpdGxlOiAnU2tpcCB0aGUgaGFyZF90YWJzIGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwVHJhaWxpbmdXaGl0ZXNwYWNlOiB7XG4gICAgICB0aXRsZTogJ1NraXAgdGhlIHRyYWlsaW5nX3doaXRlc3BhY2UgY2hlY2snLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIHNraXA4MENoYXJzOiB7XG4gICAgICB0aXRsZTogJ1NraXAgdGhlIDgwY2hhcnMgY2hlY2snLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIHNraXAyc3BTb2Z0VGFiczoge1xuICAgICAgdGl0bGU6ICdTa2lwIHRoZSAyc3Bfc29mdF90YWJzIGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwQXJyb3dBbGlnbm1lbnQ6IHtcbiAgICAgIHRpdGxlOiAnU2tpcCB0aGUgYXJyb3dfYWxpZ25tZW50IGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwVW5xdW90ZWRSZXNvdXJjZVRpdGxlOiB7XG4gICAgICB0aXRsZTogJ1NraXAgdGhlIHVucXVvdGVkX3Jlc291cmNlX3RpdGxlIGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwRW5zdXJlRmlyc3RQYXJhbToge1xuICAgICAgdGl0bGU6ICdTa2lwIHRoZSBlbnN1cmVfZmlyc3RfcGFyYW0gY2hlY2snLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIHNraXBEdXBsaWNhdGVQYXJhbXM6IHtcbiAgICAgIHRpdGxlOiAnU2tpcCB0aGUgZHVwbGljYXRlX3BhcmFtcyBjaGVjaycsXG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgc2tpcFVucXVvdGVkRmlsZU1vZGU6IHtcbiAgICAgIHRpdGxlOiAnU2tpcCB0aGUgdW5xdW90ZWRfZmlsZV9tb2RlIGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwRmlsZU1vZGU6IHtcbiAgICAgIHRpdGxlOiAnU2tpcCB0aGUgZmlsZV9tb2RlIGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwRW5zdXJlTm90U3ltbGlua1RhcmdldDoge1xuICAgICAgdGl0bGU6ICdTa2lwIHRoZSBlbnN1cmVfbm90X3N5bWxpbmtfdGFyZ2V0IGNoZWNrJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBza2lwVW5xdW90ZWROb2RlTmFtZToge1xuICAgICAgdGl0bGU6ICdTa2lwIHRoZSB1bnF1b3RlZF9ub2RlX25hbWUgY2hlY2snLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICB9LFxuXG4gIGFjdGl2YXRlOiAoKSA9PiB7XG4gICAgcmVxdWlyZShcImF0b20tcGFja2FnZS1kZXBzXCIpLmluc3RhbGwoXCJsaW50ZXItcHVwcGV0LWxpbnRcIik7XG5cbiAgICAvLyBDaGVjayBpZiBwdXBwZXQtbGludCBoYXMgc3VwcG9ydCBmb3IgdGhlICV7Y29sdW1ufSBwbGFjZWhvbGRlclxuICAgIHZhciBjb21tYW5kID0gYXRvbS5jb25maWcuZ2V0KFwibGludGVyLXB1cHBldC1saW50LmV4ZWN1dGFibGVQYXRoXCIpO1xuICAgIHZhciB2ZXJzaW9uID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLnNwYXduKGNvbW1hbmQsWyctLWhlbHAnXSk7XG4gICAgdmVyc2lvbi5zdGRvdXQub24oJ2RhdGEnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgcmVnZXhDb2x1bW4gPSAvJXtjb2x1bW59LztcbiAgICAgICAgaWYgKHJlZ2V4Q29sdW1uLmV4ZWMoZGF0YSkgPT09IG51bGwpIHtcbiAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQoXCJsaW50ZXItcHVwcGV0LWxpbnQub2xkVmVyc2lvblwiLCB0cnVlKTtcbiAgICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoXG4gICAgICAgICAgICBcIllvdSBhcmUgdXNpbmcgYW4gb2xkIHZlcnNpb24gb2YgcHVwcGV0LWxpbnQhISFcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZGV0YWlsOiBcIlBsZWFzZSB1cGdyYWRlIHlvdSB2ZXJzaW9uIG9mIHB1cHBldC1saW50LlxcblwiXG4gICAgICAgICAgICAgICsgXCJDaGVjayB0aGUgUkVBRE1FIGZvciBmdXJ0aGVyIGluZm9ybWF0aW9uLlwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQoXCJsaW50ZXItcHVwcGV0LWxpbnQub2xkVmVyc2lvblwiLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBwcm92aWRlTGludGVyOiAoKSA9PiB7XG4gICAgLy8gV2l0aCB0aGUgY3VzdG9tIGZvcm1hdCB0aGUgcHVwcGV0LWludCBvdXB1dCBsb29rcyBsaWtlIHRoaXM6XG4gICAgLy8gZXJyb3IgbW9uZ29kYjo6c2VydmljZSBub3QgaW4gYXV0b2xvYWQgbW9kdWxlIGxheW91dCAzIDdcbiAgICBjb25zdCBoZWxwZXJzICAgPSByZXF1aXJlKFwiYXRvbS1saW50ZXJcIik7XG4gICAgY29uc3QgcGF0aCAgICAgID0gcmVxdWlyZShcInBhdGhcIik7XG4gICAgY29uc3QgcmVnZXhMaW5lID0gL14od2FybmluZ3xlcnJvcilcXHMoLiopXFxzKFxcZCspXFxzKFxcZCspJC87XG4gICAgY29uc3QgcmVnZXhGbGFnID0gL15za2lwLiovO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGdyYW1tYXJTY29wZXM6IFtcInNvdXJjZS5wdXBwZXRcIl0sXG4gICAgICBzY29wZTogXCJmaWxlXCIsXG4gICAgICBsaW50T25GbHk6IGZhbHNlLFxuICAgICAgbGludDogKGFjdGl2ZUVkaXRvcikgPT4ge1xuICAgICAgICBpZiAoYXRvbS5jb25maWcuZ2V0KFwibGludGVyLXB1cHBldC1saW50Lm9sZFZlcnNpb25cIikgPT09IHRydWUpIHtcbiAgICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoXG4gICAgICAgICAgICBcIllvdSBhcmUgdXNpbmcgYW4gb2xkIHZlcnNpb24gb2YgcHVwcGV0LWxpbnQhISFcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZGV0YWlsOiBcIlBsZWFzZSB1cGdyYWRlIHlvdSB2ZXJzaW9uIG9mIHB1cHBldC1saW50LlxcblwiXG4gICAgICAgICAgICAgICsgXCJDaGVjayB0aGUgUkVBRE1FIGZvciBmdXJ0aGVyIGluZm9ybWF0aW9uLlwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm5bXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSBhdG9tLmNvbmZpZy5nZXQoXCJsaW50ZXItcHVwcGV0LWxpbnQuZXhlY3V0YWJsZVBhdGhcIik7XG4gICAgICAgIGNvbnN0IGZpbGUgICAgPSBhY3RpdmVFZGl0b3IuZ2V0UGF0aCgpO1xuICAgICAgICBjb25zdCBjd2QgICAgID0gcGF0aC5kaXJuYW1lKGZpbGUpO1xuICAgICAgICBjb25zdCBhcmdzICAgID0gWyctLWxvZy1mb3JtYXQnLCcle2tpbmR9ICV7bWVzc2FnZX0gJXtsaW5lfSAle2NvbHVtbn0nXVxuXG4gICAgICAgIHZhciBvcHRpb25zTWFwID0gcmVxdWlyZSgnLi9mbGFncy5qcycpO1xuICAgICAgICB2YXIgY29uZmlnICAgICA9IGF0b20uY29uZmlnLmdldEFsbCgnbGludGVyLXB1cHBldC1saW50JylcbiAgICAgICAgdmFyIGZsYWdzICAgICAgPSBjb25maWdbMF1bXCJ2YWx1ZVwiXVxuXG4gICAgICAgIC8vIElmIHRoZSBvcHRpb24gbWF0Y2ggL3NraXAuKi8gYW5kIGlzIHRydWVcbiAgICAgICAgLy8gYWRkIHRoZSBmbGFnIHRvIHRoZSBjb21tYW5kIG9wdGlvbnNcbiAgICAgICAgZm9yKHZhciBmbGFnIGluIGZsYWdzKSB7XG4gICAgICAgICAgaWYgKHJlZ2V4RmxhZy5leGVjKGZsYWcpID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZmxhZ3NbZmxhZ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaChvcHRpb25zTWFwW2ZsYWddKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFyZ3MucHVzaChmaWxlKVxuXG4gICAgICAgIHJldHVybiBoZWxwZXJzLmV4ZWMoY29tbWFuZCwgYXJncywge3N0cmVhbTogXCJzdGRvdXRcIiwgY3dkOiBjd2R9KS50aGVuKG91dHB1dCA9PiB7XG4gICAgICAgICAgY29uc3QgdG9SZXR1cm4gPSBbXTtcbiAgICAgICAgICBvdXRwdXQuc3BsaXQoL1xccj9cXG4vKS5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gcmVnZXhMaW5lLmV4ZWMobGluZSk7XG4gICAgICAgICAgICBpZiAobWF0Y2hlcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJMaW5lID0gTnVtYmVyLnBhcnNlSW50KG1hdGNoZXNbM10pIC0gMTtcbiAgICAgICAgICAgIGVyckNvbCAgPSBOdW1iZXIucGFyc2VJbnQobWF0Y2hlc1s0XSkgLSAxO1xuICAgICAgICAgICAgdG9SZXR1cm4ucHVzaCh7XG4gICAgICAgICAgICAgIHJhbmdlOiBbW2VyckxpbmUsIGVyckNvbF0sIFtlcnJMaW5lLCBlcnJDb2wgKyAxXV0sXG4gICAgICAgICAgICAgIHR5cGU6IG1hdGNoZXNbMV0sXG4gICAgICAgICAgICAgIHRleHQ6IG1hdGNoZXNbMl0sXG4gICAgICAgICAgICAgIGZpbGVQYXRoOiBmaWxlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn07XG4iXX0=
//# sourceURL=/Users/gmason/.atom/packages/linter-puppet-lint/lib/main.js
