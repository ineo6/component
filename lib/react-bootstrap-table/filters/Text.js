'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Const = require('../Const');

var _Const2 = _interopRequireDefault(_Const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextFilter = function (_React$Component) {
	_inherits(TextFilter, _React$Component);

	function TextFilter(props) {
		_classCallCheck(this, TextFilter);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextFilter).call(this, props));

		_this.filter = _this.filter.bind(_this);
		_this.timeout = null;
		return _this;
	}

	_createClass(TextFilter, [{
		key: 'filter',
		value: function filter(event) {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			var self = this;
			var filterValue = event.target.value;
			this.timeout = setTimeout(function () {
				self.props.filterHandler(filterValue, _Const2.default.FILTER_TYPE.TEXT);
			}, self.props.delay);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.refs.inputText.defaultValue) {
				this.props.filterHandler(this.refs.inputText.defaultValue, _Const2.default.FILTER_TYPE.TEXT);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearTimeout(this.timeout);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('input', { ref: 'inputText',
				className: 'filter text-filter form-control',
				type: 'text',
				onChange: this.filter,
				placeholder: this.props.placeholder || 'Enter ' + this.props.columnName + '...',
				defaultValue: this.props.defaultValue ? this.props.defaultValue : "" });
		}
	}]);

	return TextFilter;
}(_react2.default.Component);

;

TextFilter.propTypes = {
	filterHandler: _react2.default.PropTypes.func.isRequired,
	defaultValue: _react2.default.PropTypes.string,
	delay: _react2.default.PropTypes.number,
	placeholder: _react2.default.PropTypes.string,
	columnName: _react2.default.PropTypes.string
};

TextFilter.defaultProps = {
	delay: _Const2.default.FILTER_DELAY
};

exports.default = TextFilter;