(function() {
  module.exports = {
    config: {
      erbExecutablePath: {
        "default": '',
        title: 'Erb Executable Path',
        type: 'string'
      }
    },
    activate: function() {
      return console.log('activate linter-erb');
    }
  };

}).call(this);
