(function() {
  var Scroll, ScrollCursor, ScrollCursorToBottom, ScrollCursorToMiddle, ScrollCursorToTop, ScrollDown, ScrollHalfScreenDown, ScrollHalfScreenUp, ScrollUp,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Scroll = (function() {
    Scroll.prototype.isComplete = function() {
      return true;
    };

    Scroll.prototype.isRecordable = function() {
      return false;
    };

    function Scroll(editor) {
      this.editor = editor;
      this.scrolloff = 2;
      this.rows = {
        first: this.editor.getFirstVisibleScreenRow(),
        last: this.editor.getLastVisibleScreenRow(),
        final: this.editor.getLastScreenRow()
      };
    }

    return Scroll;

  })();

  ScrollDown = (function(_super) {
    __extends(ScrollDown, _super);

    function ScrollDown() {
      return ScrollDown.__super__.constructor.apply(this, arguments);
    }

    ScrollDown.prototype.execute = function(count) {
      if (count == null) {
        count = 1;
      }
      this.keepCursorOnScreen(count);
      return this.scrollUp(count);
    };

    ScrollDown.prototype.keepCursorOnScreen = function(count) {
      var column, firstScreenRow, row, _ref;
      _ref = this.editor.getCursorScreenPosition(), row = _ref.row, column = _ref.column;
      firstScreenRow = this.rows.first + this.scrolloff + 1;
      if (row - count <= firstScreenRow) {
        return this.editor.setCursorScreenPosition([firstScreenRow + count, column]);
      }
    };

    ScrollDown.prototype.scrollUp = function(count) {
      var lastScreenRow;
      lastScreenRow = this.rows.last - this.scrolloff;
      return this.editor.scrollToScreenPosition([lastScreenRow + count, 0]);
    };

    return ScrollDown;

  })(Scroll);

  ScrollUp = (function(_super) {
    __extends(ScrollUp, _super);

    function ScrollUp() {
      return ScrollUp.__super__.constructor.apply(this, arguments);
    }

    ScrollUp.prototype.execute = function(count) {
      if (count == null) {
        count = 1;
      }
      this.keepCursorOnScreen(count);
      return this.scrollDown(count);
    };

    ScrollUp.prototype.keepCursorOnScreen = function(count) {
      var column, lastScreenRow, row, _ref;
      _ref = this.editor.getCursorScreenPosition(), row = _ref.row, column = _ref.column;
      lastScreenRow = this.rows.last - this.scrolloff - 1;
      if (row + count >= lastScreenRow) {
        return this.editor.setCursorScreenPosition([lastScreenRow - count, column]);
      }
    };

    ScrollUp.prototype.scrollDown = function(count) {
      var firstScreenRow;
      firstScreenRow = this.rows.first + this.scrolloff;
      return this.editor.scrollToScreenPosition([firstScreenRow - count, 0]);
    };

    return ScrollUp;

  })(Scroll);

  ScrollCursor = (function(_super) {
    __extends(ScrollCursor, _super);

    function ScrollCursor(editor, opts) {
      var cursor;
      this.editor = editor;
      this.opts = opts != null ? opts : {};
      ScrollCursor.__super__.constructor.apply(this, arguments);
      cursor = this.editor.getCursorScreenPosition();
      this.pixel = this.editor.pixelPositionForScreenPosition(cursor).top;
    }

    return ScrollCursor;

  })(Scroll);

  ScrollCursorToTop = (function(_super) {
    __extends(ScrollCursorToTop, _super);

    function ScrollCursorToTop() {
      return ScrollCursorToTop.__super__.constructor.apply(this, arguments);
    }

    ScrollCursorToTop.prototype.execute = function() {
      if (!this.opts.leaveCursor) {
        this.moveToFirstNonBlank();
      }
      return this.scrollUp();
    };

    ScrollCursorToTop.prototype.scrollUp = function() {
      if (this.rows.last === this.rows.final) {
        return;
      }
      this.pixel -= this.editor.getLineHeightInPixels() * this.scrolloff;
      return this.editor.setScrollTop(this.pixel);
    };

    ScrollCursorToTop.prototype.moveToFirstNonBlank = function() {
      return this.editor.moveToFirstCharacterOfLine();
    };

    return ScrollCursorToTop;

  })(ScrollCursor);

  ScrollCursorToMiddle = (function(_super) {
    __extends(ScrollCursorToMiddle, _super);

    function ScrollCursorToMiddle() {
      return ScrollCursorToMiddle.__super__.constructor.apply(this, arguments);
    }

    ScrollCursorToMiddle.prototype.execute = function() {
      if (!this.opts.leaveCursor) {
        this.moveToFirstNonBlank();
      }
      return this.scrollMiddle();
    };

    ScrollCursorToMiddle.prototype.scrollMiddle = function() {
      this.pixel -= this.editor.getHeight() / 2;
      return this.editor.setScrollTop(this.pixel);
    };

    ScrollCursorToMiddle.prototype.moveToFirstNonBlank = function() {
      return this.editor.moveToFirstCharacterOfLine();
    };

    return ScrollCursorToMiddle;

  })(ScrollCursor);

  ScrollCursorToBottom = (function(_super) {
    __extends(ScrollCursorToBottom, _super);

    function ScrollCursorToBottom() {
      return ScrollCursorToBottom.__super__.constructor.apply(this, arguments);
    }

    ScrollCursorToBottom.prototype.execute = function() {
      if (!this.opts.leaveCursor) {
        this.moveToFirstNonBlank();
      }
      return this.scrollDown();
    };

    ScrollCursorToBottom.prototype.scrollDown = function() {
      var offset;
      if (this.rows.first === 0) {
        return;
      }
      offset = this.editor.getLineHeightInPixels() * (this.scrolloff + 1);
      this.pixel -= this.editor.getHeight() - offset;
      return this.editor.setScrollTop(this.pixel);
    };

    ScrollCursorToBottom.prototype.moveToFirstNonBlank = function() {
      return this.editor.moveToFirstCharacterOfLine();
    };

    return ScrollCursorToBottom;

  })(ScrollCursor);

  ScrollHalfScreenUp = (function(_super) {
    __extends(ScrollHalfScreenUp, _super);

    function ScrollHalfScreenUp() {
      return ScrollHalfScreenUp.__super__.constructor.apply(this, arguments);
    }

    ScrollHalfScreenUp.prototype.execute = function() {
      this.scrollDown();
      return this.moveCursor();
    };

    ScrollHalfScreenUp.prototype.moveCursor = function() {
      var column, currentFirstScreenRow, dest, row, _ref;
      _ref = this.editor.getCursorScreenPosition(), row = _ref.row, column = _ref.column;
      currentFirstScreenRow = this.editor.getFirstVisibleScreenRow();
      dest = currentFirstScreenRow + row - this.rows.first;
      if (dest >= 0) {
        return this.editor.setCursorScreenPosition([dest, column]);
      }
    };

    ScrollHalfScreenUp.prototype.scrollDown = function() {
      var dest;
      dest = this.editor.getScrollTop() - Math.floor(this.editor.getHeight() / 2);
      return this.editor.setScrollTop(dest);
    };

    return ScrollHalfScreenUp;

  })(Scroll);

  ScrollHalfScreenDown = (function(_super) {
    __extends(ScrollHalfScreenDown, _super);

    function ScrollHalfScreenDown() {
      return ScrollHalfScreenDown.__super__.constructor.apply(this, arguments);
    }

    ScrollHalfScreenDown.prototype.execute = function() {
      this.scrollUp();
      return this.moveCursor();
    };

    ScrollHalfScreenDown.prototype.moveCursor = function() {
      var column, currentFirstScreenRow, dest, row, _ref;
      _ref = this.editor.getCursorScreenPosition(), row = _ref.row, column = _ref.column;
      currentFirstScreenRow = this.editor.getFirstVisibleScreenRow();
      dest = currentFirstScreenRow + row - this.rows.first;
      if (dest <= this.rows.final) {
        return this.editor.setCursorScreenPosition([dest, column]);
      }
    };

    ScrollHalfScreenDown.prototype.scrollUp = function() {
      var dest;
      dest = this.editor.getScrollTop() + Math.floor(this.editor.getHeight() / 2);
      return this.editor.setScrollTop(dest);
    };

    return ScrollHalfScreenDown;

  })(Scroll);

  module.exports = {
    ScrollDown: ScrollDown,
    ScrollUp: ScrollUp,
    ScrollCursorToTop: ScrollCursorToTop,
    ScrollCursorToMiddle: ScrollCursorToMiddle,
    ScrollCursorToBottom: ScrollCursorToBottom,
    ScrollHalfScreenUp: ScrollHalfScreenUp,
    ScrollHalfScreenDown: ScrollHalfScreenDown
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1KQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBTTtBQUNKLHFCQUFBLFVBQUEsR0FBWSxTQUFBLEdBQUE7YUFBRyxLQUFIO0lBQUEsQ0FBWixDQUFBOztBQUFBLHFCQUNBLFlBQUEsR0FBYyxTQUFBLEdBQUE7YUFBRyxNQUFIO0lBQUEsQ0FEZCxDQUFBOztBQUVhLElBQUEsZ0JBQUUsTUFBRixHQUFBO0FBQ1gsTUFEWSxJQUFDLENBQUEsU0FBQSxNQUNiLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxTQUFELEdBQWEsQ0FBYixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsSUFBRCxHQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyx3QkFBUixDQUFBLENBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxJQUFDLENBQUEsTUFBTSxDQUFDLHVCQUFSLENBQUEsQ0FETjtBQUFBLFFBRUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMsZ0JBQVIsQ0FBQSxDQUZQO09BRkYsQ0FEVztJQUFBLENBRmI7O2tCQUFBOztNQURGLENBQUE7O0FBQUEsRUFVTTtBQUNKLGlDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSx5QkFBQSxPQUFBLEdBQVMsU0FBQyxLQUFELEdBQUE7O1FBQUMsUUFBTTtPQUNkO0FBQUEsTUFBQSxJQUFDLENBQUEsa0JBQUQsQ0FBb0IsS0FBcEIsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxLQUFWLEVBRk87SUFBQSxDQUFULENBQUE7O0FBQUEseUJBSUEsa0JBQUEsR0FBb0IsU0FBQyxLQUFELEdBQUE7QUFDbEIsVUFBQSxpQ0FBQTtBQUFBLE1BQUEsT0FBZ0IsSUFBQyxDQUFBLE1BQU0sQ0FBQyx1QkFBUixDQUFBLENBQWhCLEVB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
//# sourceURL=/Users/gmason/.atom/packages/vim-mode/lib/scroll.coffee