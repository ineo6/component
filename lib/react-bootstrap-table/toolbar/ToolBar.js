'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Const = require('../Const');

var _Const2 = _interopRequireDefault(_Const);

var _Editor = require('../Editor');

var _Editor2 = _interopRequireDefault(_Editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import Notifier from '../Notification.js';

var ToolBar = function (_Component) {
  _inherits(ToolBar, _Component);

  function ToolBar(props) {
    var _arguments = arguments;

    _classCallCheck(this, ToolBar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ToolBar).call(this, props));

    _this.handleSaveBtnClick = function () {
      var newObj = _this.checkAndParseForm();
      if (!newObj) {
        // validate errors
        return;
      }
      var msg = _this.props.onAddRow(newObj);
      if (msg) {
        // this.refs.notifier.notice('error', msg, 'Pressed ESC can cancel');
        _this.clearTimeout();
        // shake form and hack prevent modal hide
        _this.setState({
          shakeEditor: true,
          validateState: 'this is hack for prevent bootstrap modal hide'
        });
        // clear animate class
        _this.timeouteClear = setTimeout(function () {
          _this.setState({ shakeEditor: false });
        }, 300);
      } else {
        // reset state and hide modal hide
        _this.setState({
          validateState: null,
          shakeEditor: false
        }, function () {
          document.querySelector('.modal-backdrop').click();
          document.querySelector('.' + _this.modalClassName).click();
        });
        // reset form
        _this.refs.form.reset();
      }
    };

    _this.handleShowOnlyToggle = function () {
      _this.setState({
        showSelected: !_this.state.showSelected
      });
      _this.props.onShowOnlySelected();
    };

    _this.handleDropRowBtnClick = function () {
      _this.props.onDropRow();
    };

    _this.handleDebounce = function (func, wait, immediate) {
      var timeout = void 0;

      return function () {
        var later = function later() {
          timeout = null;

          if (!immediate) {
            func.apply(_this, _arguments);
          }
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait || 0);

        if (callNow) {
          func.appy(_this, _arguments);
        }
      };
    };

    _this.handleKeyUp = function (event) {
      event.persist();
      _this.debounceCallback(event);
    };

    _this.handleExportCSV = function () {
      _this.props.onExportCSV();
    };

    _this.handleClearBtnClick = function () {
      _this.refs.seachInput.value = '';
      _this.props.onSearch('');
    };

    _this.timeouteClear = 0;
    _this.modalClassName;
    _this.state = {
      isInsertRowTrigger: true,
      validateState: null,
      shakeEditor: false,
      showSelected: false
    };
    return _this;
  }

  _createClass(ToolBar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var delay = this.props.searchDelayTime ? this.props.searchDelayTime : 0;
      this.debounceCallback = this.handleDebounce(function () {
        _this2.props.onSearch(_this2.refs.seachInput.value);
      }, delay);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearTimeout();
    }
  }, {
    key: 'clearTimeout',
    value: function (_clearTimeout) {
      function clearTimeout() {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function () {
      if (this.timeouteClear) {
        clearTimeout(this.timeouteClear);
        this.timeouteClear = 0;
      }
    })
  }, {
    key: 'checkAndParseForm',
    value: function checkAndParseForm() {
      var _this3 = this;

      var newObj = {};
      var validateState = {};
      var isValid = true;
      var tempValue = void 0;
      var tempMsg = void 0;

      this.props.columns.forEach(function (column, i) {
        if (column.autoValue) {
          // when you want same auto generate value and not allow edit, example ID field
          var time = new Date().getTime();
          tempValue = typeof column.autoValue === 'function' ? column.autoValue() : 'autovalue-' + time;
        } else if (column.hiddenOnInsert) {
          tempValue = '';
        } else {
          var dom = this.refs[column.field + i];
          tempValue = dom.value;

          if (column.editable && column.editable.type === 'checkbox') {
            var values = tempValue.split(':');
            tempValue = dom.checked ? values[0] : values[1];
          }

          if (column.editable && column.editable.validator) {
            // process validate
            tempMsg = column.editable.validator(tempValue);
            if (tempMsg !== true) {
              isValid = false;
              validateState[column.field] = tempMsg;
            }
          }
        }

        newObj[column.field] = tempValue;
      }, this);

      if (isValid) {
        return newObj;
      } else {
        this.clearTimeout();
        // show error in form and shake it
        this.setState({ validateState: validateState, shakeEditor: true });
        // notifier error
        // this.refs.notifier.notice(
        //   'error',
        //   'Form validate errors, please checking!',
        //   'Pressed ESC can cancel');
        // clear animate class
        this.timeouteClear = setTimeout(function () {
          _this3.setState({ shakeEditor: false });
        }, 300);
        return null;
      }
    }
  }, {
    key: 'handleCloseBtn',
    value: function handleCloseBtn() {
      this.refs.warning.style.display = 'none';
    }
  }, {
    key: 'render',
    value: function render() {
      this.modalClassName = 'bs-table-modal-sm' + ToolBar.modalSeq++;
      var insertBtn = null;
      var deleteBtn = null;
      var exportCSV = null;
      var showSelectedOnlyBtn = null;

      if (this.props.enableInsert) {
        insertBtn = _react2.default.createElement(
          'button',
          { type: 'button',
            className: 'btn btn-info react-bs-table-add-btn',
            'data-toggle': 'modal',
            'data-target': '.' + this.modalClassName },
          _react2.default.createElement('i', { className: 'glyphicon glyphicon-plus' }),
          ' ',
          this.props.insertText
        );
      }

      if (this.props.enableDelete) {
        deleteBtn = _react2.default.createElement(
          'button',
          { type: 'button',
            className: 'btn btn-warning react-bs-table-del-btn',
            'data-toggle': 'tooltip',
            'data-placement': 'right',
            title: 'Drop selected row',
            onClick: this.handleDropRowBtnClick },
          _react2.default.createElement('i', { className: 'glyphicon glyphicon-trash' }),
          ' ',
          this.props.deleteText
        );
      }

      if (this.props.enableShowOnlySelected) {
        showSelectedOnlyBtn = _react2.default.createElement(
          'button',
          { type: 'button',
            onClick: this.handleShowOnlyToggle,
            className: 'btn btn-primary',
            'data-toggle': 'button',
            'aria-pressed': 'false' },
          this.state.showSelected ? _Const2.default.SHOW_ALL : _Const2.default.SHOW_ONLY_SELECT
        );
      }

      if (this.props.enableExportCSV) {
        exportCSV = _react2.default.createElement(
          'button',
          { type: 'button',
            className: 'btn btn-success',
            onClick: this.handleExportCSV },
          _react2.default.createElement('i', { className: 'glyphicon glyphicon-export' }),
          this.props.exportCSVText
        );
      }

      var searchTextInput = this.renderSearchPanel();
      var modal = this.props.enableInsert ? this.renderInsertRowModal() : null;

      return _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-xs-12 col-sm-6 col-md-6 col-lg-8' },
          _react2.default.createElement(
            'div',
            { className: 'btn-group btn-group-sm', role: 'group' },
            exportCSV,
            insertBtn,
            deleteBtn,
            showSelectedOnlyBtn
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-12 col-sm-6 col-md-6 col-lg-4' },
          searchTextInput
        ),
        modal
      );
    }
  }, {
    key: 'renderSearchPanel',
    value: function renderSearchPanel() {
      if (this.props.enableSearch) {
        var classNames = 'form-group form-group-sm react-bs-table-search-form';
        var clearBtn = null;
        if (this.props.clearSearch) {
          clearBtn = _react2.default.createElement(
            'span',
            { className: 'input-group-btn' },
            _react2.default.createElement(
              'button',
              {
                className: 'btn btn-default',
                type: 'button',
                onClick: this.handleClearBtnClick },
              'Clear'
            )
          );
          classNames += ' input-group input-group-sm';
        }

        return _react2.default.createElement(
          'div',
          { className: classNames },
          _react2.default.createElement('input', { ref: 'seachInput',
            className: 'form-control',
            type: 'text',
            placeholder: this.props.searchPlaceholder ? this.props.searchPlaceholder : 'Search',
            onKeyUp: this.handleKeyUp }),
          clearBtn
        );
      } else {
        return null;
      }
    }
  }, {
    key: 'renderInsertRowModal',
    value: function renderInsertRowModal() {
      var _this4 = this;

      var validateState = this.state.validateState || {};
      var shakeEditor = this.state.shakeEditor;
      var inputField = this.props.columns.map(function (column, i) {
        var editable = column.editable;
        var format = column.format;
        var field = column.field;
        var name = column.name;
        var autoValue = column.autoValue;
        var hiddenOnInsert = column.hiddenOnInsert;

        var attr = {
          ref: field + i,
          placeholder: editable.placeholder ? editable.placeholder : name
        };

        if (autoValue || hiddenOnInsert) {
          // when you want same auto generate value
          // and not allow edit, for example ID field
          return null;
        }
        var error = validateState[field] ? _react2.default.createElement(
          'span',
          { className: 'help-block bg-danger' },
          validateState[field]
        ) : null;

        // let editor = Editor(editable,attr,format);
        // if(editor.props.type && editor.props.type == 'checkbox'){
        return _react2.default.createElement(
          'div',
          { className: 'form-group', key: field },
          _react2.default.createElement(
            'label',
            null,
            name
          ),
          (0, _Editor2.default)(editable, attr, format, '', undefined, _this4.props.ignoreEditable),
          error
        );
      });
      var modalClass = (0, _classnames2.default)('modal', 'fade', this.modalClassName, {
        // hack prevent bootstrap modal hide by reRender
        'in': shakeEditor || this.state.validateState
      });
      var dialogClass = (0, _classnames2.default)('modal-dialog', 'modal-sm', {
        'animated': shakeEditor,
        'shake': shakeEditor
      });
      return _react2.default.createElement(
        'div',
        { ref: 'modal', className: modalClass, tabIndex: '-1', role: 'dialog' },
        _react2.default.createElement(
          'div',
          { className: dialogClass },
          _react2.default.createElement(
            'div',
            { className: 'modal-content' },
            _react2.default.createElement(
              'div',
              { className: 'modal-header' },
              _react2.default.createElement(
                'button',
                { type: 'button',
                  className: 'close',
                  'data-dismiss': 'modal',
                  'aria-label': 'Close' },
                _react2.default.createElement(
                  'span',
                  { 'aria-hidden': 'true' },
                  '×'
                )
              ),
              _react2.default.createElement(
                'h4',
                { className: 'modal-title' },
                'New Record'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'modal-body' },
              _react2.default.createElement(
                'form',
                { ref: 'form' },
                inputField
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'modal-footer' },
              _react2.default.createElement(
                'button',
                { type: 'button',
                  className: 'btn btn-default',
                  'data-dismiss': 'modal' },
                this.props.closeText
              ),
              _react2.default.createElement(
                'button',
                { type: 'button',
                  className: 'btn btn-info',
                  onClick: this.handleSaveBtnClick },
                this.props.saveText
              )
            )
          )
        )
      );
    }
  }]);

  return ToolBar;
}(_react.Component);

