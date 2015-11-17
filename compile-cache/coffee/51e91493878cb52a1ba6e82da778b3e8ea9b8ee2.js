(function() {
  var Range, TextBuffer, alignment, plugin, _ref;

  alignment = require('./alignment');

  _ref = require('atom'), Range = _ref.Range, TextBuffer = _ref.TextBuffer;

  plugin = module.exports = {
    configDefaults: {
      leftSeparators: [':'],
      rightSeparators: ['=', '+=', '-=', '*=', '/=', '?=', '|=', '%=', '.=', '=>'],
      spaceSeparators: ['=', '+=', '-=', '*=', '/=', '?=', '|=', '%=', '.=', '=>'],
      ignoreSeparators: ['::']
    },
    activate: function(state) {
      return atom.workspaceView.command('alignment', '.editor', function() {
        return plugin.align(atom.workspace.getActiveTextEditor());
      });
    },
    align: function(editor) {
      return editor.getSelections().forEach(function(selection) {
        return plugin.alignSelection(editor, selection);
      });
    },
    alignSelection: function(editor, selection) {
      return editor.transact(function() {
        var align, endColumn, endRow, range, selectionRange, startColumn, startRow, text;
        selectionRange = selection.getBufferRange();
        startRow = selectionRange.start.row;
        startColumn = 0;
        endRow = selectionRange.end.row;
        endColumn = editor.lineLengthForBufferRow(selectionRange.end.row);
        range = new Range([startRow, startColumn], [endRow, endColumn]);
        text = editor.getTextInBufferRange(range);
        align = alignment(text);
        if (!align[1].length) {
          return;
        }
        selection.clear();
        editor.setTextInBufferRange(range, align[0]);
        align[1].forEach(function(position) {
          return editor.addCursorAtBufferPosition([startRow + position[0], position[1]]);
        });
        return selection.destroy();
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBDQUFBOztBQUFBLEVBQUEsU0FBQSxHQUFzQixPQUFBLENBQVEsYUFBUixDQUF0QixDQUFBOztBQUFBLEVBQ0EsT0FBc0IsT0FBQSxDQUFRLE1BQVIsQ0FBdEIsRUFBQyxhQUFBLEtBQUQsRUFBUSxrQkFBQSxVQURSLENBQUE7O0FBQUEsRUFHQSxNQUFBLEdBQVMsTUFBTSxDQUFDLE9BQVAsR0FDUDtBQUFBLElBQUEsY0FBQSxFQUNFO0FBQUEsTUFBQSxjQUFBLEVBQ0UsQ0FBQyxHQUFELENBREY7QUFBQSxNQUVBLGVBQUEsRUFDRSxDQUFDLEdBQUQsRUFBTSxJQUFOLEVBQVksSUFBWixFQUFrQixJQUFsQixFQUF3QixJQUF4QixFQUE4QixJQUE5QixFQUFvQyxJQUFwQyxFQUEwQyxJQUExQyxFQUFnRCxJQUFoRCxFQUFzRCxJQUF0RCxDQUhGO0FBQUEsTUFJQSxlQUFBLEVBQ0UsQ0FBQyxHQUFELEVBQU0sSUFBTixFQUFZLElBQVosRUFBa0IsSUFBbEIsRUFBd0IsSUFBeEIsRUFBOEIsSUFBOUIsRUFBb0MsSUFBcEMsRUFBMEMsSUFBMUMsRUFBZ0QsSUFBaEQsRUFBc0QsSUFBdEQsQ0FMRjtBQUFBLE1BTUEsZ0JBQUEsRUFDRSxDQUFDLElBQUQsQ0FQRjtLQURGO0FBQUEsSUFVQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7YUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLFdBQTNCLEVBQXdDLFNBQXhDLEVBQW1ELFNBQUEsR0FBQTtlQUNqRCxNQUFNLENBQUMsS0FBUCxDQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQSxDQUFiLEVBRGlEO01BQUEsQ0FBbkQsRUFEUTtJQUFBLENBVlY7QUFBQSxJQWVBLEtBQUEsRUFBTyxTQUFDLE1BQUQsR0FBQTthQUNMLE1BQU0sQ0FBQyxhQUFQLENBQUEsQ0FBc0IsQ0FBQyxPQUF2QixDQUErQixTQUFDLFNBQUQsR0FBQTtlQUM3QixNQUFNLENBQUMsY0FBUCxDQUFzQixNQUF0QixFQUE4QixTQUE5QixFQUQ2QjtNQUFBLENBQS9CLEVBREs7SUFBQSxDQWZQO0FBQUEsSUFvQkEsY0FBQSxFQUFnQixTQUFDLE1BQUQsRUFBUyxTQUFULEdBQUE7YUFDZCxNQUFNLENBQUMsUUFBUCxDQUFnQixTQUFBLEdBQUE7QUFDZCxZQUFBLDRFQUFBO0FBQUEsUUFBQSxjQUFBLEdBQWlCLFNBQVMsQ0FBQyxjQUFWLENBQUEsQ0FBakIsQ0FBQTtBQUFBLFFBRUEsUUFBQSxHQUFjLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FGbkMsQ0FBQTtBQUFBLFFBR0EsV0FBQSxHQUFjLENBSGQsQ0FBQTtBQUFBLFFBSUEsTUFBQSxHQUFjLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FKakMsQ0FBQTtBQUFBLFFBS0EsU0FBQSxHQUFjLE1BQU0sQ0FBQyxzQkFBUCxDQUE4QixjQUFjLENBQUMsR0FBRyxDQUFDLEdBQWpELENBTGQsQ0FBQTtBQUFBLFFBTUEsS0FBQSxHQUFrQixJQUFBLEtBQUEsQ0FBTSxDQUFDLFFBQUQsRUFBVyxXQUFYLENBQU4sRUFBK0IsQ0FBQyxNQUFELEVBQVMsU0FBVCxDQUEvQixDQU5sQixDQUFBO0FBQUEsUUFPQSxJQUFBLEdBQWMsTUFBTSxDQUFDLG9CQUFQLENBQTRCLEtBQTVCLENBUGQsQ0FBQTtBQUFBLFFBUUEsS0FBQSxHQUFjLFNBQUEsQ0FBVSxJQUFWLENBUmQsQ0FBQTtBQVVBLFFBQUEsSUFBVSxDQUFBLEtBQU8sQ0FBQSxDQUFBLENBQUUsQ0FBQyxNQUFwQjtBQUFBLGdCQUFBLENBQUE7U0FWQTtBQUFBLFFBWUEsU0FBUyxDQUFDLEtBQVYsQ0FBQSxDQVpBLENBQUE7QUFBQSxRQWFBLE1BQU0sQ0FBQyxvQkFBUCxDQUE0QixLQUE1QixFQUFtQyxLQUFNLENBQUEsQ0FBQSxDQUF6QyxDQWJBLENBQUE7QUFBQSxRQWVBLEtBQU0sQ0FBQSxDQUFBLENBQUUsQ0FBQyxPQUFULENBQWlCLFNBQUMsUUFBRCxHQUFBO2lCQUNmLE1BQU0sQ0FBQyx5QkFBUCxDQUFpQyxDQUFDLFFBQUEsR0FBVyxRQUFTLENBQUEsQ0FBQSxDQUFyQixFQUF5QixRQUFTLENBQUEsQ0FBQSxDQUFsQyxDQUFqQyxFQURlO1FBQUEsQ0FBakIsQ0FmQSxDQUFBO2VBbUJBLFNBQVMsQ0FBQyxPQUFWLENBQUEsRUFwQmM7TUFBQSxDQUFoQixFQURjO0lBQUEsQ0FwQmhCO0dBSkYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/gmason/.atom/packages/alignment/lib/atom-alignment.coffee