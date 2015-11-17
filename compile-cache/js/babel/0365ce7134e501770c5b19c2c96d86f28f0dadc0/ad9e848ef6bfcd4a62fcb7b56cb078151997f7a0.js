'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Message = require('./message');

var BottomPanel = (function (_HTMLElement) {
  function BottomPanel() {
    _classCallCheck(this, BottomPanel);

    _get(Object.getPrototypeOf(BottomPanel.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(BottomPanel, _HTMLElement);

  _createClass(BottomPanel, [{
    key: 'prepare',
    value: function prepare() {
      // priority because of https://github.com/AtomLinter/Linter/issues/668
      this.panel = atom.workspace.addBottomPanel({ item: this, visible: false, priority: 500 });
      this.panelVisibility = true;
      return this;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.panel.destroy();
    }
  }, {
    key: 'updateMessages',
    value: function updateMessages(messages, isProject) {
      this.clear();
      if (!messages.length) {
        return this.visibility = false;
      }
      this.visibility = true;
      messages.forEach((function (message) {
        this.appendChild(Message.fromMessage(message, { addPath: isProject, cloneNode: true }));
      }).bind(this));
    }
  }, {
    key: 'clear',
    value: function clear() {
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
    }
  }, {
    key: 'panelVisibility',
    get: function get() {
      return this._panelVisibility;
    },
    set: function set(value) {
      this._panelVisibility = value;
      if (value) this.panel.show();else this.panel.hide();
    }
  }, {
    key: 'visibility',
    get: function get() {
      return this._visibility;
    },
    set: function set(value) {
      this._visibility = value;
      if (value) {
        this.removeAttribute('hidden');
      } else {
        this.setAttribute('hidden', true);
      }
    }
  }]);

  return BottomPanel;
})(HTMLElement);

module.exports = document.registerElement('linter-panel', { prototype: BottomPanel.prototype });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9nbWFzb24vLmF0b20vcGFja2FnZXMvbGludGVyL2xpYi92aWV3cy9ib3R0b20tcGFuZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFBOzs7Ozs7Ozs7O0FBRVosSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBOztJQUU1QixXQUFXO1dBQVgsV0FBVzswQkFBWCxXQUFXOzsrQkFBWCxXQUFXOzs7WUFBWCxXQUFXOztlQUFYLFdBQVc7O1dBQ1IsbUJBQUU7O0FBRVAsVUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQTtBQUN2RixVQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQTtBQUMzQixhQUFPLElBQUksQ0FBQTtLQUNaOzs7V0FDTSxtQkFBRTtBQUNQLFVBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUE7S0FDckI7OztXQW9CYSx3QkFBQyxRQUFRLEVBQUUsU0FBUyxFQUFDO0FBQ2pDLFVBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtBQUNaLFVBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDO0FBQ2xCLGVBQU8sSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUE7T0FDL0I7QUFDRCxVQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQTtBQUN0QixjQUFRLENBQUMsT0FBTyxDQUFDLENBQUEsVUFBUyxPQUFPLEVBQUM7QUFDaEMsWUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQTtPQUN0RixDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7S0FDZDs7O1dBQ0ksaUJBQUU7QUFDTCxhQUFNLElBQUksQ0FBQyxVQUFVLEVBQUM7QUFDcEIsWUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7T0FDbEM7S0FDRjs7O1NBakNrQixlQUFFO0FBQ25CLGFBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFBO0tBQzdCO1NBQ2tCLGFBQUMsS0FBSyxFQUFDO0FBQ3hCLFVBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUE7QUFDN0IsVUFBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQSxLQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO0tBQ3ZCOzs7U0FDYSxlQUFFO0FBQ2QsYUFBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0tBQ3hCO1NBQ2EsYUFBQyxLQUFLLEVBQUM7QUFDbkIsVUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUE7QUFDeEIsVUFBRyxLQUFLLEVBQUM7QUFDUCxZQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BQy9CLE1BQU07QUFDTCxZQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTtPQUNsQztLQUNGOzs7U0E1QkcsV0FBVztHQUFTLFdBQVc7O0FBOENyQyxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFLEVBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFBIiwiZmlsZSI6Ii9Vc2Vycy9nbWFzb24vLmF0b20vcGFja2FnZXMvbGludGVyL2xpYi92aWV3cy9ib3R0b20tcGFuZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubGV0IE1lc3NhZ2UgPSByZXF1aXJlKCcuL21lc3NhZ2UnKVxuXG5jbGFzcyBCb3R0b21QYW5lbCBleHRlbmRzIEhUTUxFbGVtZW50e1xuICBwcmVwYXJlKCl7XG4gICAgLy8gcHJpb3JpdHkgYmVjYXVzZSBvZiBodHRwczovL2dpdGh1Yi5jb20vQXRvbUxpbnRlci9MaW50ZXIvaXNzdWVzLzY2OFxuICAgIHRoaXMucGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRCb3R0b21QYW5lbCh7aXRlbTogdGhpcywgdmlzaWJsZTogZmFsc2UsIHByaW9yaXR5OiA1MDB9KVxuICAgIHRoaXMucGFuZWxWaXNpYmlsaXR5ID0gdHJ1ZVxuICAgIHJldHVybiB0aGlzXG4gIH1cbiAgZGVzdHJveSgpe1xuICAgIHRoaXMucGFuZWwuZGVzdHJveSgpXG4gIH1cbiAgZ2V0IHBhbmVsVmlzaWJpbGl0eSgpe1xuICAgIHJldHVybiB0aGlzLl9wYW5lbFZpc2liaWxpdHlcbiAgfVxuICBzZXQgcGFuZWxWaXNpYmlsaXR5KHZhbHVlKXtcbiAgICB0aGlzLl9wYW5lbFZpc2liaWxpdHkgPSB2YWx1ZVxuICAgIGlmKHZhbHVlKSB0aGlzLnBhbmVsLnNob3coKVxuICAgIGVsc2UgdGhpcy5wYW5lbC5oaWRlKClcbiAgfVxuICBnZXQgdmlzaWJpbGl0eSgpe1xuICAgIHJldHVybiB0aGlzLl92aXNpYmlsaXR5XG4gIH1cbiAgc2V0IHZpc2liaWxpdHkodmFsdWUpe1xuICAgIHRoaXMuX3Zpc2liaWxpdHkgPSB2YWx1ZVxuICAgIGlmKHZhbHVlKXtcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgdHJ1ZSlcbiAgICB9XG4gIH1cbiAgdXBkYXRlTWVzc2FnZXMobWVzc2FnZXMsIGlzUHJvamVjdCl7XG4gICAgdGhpcy5jbGVhcigpXG4gICAgaWYoIW1lc3NhZ2VzLmxlbmd0aCl7XG4gICAgICByZXR1cm4gdGhpcy52aXNpYmlsaXR5ID0gZmFsc2VcbiAgICB9XG4gICAgdGhpcy52aXNpYmlsaXR5ID0gdHJ1ZVxuICAgIG1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24obWVzc2FnZSl7XG4gICAgICB0aGlzLmFwcGVuZENoaWxkKE1lc3NhZ2UuZnJvbU1lc3NhZ2UobWVzc2FnZSwge2FkZFBhdGg6IGlzUHJvamVjdCwgY2xvbmVOb2RlOiB0cnVlfSkpXG4gICAgfS5iaW5kKHRoaXMpKVxuICB9XG4gIGNsZWFyKCl7XG4gICAgd2hpbGUodGhpcy5maXJzdENoaWxkKXtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5maXJzdENoaWxkKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnbGludGVyLXBhbmVsJywge3Byb3RvdHlwZTogQm90dG9tUGFuZWwucHJvdG90eXBlfSlcbiJdfQ==