ToolBar.modalSeq = 0;


ToolBar.propTypes = {
  onAddRow: _react.PropTypes.func,
  onDropRow: _react.PropTypes.func,
  onShowOnlySelected: _react.PropTypes.func,
  enableInsert: _react.PropTypes.bool,
  enableDelete: _react.PropTypes.bool,
  enableSearch: _react.PropTypes.bool,
  enableShowOnlySelected: _react.PropTypes.bool,
  columns: _react.PropTypes.array,
  searchPlaceholder: _react.PropTypes.string,
  exportCSVText: _react.PropTypes.string,
  insertText: _react.PropTypes.string,
  deleteText: _react.PropTypes.string,
  saveText: _react.PropTypes.string,
  closeText: _react.PropTypes.string,
  clearSearch: _react.PropTypes.bool,
  ignoreEditable: _react.PropTypes.bool
};

ToolBar.defaultProps = {
  enableInsert: false,
  enableDelete: false,
  enableSearch: false,
  enableShowOnlySelected: false,
  clearSearch: false,
  ignoreEditable: false,
  exportCSVText: _Const2.default.EXPORT_CSV_TEXT,
  insertText: _Const2.default.INSERT_BTN_TEXT,
  deleteText: _Const2.default.DELETE_BTN_TEXT,
  saveText: _Const2.default.SAVE_BTN_TEXT,
  closeText: _Const2.default.CLOSE_BTN_TEXT
};

exports.default = ToolBar;