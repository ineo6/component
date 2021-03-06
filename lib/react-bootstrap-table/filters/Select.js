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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectFilter = function (_Component) {
  _inherits(SelectFilter, _Component);

  function SelectFilter(props) {
    _classCallCheck(this, SelectFilter);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectFilter).call(this, props));

    _this.filter = _this.filter.bind(_this);
    _this.state = {
      isPlaceholderSelected: _this.props.defaultValue === undefined || !_this.props.options.hasOwnProperty(_this.props.defaultValue)
    };
    return _this;
  }

  _createClass(SelectFilter, [{
    key: 'filter',
    value: function filter(event) {
      var value = event.target.value;

      this.setState({ isPlaceholderSelected: value === '' });
      this.props.filterHandler(value, _Const2.default.FILTER_TYPE.SELECT);
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      var optionTags = [];
      var _props = this.props;
      var options = _props.options;
      var placeholder = _props.placeholder;
      var columnName = _props.columnName;

      optionTags.push(_react2.default.createElement(
        'option',
        { key: '-1', value: '' },
        placeholder || 'Select ' + columnName + '...'
      ));
      Object.keys(options).map(function (key) {
        optionTags.push(_react2.default.createElement(
          'option',
          { key: key, value: key },
          options[key]
        ));
      });
      return optionTags;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var value = this.refs.selectInput.value;
      if (value) {
        this.props.filterHandler(value, _Const2.default.FILTER_TYPE.SELECT);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var selectClass = (0, _classnames2.default)('filter', 'select-filter', 'form-control', { 'placeholder-selected': this.state.isPlaceholderSelected });

      return _react2.default.createElement(
        'select',
        { ref: 'selectInput',
          className: selectClass,
          onChange: this.filter,
          defaultValue: this.props.defaultValue !== undefined ? this.props.defaultValue : '' },
        this.getOptions()
      );
    }
  }]);

  return SelectFilter;
}(_react.Component);

SelectFilter.propTypes = {
  filterHandler: _react.PropTypes.func.isRequired,
  options: _react.PropTypes.object.isRequired,
  placeholder: _react.PropTypes.string,
  columnName: _react.PropTypes.string
};

exports.default = SelectFilter;