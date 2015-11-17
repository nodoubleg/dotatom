(function() {
  var alignment, escape, isEmpty, sortLength,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  escape = require('escape-regexp');

  sortLength = function(a, b) {
    return b.length - a.length;
  };

  isEmpty = function(x) {
    return x;
  };

  alignment = module.exports = function(text) {
    var alignText, ignoreSeparators, leftSeparators, rightSeparators, separatorRegExp, separators, spaceSeparators;
    leftSeparators = atom.config.get('alignment.leftSeparators');
    rightSeparators = atom.config.get('alignment.rightSeparators');
    ignoreSeparators = atom.config.get('alignment.ignoreSeparators');
    spaceSeparators = atom.config.get('alignment.spaceSeparators');
    separators = leftSeparators.concat(rightSeparators).concat(ignoreSeparators).filter(isEmpty).sort(sortLength).map(escape);
    if (!separators.length) {
      return;
    }
    separatorRegExp = new RegExp('^(?:' + ['\\\\.', '"(?:\\\\.|[^"])*?"', '\'(?:\\\\.|[^\'])*?\'', '[^\'"]'].join('|') + ')*?' + '(' + separators.join('|') + ')');
    alignText = function(text) {
      var findSeparator, leftLength, lines, matches, parts, positions, rightLines, rightParts;
      lines = text.split('\n');
      matches = 0;
      findSeparator = function(line, startIndex) {
        var length, match, _ref;
        startIndex = startIndex || 0;
        match = line.substr(startIndex).match(separatorRegExp);
        if (!match) {
          return;
        }
        length = match[0].length;
        if (_ref = match[1], __indexOf.call(ignoreSeparators, _ref) >= 0) {
          return findSeparator(line, length);
        }
        matches += 1;
        return [line.substr(0, startIndex + length - match[1].length).trimRight(), match[1], line.substr(startIndex + length).trimLeft()];
      };
      parts = lines.map(function(line) {
        return findSeparator(line);
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
