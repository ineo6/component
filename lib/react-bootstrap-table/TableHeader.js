'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SelectRowHeaderColumn = require('./SelectRowHeaderColumn');

var _SelectRowHeaderColumn2 = _interopRequireDefault(_SelectRowHeaderColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_React$Component) {
  _inherits(Checkbox, _React$Component);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).apply(this, arguments));
  }

  _createClass(Checkbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.update(this.props.checked);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.update(props.checked);
    }
  }, {
    key: 'update',
    value: function update(checked) {
      _reactDom2.default.findDOMNode(this).indeterminate = checked === 'indeterminate';
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', { className: 'react-bs-select-all', type: 'checkbox', checked: this.props.checked, onChange: this.props.onChange });
    }
  }]);

  return Checkbox;
}(_react2.default.Component);

var TableHeader = function (_React$Component2) {
  _inherits(TableHeader, _React$Component2);

  function TableHeader(props) {
    _classCallCheck(this, TableHeader);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(TableHeader).call(this, props));

    _this2.selectRowColumnWidth = null;
    return _this2;
  }

  _createClass(TableHeader, [{
    key: 'render',
    value: function render() {
      var containerClasses = (0, _classnames2.default)("table-header");
      var tableClasses = (0, _classnames2.default)("table", "table-hover", {
        "table-bordered": this.props.bordered,
        "table-condensed": this.props.condensed
      });
      var selectRowHeaderCol = this.props.hideSelectColumn ? null : this.renderSelectRowHeader();
      this._attachClearSortCaretFunc();

      return _react2.default.createElement(
        'div',
        { className: 'table-header-wrapper' },
        _react2.default.createElement(
          'div',
          { ref: 'container', className: containerClasses },
          _react2.default.createElement(
            'table',
            { className: tableClasses },
            _react2.default.createElement(
              'thead',
              null,
              _react2.default.createElement(
                'tr',
                { ref: 'header' },
                selectRowHeaderCol,
                this.props.children
              )
            )
          )
        )
      );
    }
  }, {
    key: 'renderSelectRowHeader',
    value: function renderSelectRowHeader() {
      if (this.props.rowSelectType == _Const2.default.ROW_SELECT_SINGLE) {
        return _react2.default.createElement(_SelectRowHeaderColumn2.default, { width: this.selectRowColumnWidth });
      } else if (this.props.rowSelectType == _Const2.default.ROW_SELECT_MULTI) {
        return _react2.default.createElement(
          _SelectRowHeaderColumn2.default,
          { width: this.selectRowColumnWidth },
          _react2.default.createElement(Checkbox, { onChange: this.props.onSelectAllRow, checked: this.props.isSelectAll })
        );
      } else {
        return null;
      }
    }
  }, {
    key: '_attachClearSortCaretFunc',
    value: function _attachClearSortCaretFunc() {
      if (Array.isArray(this.props.children)) {
        for (var i = 0; i < this.props.children.length; i++) {
          var field = this.props.children[i].props.dataField;
          var sort = field === this.props.sortName ? this.props.sortOrder : undefined;
          this.props.children[i] = _react2.default.cloneElement(this.props.children[i], { key: i, onSort: this.props.onSort, sort: sort });
        }
      } else {
        var _field = this.props.children.props.dataField;
        var _sort = _field === this.props.sortName ? this.props.sortOrder : undefined;
        this.props.children = _react2.default.cloneElement(this.props.children, { key: 0, onSort: this.props.onSort, sort: _sort });
      }
    }
  }, {
    key: 'fitHeader',
    value: function fitHeader(headerProps, isVerticalScrollBar) {
      if (Array.isArray(this.props.children)) {
        var startPosition = (this.props.rowSelectType == _Const2.default.ROW_SELECT_SINGLE || this.props.rowSelectType == _Const2.default.ROW_SELECT_MULTI) && !this.props.hideSelectColumn ? 1 : 0;
        if (startPosition == 1) this.selectRowColumnWidth = headerProps[0].width;
        for (var i = 0; i < this.props.children.length; i++) {
          this.props.children[i] = _react2.default.cloneElement(this.props.children[i], { width: headerProps[i + startPosition].width + "px" });
        }
      } else {
        this.props.children = _react2.default.cloneElement(this.props.children, { width: headerProps[0].width + "px" });
      }
      if (this.props.condensed && !this.props.isFiltered) {
        this.refs.container.style.height = "36px";
      }
      this.forceUpdate();
      if (isVerticalScrollBar) this.refs.container.style.marginRight = _util2.default.getScrollBarWidth() + "px";
    }
  }]);

  return TableHeader;
}(_react2.default.Component);

TableHeader.propTypes = {
  rowSelectType: _react2.default.PropTypes.string,
  onSort: _react2.default.PropTypes.func,
  onSelectAllRow: _react2.default.PropTypes.func,
  sortName: _react2.default.PropTypes.string,
  sortOrder: _react2.default.PropTypes.string,
  hideSelectColumn: _react2.default.PropTypes.bool,
  bordered: _react2.default.PropTypes.bool,
  condensed: _react2.default.PropTypes.bool,
  isFiltered: _react2.default.PropTypes.bool,
  isSelectAll: _react2.default.PropTypes.oneOf([true, 'indeterminate', false])
};

TableHeader.defaultProps = {};
exports.default = TableHeader;