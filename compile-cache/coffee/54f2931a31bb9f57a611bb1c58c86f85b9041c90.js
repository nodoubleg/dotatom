(function() {
  var align;

  align = require('../').align;

  describe('atom alignment', function() {
    return it('should align correctly', function() {
      var buffer, editor;
      editor = atom.project.openSync();
      buffer = editor.getBuffer();
      atom.config.set('alignment.leftSeparators', [':']);
      atom.config.set('alignment.rightSeparators', ['=']);
      atom.config.set('alignment.spaceSeparators', ['=']);
      atom.config.set('alignment.ignoreSeparators', ['::']);
      editor.setText("test= something\nanother   : test");
      editor.setSelectedBufferRange([[0, 0], [1, 5]]);
      align(editor);
      expect(buffer.lineForRow(0)).toBe('test   = something');
      expect(buffer.lineForRow(1)).toBe('another: test');
      expect(editor.getCursors()[0].getBufferPosition().row).toEqual(0);
      expect(editor.getCursors()[0].getBufferPosition().column).toEqual(7);
      expect(editor.getCursors()[1].getBufferPosition().row).toEqual(1);
      return expect(editor.getCursors()[1].getBufferPosition().column).toEqual(7);
    });
  });

}).call(this);
