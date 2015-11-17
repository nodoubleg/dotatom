(function() {
  module.exports = {
    config: {
      shellcheckExecutablePath: {
        type: 'string',
        "default": ''
      }
    },
    activate: function() {
      return console.log('activate linter-shellcheck');
    }
  };

}).call(this);
