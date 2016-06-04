'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableRow = function (_Component) {
  _inherits(TableRow, _Component);

  function TableRow(props) {
    _classCallCheck(this, TableRow);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TableRow).call(this, props));

    _this.rowClick = function (e) {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'TEXTAREA') {
        (function () {
          var rowIndex = e.currentTarget.rowIndex + 1;
          if (_this.props.selectRow) {
            if (_this.props.selectRow.clickToSelect) {
              _this.props.onSelectRow(rowIndex, !_this.props.isSelected, e);
            } else if (_this.props.selectRow.clickToSelectAndEditCell) {
              _this.clickNum++;
              /** if clickToSelectAndEditCell is enabled,
               *  there should be a delay to prevent a selection changed when
               *  user dblick to edit cell on same row but different cell
              **/
              setTimeout(function () {
                if (_this.clickNum === 1) {
                  _this.props.onSelectRow(rowIndex, !_this.props.isSelected, e);
                }
                _this.clickNum = 0;
              }, 200);
            }
          }
          if (_this.props.onRowClick) _this.props.onRowClick(rowIndex);
        })();
      }
    };

    _this.rowMouseOut = function (e) {
      if (_this.props.onRowMouseOut) {
        _this.props.onRowMouseOut(e.currentTarget.rowIndex, e);
      }
    };

    _this.rowMouseOver = function (e) {
      if (_this.props.onRowMouseOver) {
        _this.props.onRowMouseOver(e.currentTarget.rowIndex, e);
      }
    };

    _this.clickNum = 0;
    return _this;
  }

  _createClass(TableRow, [{
    key: 'render',
    value: function render() {
      this.clickNum = 0;
      var trCss = {
        style: {
          backgroundColor: this.props.isSelected ? this.props.selectRow.bgColor : null
        },
        className: (this.props.isSelected && this.props.selectRow.className ? this.props.selectRow.className : '') + (this.props.className || '')
      };

      if (this.props.selectRow && (this.props.selectRow.clickToSelect || this.props.selectRow.clickToSelectAndEditCell) || this.props.onRowClick) {
        return _react2.default.createElement(
          'tr',
          _extends({}, trCss, {
            onMouseOver: this.rowMouseOver,
            onMouseOut: this.rowMouseOut,
            onClick: this.rowClick }),
          this.props.children
        );
      } else {
        return _react2.default.createElement(
          'tr',
          trCss,
          this.props.children
        );
      }
    }
  }]);

  return TableRow;
}(_react.Component);

TableRow.propTypes = {
  isSelected: _react.PropTypes.bool,
  enableCellEdit: _react.PropTypes.bool,
  onRowClick: _react.PropTypes.func,
  onSelectRow: _react.PropTypes.func,
  onRowMouseOut: _react.PropTypes.func,
  onRowMouseOver: _react.PropTypes.func
};
TableRow.defaultProps = {
  onRowClick: undefined
};
exports.default = TableRow;