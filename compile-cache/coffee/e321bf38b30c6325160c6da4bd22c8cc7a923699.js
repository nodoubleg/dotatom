(function() {
  var CompositeDisposable, GuideUri, GuideView, Reporter, WelcomeUri, WelcomeView, createGuideView, createWelcomeView;

  CompositeDisposable = require('atom').CompositeDisposable;

  Reporter = null;

  WelcomeView = null;

  GuideView = null;

  WelcomeUri = 'atom://welcome/welcome';

  GuideUri = 'atom://welcome/guide';

  createWelcomeView = function(state) {
    if (WelcomeView == null) {
      WelcomeView = require('./welcome-view');
    }
    return new WelcomeView(state);
  };

  createGuideView = function(state) {
    if (GuideView == null) {
      GuideView = require('./guide-view');
    }
    return new GuideView(state);
  };

  module.exports = {
    config: {
      showOnStartup: {
        type: 'boolean',
        "default": true
      }
    },
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      return process.nextTick((function(_this) {
        return function() {
          _this.subscriptions.add(atom.deserializers.add({
            name: 'WelcomeView',
            deserialize: function(state) {
              return createWelcomeView(state);
            }
          }));
          _this.subscriptions.add(atom.deserializers.add({
            name: 'GuideView',
            deserialize: function(state) {
              return createGuideView(state);
            }
          }));
          _this.subscriptions.add(atom.workspace.addOpener(function(filePath) {
            if (filePath === WelcomeUri) {
              return createWelcomeView({
                uri: WelcomeUri
              });
            }
          }));
          _this.subscriptions.add(atom.workspace.addOpener(function(filePath) {
            if (filePath === GuideUri) {
              return createGuideView({
                uri: GuideUri
              });
            }
          }));
          _this.subscriptions.add(atom.commands.add('atom-workspace', 'welcome:show', function() {
            return _this.show();
          }));
          if (atom.config.get('welcome.showOnStartup')) {
            _this.show();
            if (Reporter == null) {
              Reporter = require('./reporter');
            }
            Reporter.sendEvent('show-on-initial-load');
            return atom.config.set('welcome.showOnStartup', false);
          }
        };
      })(this));
    },
    show: function() {
      atom.workspace.open(WelcomeUri);
      return atom.workspace.open(GuideUri, {
        split: 'right'
      });
    },
    consumeReporter: function(reporter) {
      if (Reporter == null) {
        Reporter = require('./reporter');
      }
      return Reporter.setReporter(reporter);
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2dtYXNvbi8uYXRvbS9wYWNrYWdlcy93ZWxjb21lL2xpYi93ZWxjb21lLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwrR0FBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBQ0EsUUFBQSxHQUFXLElBRFgsQ0FBQTs7QUFBQSxFQUVBLFdBQUEsR0FBYyxJQUZkLENBQUE7O0FBQUEsRUFHQSxTQUFBLEdBQVksSUFIWixDQUFBOztBQUFBLEVBS0EsVUFBQSxHQUFhLHdCQUxiLENBQUE7O0FBQUEsRUFNQSxRQUFBLEdBQVcsc0JBTlgsQ0FBQTs7QUFBQSxFQVFBLGlCQUFBLEdBQW9CLFNBQUMsS0FBRCxHQUFBOztNQUNsQixjQUFlLE9BQUEsQ0FBUSxnQkFBUjtLQUFmO1dBQ0ksSUFBQSxXQUFBLENBQVksS0FBWixFQUZjO0VBQUEsQ0FScEIsQ0FBQTs7QUFBQSxFQVlBLGVBQUEsR0FBa0IsU0FBQyxLQUFELEdBQUE7O01BQ2hCLFlBQWEsT0FBQSxDQUFRLGNBQVI7S0FBYjtXQUNJLElBQUEsU0FBQSxDQUFVLEtBQVYsRUFGWTtFQUFBLENBWmxCLENBQUE7O0FBQUEsRUFnQkEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxhQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtPQURGO0tBREY7QUFBQSxJQUtBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFBakIsQ0FBQTthQUVBLE9BQU8sQ0FBQyxRQUFSLENBQWlCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7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

//# sourceURL=/Users/gmason/.atom/packages/welcome/lib/welcome.coffee
