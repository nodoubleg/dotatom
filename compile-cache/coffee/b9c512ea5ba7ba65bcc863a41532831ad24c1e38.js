(function() {
  var Range, TextBuffer, alignment, plugin, _ref;

  alignment = require('./alignment');

  _ref = require('atom'), Range = _ref.Range, TextBuffer = _ref.TextBuffer;

  plugin = module.exports = {
    configDefaults: {
      leftSeparators: [':'],
      rightSeparators: ['=', '+=', '-=', '*=', '/=', '?=', '|=', '%=', '.=', '=>'],
      spaceSeparators: ['=', '+=', '-=', '*=', '/=', '?=', '|=', '%=', '.=', '=>']
    },
    activate: function(state) {
      return atom.workspaceView.command('alignment', '.editor', function() {
        return plugin.align(atom.workspace.getActiveEditor());
      });
    },
    align: function(editor) {
      return editor.getSelections().forEach(function(selection) {
        return plugin.alignSelection(editor, selection);
      });
    },
    alignSelection: function(editor, selection) {
      return editor.transact((function(_this) {
        return function() {
          var align, endColumn, endRow, range, selectionRange, startColumn, startRow, text;
          selectionRange = selection.getBufferRange();
          startRow = selectionRange.start.row;
          startColumn = 0;
          endRow = selectionRange.end.row;
          endColumn = editor.lineLengthForBufferRow(selectionRange.end.row);
          range = new Range([startRow, startColumn], [endRow, endColumn]);
          text = editor.getTextInBufferRange(range);
          align = alignment(text);
          selection.cursor.destroy();
          editor.setTextInBufferRange(range, align[0]);
          return align[1].forEach(function(position) {
            return editor.addCursorAtBufferPosition([startRow + position[0], position[1]]);
          });
        };
      })(this));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBDQUFBOztBQUFBLEVBQUEsU0FBQSxHQUFzQixPQUFBLENBQVEsYUFBUixDQUF0QixDQUFBOztBQUFBLEVBQ0EsT0FBc0IsT0FBQSxDQUFRLE1BQVIsQ0FBdEIsRUFBQyxhQUFBLEtBQUQsRUFBUSxrQkFBQSxVQURSLENBQUE7O0FBQUEsRUFHQSxNQUFBLEdBQVMsTUFBTSxDQUFDLE9BQVAsR0FDUDtBQUFBLElBQUEsY0FBQSxFQUNFO0FBQUEsTUFBQSxjQUFBLEVBQ0UsQ0FBQyxHQUFELENBREY7QUFBQSxNQUVBLGVBQUEsRUFDRSxDQUFDLEdBQUQsRUFBTSxJQUFOLEVBQVksSUFBWixFQUFrQixJQUFsQixFQUF3QixJQUF4QixFQUE4QixJQUE5QixFQUFvQyxJQUFwQyxFQUEwQyxJQUExQyxFQUFnRCxJQUFoRCxFQUFzRCxJQUF0RCxDQUhGO0FBQUEsTUFJQSxlQUFBLEVBQ0UsQ0FBQyxHQUFELEVBQU0sSUFBTixFQUFZLElBQVosRUFBa0IsSUFBbEIsRUFBd0IsSUFBeEIsRUFBOEIsSUFBOUIsRUFBb0MsSUFBcEMsRUFBMEMsSUFBMUMsRUFBZ0QsSUFBaEQsRUFBc0QsSUFBdEQsQ0FMRjtLQURGO0FBQUEsSUFRQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7YUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLFdBQTNCLEVBQXdDLFNBQXhDLEVBQW1ELFNBQUEsR0FBQTtlQUNqRCxNQUFNLENBQUMsS0FBUCxDQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZixDQUFBLENBQWIsRUFEaUQ7TUFBQSxDQUFuRCxFQURRO0lBQUEsQ0FSVjtBQUFBLElBYUEsS0FBQSxFQUFPLFNBQUMsTUFBRCxHQUFBO2FBQ0wsTUFBTSxDQUFDLGFBQVAsQ0FBQSxDQUNFLENBQUMsT0FESCxDQUNXLFNBQUMsU0FBRCxHQUFBO2VBQ1AsTUFBTSxDQUFDLGNBQVAsQ0FBc0IsTUFBdEIsRUFBOEIsU0FBOUIsRUFETztNQUFBLENBRFgsRUFESztJQUFBLENBYlA7QUFBQSxJQW1CQSxjQUFBLEVBQWdCLFNBQUMsTUFBRCxFQUFTLFNBQVQsR0FBQTthQUNkLE1BQU0sQ0FBQyxRQUFQLENBQWdCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDZCxjQUFBLDRFQUFBO0FBQUEsVUFBQSxjQUFBLEdBQWlCLFNBQVMsQ0FBQyxjQUFWLENBQUEsQ0FBakIsQ0FBQTtBQUFBLFVBRUEsUUFBQSxHQUFjLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FGbkMsQ0FBQTtBQUFBLFVBR0EsV0FBQSxHQUFjLENBSGQsQ0FBQTtBQUFBLFVBSUEsTUFBQSxHQUFjLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FKakMsQ0FBQTtBQUFBLFVBS0EsU0FBQSxHQUFjLE1BQU0sQ0FBQyxzQkFBUCxDQUE4QixjQUFjLENBQUMsR0FBRyxDQUFDLEdBQWpELENBTGQsQ0FBQTtBQUFBLFVBTUEsS0FBQSxHQUFrQixJQUFBLEtBQUEsQ0FBTSxDQUFDLFFBQUQsRUFBVyxXQUFYLENBQU4sRUFBK0IsQ0FBQyxNQUFELEVBQVMsU0FBVCxDQUEvQixDQU5sQixDQUFBO0FBQUEsVUFPQSxJQUFBLEdBQWMsTUFBTSxDQUFDLG9CQUFQLENBQTRCLEtBQTVCLENBUGQsQ0FBQTtBQUFBLFVBUUEsS0FBQSxHQUFjLFNBQUEsQ0FBVSxJQUFWLENBUmQsQ0FBQTtBQUFBLFVBVUEsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFqQixDQUFBLENBVkEsQ0FBQTtBQUFBLFVBV0EsTUFBTSxDQUFDLG9CQUFQLENBQTRCLEtBQTVCLEVBQW1DLEtBQU0sQ0FBQSxDQUFBLENBQXpDLENBWEEsQ0FBQTtpQkFhQSxLQUFNLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBVCxDQUFpQixTQUFDLFFBQUQsR0FBQTttQkFDZixNQUFNLENBQUMseUJBQVAsQ0FBaUMsQ0FBQyxRQUFBLEdBQVcsUUFBUyxDQUFBLENBQUEsQ0FBckIsRUFBeUIsUUFBUyxDQUFBLENBQUEsQ0FBbEMsQ0FBakMsRUFEZTtVQUFBLENBQWpCLEVBZGM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQixFQURjO0lBQUEsQ0FuQmhCO0dBSkYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/gmason/.atom/packages/alignment/lib/atom-alignment.coffee