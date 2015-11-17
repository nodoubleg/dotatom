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
        "default": true,
        description: 'Show the Welcome package next time a new window is created. This config setting is automatically set to `false` after a new window is created and the Welcome package is shown.'
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2dtYXNvbi8uYXRvbS9wYWNrYWdlcy93ZWxjb21lL2xpYi93ZWxjb21lLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwrR0FBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBQ0EsUUFBQSxHQUFXLElBRFgsQ0FBQTs7QUFBQSxFQUVBLFdBQUEsR0FBYyxJQUZkLENBQUE7O0FBQUEsRUFHQSxTQUFBLEdBQVksSUFIWixDQUFBOztBQUFBLEVBS0EsVUFBQSxHQUFhLHdCQUxiLENBQUE7O0FBQUEsRUFNQSxRQUFBLEdBQVcsc0JBTlgsQ0FBQTs7QUFBQSxFQVFBLGlCQUFBLEdBQW9CLFNBQUMsS0FBRCxHQUFBOztNQUNsQixjQUFlLE9BQUEsQ0FBUSxnQkFBUjtLQUFmO1dBQ0ksSUFBQSxXQUFBLENBQVksS0FBWixFQUZjO0VBQUEsQ0FScEIsQ0FBQTs7QUFBQSxFQVlBLGVBQUEsR0FBa0IsU0FBQyxLQUFELEdBQUE7O01BQ2hCLFlBQWEsT0FBQSxDQUFRLGNBQVI7S0FBYjtXQUNJLElBQUEsU0FBQSxDQUFVLEtBQVYsRUFGWTtFQUFBLENBWmxCLENBQUE7O0FBQUEsRUFnQkEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxhQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtBQUFBLFFBRUEsV0FBQSxFQUFhLGlMQUZiO09BREY7S0FERjtBQUFBLElBTUEsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUFqQixDQUFBO2FBRUEsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsQ0FBQSxTQUFB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

//# sourceURL=/Users/gmason/.atom/packages/welcome/lib/welcome.coffee
