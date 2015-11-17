(function() {
  var alignment, escape, sortLength,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  escape = require('escape-regexp');

  sortLength = function(a, b) {
    return b.length - a.length;
  };

  alignment = module.exports = function(text) {
    var alignText, leftSeparators, rightSeparators, separatorRegExp, separators, spaceSeparators;
    leftSeparators = atom.config.get('alignment.leftSeparators');
    rightSeparators = atom.config.get('alignment.rightSeparators');
    separators = leftSeparators.concat(rightSeparators);
    spaceSeparators = atom.config.get('alignment.spaceSeparators');
    separatorRegExp = new RegExp('^(?:' + ['\\\\.', '"(?:\\\\.|[^"])*?"', '\'(?:\\\\.|[^\'])*?\'', '[^\'"]'].join('|') + ')*?' + '(' + separators.sort(sortLength).map(escape).join('|') + ')');
    alignText = function(text) {
      var leftLength, lines, matches, parts, positions, rightLines, rightParts;
      lines = text.split('\n');
      matches = 0;
      parts = lines.map(function(line, index) {
        var match;
        match = line.match(separatorRegExp);
        if (!match) {
          return;
        }
        matches += 1;
        return [match[0].substr(0, match[0].length - match[1].length).trimRight(), match[1], line.substr(match[0].length).trimLeft()];
      });
      if (!matches) {
        return [text, []];
      }
      rightParts = alignText(parts.map(function(part) {
        if (part) {
          return part[2];
        } else {
          return '';
        }
      }).join('\n'));
      rightLines = rightParts[0].split('\n');
      leftLength = parts.reduce(function(prev, part) {
        var length, _ref;
        if (!part) {
          return prev;
        }
        length = part[0].length + part[1].length + 1;
        if (_ref = part[1], __indexOf.call(spaceSeparators, _ref) >= 0) {
          length += 1;
        }
        if (length > prev) {
          return length;
        } else {
          return prev;
        }
      }, 0);
      positions = [];
      text = parts.map(function(part, index) {
        var line, padding, position, spaces, _ref, _ref1;
        if (!part) {
          return lines[index];
        }
        line = part[0];
        spaces = leftLength - line.length;
        position = 0;
        if (_ref = part[1], __indexOf.call(spaceSeparators, _ref) >= 0) {
          line += ' ';
          spaces -= 1;
        }
        padding = Array(spaces - part[1].length).join(' ');
        if (_ref1 = part[1], __indexOf.call(leftSeparators, _ref1) >= 0) {
          positions.push([index, line.length]);
          line += part[1] + padding;
        } else {
          line += padding + part[1];
          positions.push([index, line.length - part[1].length]);
        }
        if (rightParts[1][index]) {
          positions.push([rightParts[1][index][0], rightParts[1][index][1] + line.length + 1]);
        }
        return line + ' ' + rightLines[index];
      }).join('\n');
      return [text, positions];
    };
    return alignText(text);
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDZCQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLGVBQVIsQ0FBVCxDQUFBOztBQUFBLEVBRUEsVUFBQSxHQUFhLFNBQUMsQ0FBRCxFQUFJLENBQUosR0FBQTtXQUNYLENBQUMsQ0FBQyxNQUFGLEdBQVcsQ0FBQyxDQUFDLE9BREY7RUFBQSxDQUZiLENBQUE7O0FBQUEsRUFLQSxTQUFBLEdBQVksTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxJQUFELEdBQUE7QUFDM0IsUUFBQSx3RkFBQTtBQUFBLElBQUEsY0FBQSxHQUFrQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsMEJBQWhCLENBQWxCLENBQUE7QUFBQSxJQUNBLGVBQUEsR0FBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDJCQUFoQixDQURsQixDQUFBO0FBQUEsSUFFQSxVQUFBLEdBQWtCLGNBQWMsQ0FBQyxNQUFmLENBQXNCLGVBQXRCLENBRmxCLENBQUE7QUFBQSxJQUdBLGVBQUEsR0FBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDJCQUFoQixDQUhsQixDQUFBO0FBQUEsSUFJQSxlQUFBLEdBQXNCLElBQUEsTUFBQSxDQUNwQixNQUFBLEdBQVMsQ0FDUCxPQURPLEVBRVAsb0JBRk8sRUFHUCx1QkFITyxFQUlQLFFBSk8sQ0FLUixDQUFDLElBTE8sQ0FLRixHQUxFLENBQVQsR0FLYyxLQUxkLEdBTUEsR0FOQSxHQU1NLFVBQVUsQ0FBQyxJQUFYLENBQWdCLFVBQWhCLENBQTJCLENBQUMsR0FBNUIsQ0FBZ0MsTUFBaEMsQ0FBdUMsQ0FBQyxJQUF4QyxDQUE2QyxHQUE3QyxDQU5OLEdBTTBELEdBUHRDLENBSnRCLENBQUE7QUFBQSxJQWNBLFNB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
//# sourceURL=/Users/gmason/.atom/packages/alignment/lib/alignment.coffee