(function() {
  var alignment;

  alignment = require('../lib/alignment');

  describe('alignment', function() {
    beforeEach(function() {
      atom.config.set('alignment.leftSeparators', [':']);
      atom.config.set('alignment.rightSeparators', ['=', '+=', '-=', '/=', '=>']);
      atom.config.set('alignment.spaceSeparators', ['=', '+=', '-=', '/=', '=>']);
      return atom.config.set('alignment.ignoreSeparators', ['::']);
    });
    it('should align text with equal signs', function() {
      var result;
      result = alignment("left=right\nanother = more");
      expect(result[0]).toEqual("left    = right\nanother = more");
      return expect(result[1]).toEqual([[0, 8], [1, 8]]);
    });
    it('should align PHP-style variables', function() {
      var result;
      result = alignment("$a = 1;\n$bg = 2;");
      expect(result[0]).toEqual("$a  = 1;\n$bg = 2;");
      return expect(result[1]).toEqual([[0, 4], [1, 4]]);
    });
    it('should align text with colons', function() {
      var result;
      result = alignment("left  : right\nanother   :test\nsomething: else");
      expect(result[0]).toEqual("left:      right\nanother:   test\nsomething: else");
      return expect(result[1]).toEqual([[0, 4], [1, 7], [2, 9]]);
    });
    it('should align text with colons and equal signs', function() {
      var result;
      result = alignment("left  = right\nanother   :test\nsomething: else");
      expect(result[0]).toEqual("left     = right\nanother:   test\nsomething: else");
      return expect(result[1]).toEqual([[0, 9], [1, 7], [2, 9]]);
    });
    it('should ignore text in quotes and align correctly', function() {
      var result;
      result = alignment("\"left:test\"  = right\n\"another =\"  :test\nsomething: else");
      expect(result[0]).toEqual("\"left:test\" = right\n\"another =\":  test\nsomething:    else");
      return expect(result[1]).toEqual([[0, 12], [1, 11], [2, 9]]);
    });
    it('should align multiple signs properly', function() {
      var result;
      result = alignment("this = that = test\nanother = thing = here");
      expect(result[0]).toEqual("this    = that  = test\nanother = thing = here");
      return expect(result[1]).toEqual([[0, 8], [0, 16], [1, 8], [1, 16]]);
    });
    it('should ignore escaped quotes', function() {
      var result;
      result = alignment("\"test\\\" escape\": more\n'yet another \\' escape' = more");
      expect(result[0]).toEqual("\"test\\\" escape\":          more\n'yet another \\' escape' = more");
      return expect(result[1]).toEqual([[0, 15], [1, 24]]);
    });
    it('should properly align multiple separators', function() {
      var result;
      result = alignment("test += 1\nsomething -= 1\nelse /= 1");
      expect(result[0]).toEqual("test      += 1\nsomething -= 1\nelse      /= 1");
      return expect(result[1]).toEqual([[0, 10], [1, 10], [2, 10]]);
    });
    it('should ignore lines with no separator', function() {
      var result;
      result = alignment("something += 1\n# comment\nagain = 5");
      expect(result[0]).toEqual("something += 1\n# comment\nagain      = 5");
      return expect(result[1]).toEqual([[0, 10], [2, 11]]);
    });
    it('should ignore escaped opening quotes', function() {
      var result;
      result = alignment("test\\\"something=\":else\"\nsomething = simple");
      expect(result[0]).toEqual("test\\\"something = \":else\"\nsomething       = simple");
      return expect(result[1]).toEqual([[0, 16], [1, 16]]);
    });
    it('should catch escaped escape characters', function() {
      var result;
      result = alignment("\"test\\\\\" :escape\":more\n'yet another \\' escape' = more");
      expect(result[0]).toEqual("\"test\\\\\":                 escape\":more\n'yet another \\' escape' = more");
      return expect(result[1]).toEqual([[0, 8], [1, 24]]);
    });
    return it('should ignore double colons', function() {
      var result;
      result = alignment("App::NAME_KEY => 'text',\nApp::FORMAT_KEY => '123'");
      return expect(result[0]).toEqual("App::NAME_KEY   => 'text',\nApp::FORMAT_KEY => '123'");
    });
  });

}).call(this);
