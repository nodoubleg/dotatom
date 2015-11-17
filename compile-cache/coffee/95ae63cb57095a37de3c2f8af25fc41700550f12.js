(function() {
  var $$, SelectListView, TaskListView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), SelectListView = _ref.SelectListView, $$ = _ref.$$;

  module.exports = TaskListView = (function(_super) {
    __extends(TaskListView, _super);

    function TaskListView() {
      return TaskListView.__super__.constructor.apply(this, arguments);
    }

    TaskListView.prototype.initialize = function() {
      TaskListView.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top task-list');
      return atom.workspaceView.command('task-list:toggle', (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
    };

    TaskListView.prototype.attach = function() {
      var ebuffer, editor, fixmeFinder, match, matcher, todoFinder, todos, _i, _len, _ref1;
      editor = atom.workspaceView.getActivePaneItem();
      if (editor) {
        ebuffer = editor.buffer;
        if (ebuffer) {
          matcher = /TODO ?: ?(.*)|FIXME ?: ?(.*)/gi;
          todoFinder = /TODO ?: ?(.*)/i;
          fixmeFinder = /FIXME ?: ?(.*)/i;
          todos = [];
          if (ebuffer.cachedText) {
            if (ebuffer.cachedText.match(matcher)) {
              _ref1 = ebuffer.cachedText.match(matcher);
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                match = _ref1[_i];
                if (todoFinder.exec(match)) {
                  todos.push({
                    message: todoFinder.exec(match)[1],
                    type: 'TODO'
                  });
                } else {
                  todos.push({
                    message: fixmeFinder.exec(match)[1],
                    type: 'FIXME'
                  });
                }
              }
              this.setItems(todos);
            } else {
              this.setItems([
                {
                  message: 'No Tasks Found',
                  type: ''
                }
              ]);
            }
          } else {
            this.setItems([
              {
                message: 'No Tasks Found',
                type: ''
              }
            ]);
          }
          atom.workspaceView.append(this);
          return this.focusFilterEditor();
        }
      }
    };

    TaskListView.prototype.viewForItem = function(item) {
      var markerClass;
      if (item.type === 'TODO') {
        markerClass = 'task-status status text-success';
      } else if (item.type === 'FIXME') {
        markerClass = 'task-status status text-error';
      } else {
        markerClass = 'task-status status text-error';
      }
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            _this.div({
              "class": 'pull-right'
            }, function() {
              return _this.div({
                "class": markerClass
              }, item.type);
            });
            return _this.div({
              "class": 'task-item'
            }, item.message);
          };
        })(this));
      });
    };

    TaskListView.prototype.confirmed = function(item) {
      var bufferP, ebuffer, editor, itemIndex;
      editor = atom.workspaceView.getActivePaneItem();
      ebuffer = editor.buffer;
      if (item !== "No Tasks Found") {
        itemIndex = ebuffer.cachedText.indexOf(item.message);
        bufferP = ebuffer.positionForCharacterIndex(itemIndex);
        editor.setCursorBufferPosition(bufferP);
      }
      return this.cancel();
    };

    TaskListView.prototype.toggle = function() {
      if (this.hasParent()) {
        return this.cancel();
      } else {
        return this.attach();
      }
    };

    return TaskListView;

  })(SelectListView);

}).call(this);
