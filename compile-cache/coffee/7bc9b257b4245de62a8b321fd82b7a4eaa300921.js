(function() {
  module.exports = {
    config: {
      puppetLintExecutablePath: {
        "default": '',
        title: 'Puppet Lint Executable Path',
        type: 'string'
      },
      puppetLintArguments: {
        "default": '--no-autoloader_layout-check',
        title: 'Puppet Lint Arguments',
        type: 'string'
      }
    },
    activate: function() {
      return console.log('activate linter-puppet-lint');
    }
  };

}).call(this);