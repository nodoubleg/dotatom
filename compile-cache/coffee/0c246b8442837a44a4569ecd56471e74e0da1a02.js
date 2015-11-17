(function() {
  var Range, TextBuffer, alignment, plugin, _ref;

  alignment = require('./alignment');

  _ref = require('atom'), Range = _ref.Range, TextBuffer = _ref.TextBuffer;

  plugin = module.exports = {
    config: {
      leftSeparators: {
        type: 'array',
        "default": [':'],
        items: {
          type: 'string'
        }
      },
      rightSeparators: {
        type: 'array',
        "default": ['=', '+=', '-=', '*=', '/=', '?=', '|=', '%=', '.=', '=>'],
        items: {
          type: 'string'
        }
      },
      spaceSeparators: {
        type: 'array',
        "default": ['=', '+=', '-=', '*=', '/=', '?=', '|=', '%=', '.=', '=>'],
        items: {
          type: 'string'
        }
      },
      ignoreSeparators: {
        type: 'array',
        "default": ['::'],
        items: {
          type: 'string'
        }
      }
    },
    activate: function() {
      return atom.commands.add('atom-text-editor', 'alignment', function() {
        return plugin.align(atom.workspace.getActiveTextEditor());
      });
    },
    align: function(editor) {
      if (!editor) {
        return;
      }
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
        endColumn = editor.lineTextForBufferRow(selectionRange.end.row).length;
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
