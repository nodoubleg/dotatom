(function() {
  var Input, ViewModel, VimCommandModeInputView;

  VimCommandModeInputView = require('./vim-command-mode-input-view');

  ViewModel = (function() {
    function ViewModel(operation, opts) {
      var _ref;
      this.operation = operation;
      if (opts == null) {
        opts = {};
      }
      _ref = this.operation, this.editor = _ref.editor, this.vimState = _ref.vimState;
      this.view = new VimCommandModeInputView(this, opts);
      this.editor.commandModeInputView = this.view;
      this.vimState.onDidFailToCompose((function(_this) {
        return function() {
          return _this.view.remove();
        };
      })(this));
    }

    ViewModel.prototype.confirm = function(view) {
      return this.vimState.pushOperations(new Input(this.view.value));
    };

    ViewModel.prototype.cancel = function(view) {
      if (this.vimState.isOperatorPending()) {
        return this.vimState.pushOperations(new Input(''));
      }
    };

    return ViewModel;

  })();

  Input = (function() {
    function Input(characters) {
      this.characters = characters;
    }

    Input.prototype.isComplete = function() {
      return true;
    };

    Input.prototype.isRecordable = function() {
      return true;
    };

    return Input;

  })();

  module.exports = {
    ViewModel: ViewModel,
    Input: Input
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlDQUFBOztBQUFBLEVBQUEsdUJBQUEsR0FBMEIsT0FBQSxDQUFRLCtCQUFSLENBQTFCLENBQUE7O0FBQUEsRUFZTTtBQWFTLElBQUEsbUJBQUUsU0FBRixFQUFhLElBQWIsR0FBQTtBQUNYLFVBQUEsSUFBQTtBQUFBLE1BRFksSUFBQyxDQUFBLFlBQUEsU0FDYixDQUFBOztRQUR3QixPQUFLO09BQzdCO0FBQUEsTUFBQSxPQUF1QixJQUFDLENBQUEsU0FBeEIsRUFBQyxJQUFDLENBQUEsY0FBQSxNQUFGLEVBQVUsSUFBQyxDQUFBLGdCQUFBLFFBQVgsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLElBQUQsR0FBWSxJQUFBLHVCQUFBLENBQXdCLElBQXhCLEVBQTJCLElBQTNCLENBRlosQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxvQkFBUixHQUErQixJQUFDLENBQUEsSUFIaEMsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxrQkFBVixDQUE2QixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUE3QixDQUpBLENBRFc7SUFBQSxDQUFiOztBQUFBLHdCQWNBLE9BQUEsR0FBUyxTQUFDLElBQUQsR0FBQTthQUNQLElBQUMsQ0FBQSxRQUFRLENBQUMsY0FBVixDQUE2QixJQUFBLEtBQUEsQ0FBTSxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQVosQ0FBN0IsRUFETztJQUFBLENBZFQsQ0FBQTs7QUFBQSx3QkF3QkEsTUFBQSxHQUFRLFNBQUMsSUFBRCxHQUFBO0FBQ04sTUFBQSxJQUFHLElBQUMsQ0FBQSxRQUFRLENBQUMsaUJBQVYsQ0FBQSxDQUFIO2VBQ0UsSUFBQyxDQUFBLFFBQVEsQ0FBQyxjQUFWLENBQTZCLElBQUEsS0FBQSxDQUFNLEVBQU4sQ0FBN0IsRUFERjtPQURNO0lBQUEsQ0F4QlIsQ0FBQTs7cUJBQUE7O01BekJGLENBQUE7O0FBQUEsRUFxRE07QUFDUyxJQUFBLGVBQUUsVUFBRixHQUFBO0FBQWUsTUFBZCxJQUFDLENBQUEsYUFBQSxVQUFhLENBQWY7SUFBQSxDQUFiOztBQUFBLG9CQUNBLFVBQUEsR0FBWSxTQUFBLEdBQUE7YUFBRyxLQUFIO0lBQUEsQ0FEWixDQUFBOztBQUFBLG9CQUVBLFlBQUEsR0FBYyxTQUFBLEdBQUE7YUFBRyxLQUFIO0lBQUEsQ0FGZCxDQUFBOztpQkFBQTs7TUF0REYsQ0FBQTs7QUFBQSxFQTBEQSxNQUFNLENBQUMsT0FBUCxHQUFpQjtBQUFBLElBQ2YsV0FBQSxTQURlO0FBQUEsSUFDSixPQUFBLEtBREk7R0ExRGpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/gmason/.atom/packages/vim-mode/lib/view-models/view-model.coffee