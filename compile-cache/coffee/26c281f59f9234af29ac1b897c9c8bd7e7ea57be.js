(function() {
  var FocusAction, FocusPaneViewAbove, FocusPaneViewBelow, FocusPaneViewOnLeft, FocusPaneViewOnRight, FocusPreviousPaneView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  FocusAction = (function() {
    function FocusAction() {}

    FocusAction.prototype.isComplete = function() {
      return true;
    };

    FocusAction.prototype.isRecordable = function() {
      return false;
    };

    FocusAction.prototype.paneContainer = function() {
      return atom.views.getView(atom.workspace.paneContainer);
    };

    FocusAction.prototype.focusCursor = function() {
      var editor;
      editor = atom.workspace.getActiveTextEditor();
      return editor != null ? editor.scrollToCursorPosition() : void 0;
    };

    return FocusAction;

  })();

  FocusPaneViewOnLeft = (function(_super) {
    __extends(FocusPaneViewOnLeft, _super);

    function FocusPaneViewOnLeft() {
      return FocusPaneViewOnLeft.__super__.constructor.apply(this, arguments);
    }

    FocusPaneViewOnLeft.prototype.execute = function() {
      this.paneContainer().focusPaneViewOnLeft();
      return this.focusCursor();
    };

    return FocusPaneViewOnLeft;

  })(FocusAction);

  FocusPaneViewOnRight = (function(_super) {
    __extends(FocusPaneViewOnRight, _super);

    function FocusPaneViewOnRight() {
      return FocusPaneViewOnRight.__super__.constructor.apply(this, arguments);
    }

    FocusPaneViewOnRight.prototype.execute = function() {
      this.paneContainer().focusPaneViewOnRight();
      return this.focusCursor();
    };

    return FocusPaneViewOnRight;

  })(FocusAction);

  FocusPaneViewAbove = (function(_super) {
    __extends(FocusPaneViewAbove, _super);

    function FocusPaneViewAbove() {
      return FocusPaneViewAbove.__super__.constructor.apply(this, arguments);
    }

    FocusPaneViewAbove.prototype.execute = function() {
      this.paneContainer().focusPaneViewAbove();
      return this.focusCursor();
    };

    return FocusPaneViewAbove;

  })(FocusAction);

  FocusPaneViewBelow = (function(_super) {
    __extends(FocusPaneViewBelow, _super);

    function FocusPaneViewBelow() {
      return FocusPaneViewBelow.__super__.constructor.apply(this, arguments);
    }

    FocusPaneViewBelow.prototype.execute = function() {
      this.paneContainer().focusPaneViewBelow();
      return this.focusCursor();
    };

    return FocusPaneViewBelow;

  })(FocusAction);

  FocusPreviousPaneView = (function(_super) {
    __extends(FocusPreviousPaneView, _super);

    function FocusPreviousPaneView() {
      return FocusPreviousPaneView.__super__.constructor.apply(this, arguments);
    }

    FocusPreviousPaneView.prototype.execute = function() {
      atom.workspace.activatePreviousPane();
      return this.focusCursor();
    };

    return FocusPreviousPaneView;

  })(FocusAction);

  module.exports = {
    FocusPaneViewOnLeft: FocusPaneViewOnLeft,
    FocusPaneViewOnRight: FocusPaneViewOnRight,
    FocusPaneViewAbove: FocusPaneViewAbove,
    FocusPaneViewBelow: FocusPaneViewBelow,
    FocusPreviousPaneView: FocusPreviousPaneView
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFIQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBTTs2QkFDSjs7QUFBQSwwQkFBQSxVQUFBLEdBQVksU0FBQSxHQUFBO2FBQUcsS0FBSDtJQUFBLENBQVosQ0FBQTs7QUFBQSwwQkFDQSxZQUFBLEdBQWMsU0FBQSxHQUFBO2FBQUcsTUFBSDtJQUFBLENBRGQsQ0FBQTs7QUFBQSwwQkFHQSxhQUFBLEdBQWUsU0FBQSxHQUFBO2FBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBbEMsRUFEYTtJQUFBLENBSGYsQ0FBQTs7QUFBQSwwQkFNQSxXQUFBLEdBQWEsU0FBQSxHQUFBO0FBQ1gsVUFBQSxNQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBLENBQVQsQ0FBQTs4QkFDQSxNQUFNLENBQUUsc0JBQVIsQ0FBQSxXQUZXO0lBQUEsQ0FOYixDQUFBOzt1QkFBQTs7TUFERixDQUFBOztBQUFBLEVBV007QUFDSiwwQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsa0NBQUEsT0FBQSxHQUFTLFNBQUEsR0FBQTtBQUNQLE1BQUEsSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUFnQixDQUFDLG1CQUFqQixDQUFBLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxXQUFELENBQUEsRUFGTztJQUFBLENBQVQsQ0FBQTs7K0JBQUE7O0tBRGdDLFlBWGxDLENBQUE7O0FBQUEsRUFnQk07QUFDSiwyQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsbUNBQUEsT0FBQSxHQUFTLFNBQUEsR0FBQTtBQUNQLE1BQUEsSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUFnQixDQUFDLG9CQUFqQixDQUFBLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxXQUFELENBQUEsRUFGTztJQUFBLENBQVQsQ0FBQTs7Z0NBQUE7O0tBRGlDLFlBaEJuQyxDQUFBOztBQUFBLEVBcUJNO0FBQ0oseUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLGlDQUFBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUCxNQUFBLElBQUMsQ0FBQSxhQUFELENBQUEsQ0FBZ0IsQ0FBQyxrQkFBakIsQ0FBQSxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsV0FBRCxDQUFBLEVBRk87SUFBQSxDQUFULENBQUE7OzhCQUFBOztLQUQrQixZQXJCakMsQ0FBQTs7QUFBQSxFQTBCTTtBQUNKLHlDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxpQ0FBQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsTUFBQSxJQUFDLENBQUEsYUFBRCxDQUFBLENBQWdCLENBQUMsa0JBQWpCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLFdBQUQsQ0FBQSxFQUZPO0lBQUEsQ0FBVCxDQUFBOzs4QkFBQTs7S0FEK0IsWUExQmpDLENBQUE7O0FBQUEsRUErQk07QUFDSiw0Q0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsb0NBQUEsT0FBQSxHQUFTLFNBQUEsR0FBQTtBQUNQLE1BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBZixDQUFBLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxXQUFELENBQUEsRUFGTztJQUFBLENBQVQsQ0FBQTs7aUNBQUE7O0tBRGtDLFlBL0JwQyxDQUFBOztBQUFBLEVBb0NBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBQUEsSUFBRSxxQkFBQSxtQkFBRjtBQUFBLElBQXVCLHNCQUFBLG9CQUF2QjtBQUFBLElBQ2Ysb0JBQUEsa0JBRGU7QUFBQSxJQUNLLG9CQUFBLGtCQURMO0FBQUEsSUFDeUIsdUJBQUEscUJBRHpCO0dBcENqQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/gmason/.atom/packages/vim-mode/lib/panes.coffee