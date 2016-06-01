'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _Date = require('./filters/Date');

var _Date2 = _interopRequireDefault(_Date);

var _Text = require('./filters/Text');

var _Text2 = _interopRequireDefault(_Text);

var _Select = require('./filters/Select');

var _Select2 = _interopRequireDefault(_Select);

var _Number = require('./filters/Number');

var _Number2 = _interopRequireDefault(_Number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableHeaderColumn = function (_React$Component) {
  _inherits(TableHeaderColumn, _React$Component);

  function TableHeaderColumn(props) {
    _classCallCheck(this, TableHeaderColumn);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TableHeaderColumn).call(this, props));

    _this.handleFilter = _this.handleFilter.bind(_this);
    return _this;
  }

  _createClass(TableHeaderColumn, [{
    key: 'handleColumnClick',
    value: function handleColumnClick(e) {
      if (!this.props.dataSort) return;
      var order = this.props.sort == _Const2.default.SORT_DESC ? _Const2.default.SORT_ASC : _Const2.default.SORT_DESC;
      this.props.onSort(order, this.props.dataField);
    }
  }, {
    key: 'handleFilter',
    value: function handleFilter(value, type) {
      this.props.filter.emitter.handleFilter(this.props.dataField, value, type);
    }
  }, {
    key: 'getFilters',
    value: function getFilters() {
      switch (this.props.filter.type) {
        case _Const2.default.FILTER_TYPE.TEXT:
          {
            return _react2.default.createElement(_Text2.default, _extends({}, this.props.filter, { columnName: this.props.children, filterHandler: this.handleFilter }));
          }
        case _Const2.default.FILTER_TYPE.SELECT:
          {
            return _react2.default.createElement(_Select2.default, _extends({}, this.props.filter, { columnName: this.props.children, filterHandler: this.handleFilter }));
          }
        case _Const2.default.FILTER_TYPE.NUMBER:
          {
            return _react2.default.createElement(_Number2.default, _extends({}, this.props.filter, { columnName: this.props.children, filterHandler: this.handleFilter }));
          }
        case _Const2.default.FILTER_TYPE.DATE:
          {
            return _react2.default.createElement(_Date2.default, _extends({}, this.props.filter, { columnName: this.props.children, filterHandler: this.handleFilter }));
          }
        case _Const2.default.FILTER_TYPE.CUSTOM:
          {
            return this.props.filter.getElement(this.handleFilter, this.props.filter.customFilterParameters);
          }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs.innerDiv.setAttribute("data-field", this.props.dataField);
    }
  }, {
    key: 'render',
    value: function render() {
      var width = this.props.width !== null ? parseInt(this.props.width) : null;
      var thStyle = {
        textAlign: this.props.dataAlign,
        display: this.props.hidden ? "none" : null,
        width: width,
        maxWidth: width
      };

      var defaultCaret = !this.props.dataSort ? null : _react2.default.createElement(
        'span',
        { className: 'order' },
        _react2.default.createElement(
          'span',
          { className: 'dropdown' },
          _react2.default.createElement('span', { className: 'caret', style: { margin: '10px 0 10px 5px', color: '#ccc' } })
        ),
        _react2.default.createElement(
          'span',
          { className: 'dropup' },
          _react2.default.createElement('span', { className: 'caret', style: { margin: '10px 0', color: '#ccc' } })
        )
      );
      var sortCaret = this.props.sort ? _util2.default.renderReactSortCaret(this.props.sort) : defaultCaret;

      var classes = this.props.className + " " + (this.props.dataSort ? "sort-column" : "");
      return _react2.default.createElement(
        'th',
        { ref: 'header-col', className: classes, style: thStyle },
        _react2.default.createElement(
          'div',
          { ref: 'innerDiv', className: 'th-inner table-header-column',
            onClick: this.handleColumnClick.bind(this) },
          this.props.children,
          sortCaret
        ),
        this.props.filter ? this.getFilters() : null
      );
    }
  }]);

  return TableHeaderColumn;
}(_react2.default.Component);

var filterTypeArray = [];
for (var key in _Const2.default.FILTER_TYPE) {
  filterTypeArray.push(_Const2.default.FILTER_TYPE[key]);
}

TableHeaderColumn.propTypes = {
  dataField: _react2.default.PropTypes.string,
  dataAlign: _react2.default.PropTypes.string,
  dataSort: _react2.default.PropTypes.bool,
  onSort: _react2.default.PropTypes.func,
  dataFormat: _react2.default.PropTypes.func,
  isKey: _react2.default.PropTypes.bool,
  editable: _react2.default.PropTypes.any,
  hidden: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string,
  width: _react2.default.PropTypes.string,
  sortFunc: _react2.default.PropTypes.func,
  columnClassName: _react2.default.PropTypes.any,
  filterFormatted: _react2.default.PropTypes.bool,
  sort: _react2.default.PropTypes.string,
  formatExtraData: _react2.default.PropTypes.any,
  filter: _react2.default.PropTypes.shape({
    type: _react2.default.PropTypes.oneOf(filterTypeArray),
    delay: _react2.default.PropTypes.number,
    options: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, // for SelectFilter
    _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number) //for NumberFilter
    ]),
    numberComparators: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
    emitter: _react2.default.PropTypes.object,
    placeholder: _react2.default.PropTypes.string,
    getElement: _react2.default.PropTypes.func,
    customFilterParameters: _react2.default.PropTypes.object
  })
};

TableHeaderColumn.defaultProps = {
  dataAlign: "center",
  dataSort: true,
  dataFormat: undefined,
  isKey: false,
  editable: true,
  onSort: undefined,
  hidden: false,
  className: "",
  width: null,
  sortFunc: undefined,
  columnClassName: '',
  filterFormatted: false,
  sort: undefined,
  formatExtraData: undefined,
  filter: undefined
};

exports.default = TableHeaderColumn;