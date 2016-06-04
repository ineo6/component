'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableFilter = function (_Component) {
  _inherits(TableFilter, _Component);

  function TableFilter(props) {
    _classCallCheck(this, TableFilter);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TableFilter).call(this, props));

    _this.handleKeyUp = function (e) {
      var _e$currentTarget = e.currentTarget;
      var value = _e$currentTarget.value;
      var name = _e$currentTarget.name;

      if (value.trim() === '') {
        delete _this.filterObj[name];
      } else {
        _this.filterObj[name] = value;
      }
      _this.props.onFilter(_this.filterObj);
    };

    _this.filterObj = {};
    return _this;
  }

  _createClass(TableFilter, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var striped = _props.striped;
      var condensed = _props.condensed;
      var rowSelectType = _props.rowSelectType;
      var columns = _props.columns;

      var tableClasses = (0, _classnames2.default)('table', {
        'table-striped': striped,
        'table-condensed': condensed
      });
      var selectRowHeader = null;

      if (rowSelectType === _Const2.default.ROW_SELECT_SINGLE || rowSelectType === _Const2.default.ROW_SELECT_MULTI) {
        var style = {
          width: 35,
          paddingLeft: 0,
          paddingRight: 0
        };
        selectRowHeader = _react2.default.createElement(
          'th',
          { style: style, key: -1 },
          'Filter'
        );
      }

      var filterField = columns.map(function (column) {
        var hidden = column.hidden;
        var width = column.width;
        var name = column.name;

        var thStyle = {
          display: hidden ? 'none' : null,
          width: width
        };
        return _react2.default.createElement(
          'th',
          { key: name, style: thStyle },
          _react2.default.createElement(
            'div',
            { className: 'th-inner table-header-column' },
            _react2.default.createElement('input', { size: '10', type: 'text',
              placeholder: name, name: name, onKeyUp: this.handleKeyUp })
          )
        );
      }, this);

      return _react2.default.createElement(
        'table',
        { className: tableClasses, style: { marginTop: 5 } },
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            { style: { borderBottomStyle: 'hidden' } },
            selectRowHeader,
            filterField
          )
        )
      );
    }
  }]);

  return TableFilter;
}(_react.Component);

TableFilter.propTypes = {
  columns: _react.PropTypes.array,
  rowSelectType: _react.PropTypes.string,
  onFilter: _react.PropTypes.func
};
exports.default = TableFilter;