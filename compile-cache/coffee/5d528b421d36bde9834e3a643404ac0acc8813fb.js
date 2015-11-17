(function() {
  var VimNormalModeInputElement,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  VimNormalModeInputElement = (function(_super) {
    __extends(VimNormalModeInputElement, _super);

    function VimNormalModeInputElement() {
      return VimNormalModeInputElement.__super__.constructor.apply(this, arguments);
    }

    VimNormalModeInputElement.prototype.createdCallback = function() {
      this.className = "normal-mode-input";
      this.editorContainer = document.createElement("div");
      this.editorContainer.className = "editor-container";
      return this.appendChild(this.editorContainer);
    };

    VimNormalModeInputElement.prototype.initialize = function(viewModel, opts) {
      var _ref;
      this.viewModel = viewModel;
      if (opts == null) {
        opts = {};
      }
      if (opts["class"] != null) {
        this.editorContainer.classList.add(opts["class"]);
      }
      if (opts.hidden) {
        this.editorContainer.style.height = "0px";
      }
      this.editorElement = document.createElement("atom-text-editor");
      this.editorElement.classList.add('editor');
      this.editorElement.getModel().setMini(true);
      this.editorElement.setAttribute('mini', '');
      this.editorContainer.appendChild(this.editorElement);
      this.singleChar = opts.singleChar;
      this.defaultText = (_ref = opts.defaultText) != null ? _ref : '';
      this.panel = atom.workspace.addBottomPanel({
        item: this,
        priority: 100
      });
      this.focus();
      this.handleEvents();
      return this;
    };

    VimNormalModeInputElement.prototype.handleEvents = function() {
      if (this.singleChar != null) {
        this.editorElement.getModel().getBuffer().onDidChange((function(_this) {
          return function(e) {
            if (e.newText) {
              return _this.confirm();
            }
          };
        })(this));
      } else {
        atom.commands.add(this.editorElement, 'editor:newline', this.confirm.bind(this));
      }
      atom.commands.add(this.editorElement, 'core:confirm', this.confirm.bind(this));
      atom.commands.add(this.editorElement, 'core:cancel', this.cancel.bind(this));
      return atom.commands.add(this.editorElement, 'blur', this.cancel.bind(this));
    };

    VimNormalModeInputElement.prototype.confirm = function() {
      this.value = this.editorElement.getModel().getText() || this.defaultText;
      this.viewModel.confirm(this);
      return this.removePanel();
    };

    VimNormalModeInputElement.prototype.focus = function() {
      return this.editorElement.focus();
    };

    VimNormalModeInputElement.prototype.cancel = function(e) {
      this.viewModel.cancel(this);
      return this.removePanel();
    };

    VimNormalModeInputElement.prototype.removePanel = function() {
      atom.workspace.getActivePane().activate();
      return this.panel.destroy();
    };

    return VimNormalModeInputElement;

  })(HTMLDivElement);

  module.exports = document.registerElement("vim-normal-mode-input", {
    "extends": "div",
    prototype: VimNormalModeInputElement.prototype
  });

}).call(this);