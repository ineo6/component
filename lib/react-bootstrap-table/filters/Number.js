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

var legalComparators = ["=", ">", ">=", "<", "<=", "!="];

var NumberFilter = function (_React$Component) {
    _inherits(NumberFilter, _React$Component);

    function NumberFilter(props) {
        _classCallCheck(this, NumberFilter);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NumberFilter).call(this, props));

        _this.numberComparators = _this.props.numberComparators || legalComparators;
        _this.timeout = null;
        _this.state = {
            isPlaceholderSelected: _this.props.defaultValue == undefined || _this.props.defaultValue.number == undefined || _this.props.options && _this.props.options.indexOf(_this.props.defaultValue.number) == -1
        };
        _this.onChangeNumber = _this.onChangeNumber.bind(_this);
        _this.onChangeNumberSet = _this.onChangeNumberSet.bind(_this);
        _this.onChangeComparator = _this.onChangeComparator.bind(_this);
        return _this;
    }

    _createClass(NumberFilter, [{
        key: 'onChangeNumber',
        value: function onChangeNumber(event) {
            if (this.refs.numberFilterComparator.value === "") {
                return;
            }
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            var self = this;
            var filterValue = event.target.value;
            this.timeout = setTimeout(function () {
                self.props.filterHandler({ number: filterValue, comparator: self.refs.numberFilterComparator.value }, _Const2.default.FILTER_TYPE.NUMBER);
            }, self.props.delay);
        }
    }, {
        key: 'onChangeNumberSet',
        value: function onChangeNumberSet(event) {
            this.setState({ isPlaceholderSelected: event.target.value === "" });
            if (this.refs.numberFilterComparator.value === "") {
                return;
            }
            this.props.filterHandler({ number: event.target.value, comparator: this.refs.numberFilterComparator.value }, _Const2.default.FILTER_TYPE.NUMBER);
        }
    }, {
        key: 'onChangeComparator',
        value: function onChangeComparator(event) {
            if (this.refs.numberFilter.value === "") {
                return;
            }
            this.props.filterHandler({ number: this.refs.numberFilter.value, comparator: event.target.value }, _Const2.default.FILTER_TYPE.NUMBER);
        }
    }, {
        key: 'getComparatorOptions',
        value: function getComparatorOptions() {
            var optionTags = [];
            optionTags.push(_react2.default.createElement('option', { key: '-1' }));
            for (var i = 0; i < this.numberComparators.length; i++) {
                optionTags.push(_react2.default.createElement(
                    'option',
                    { key: i, value: this.numberComparators[i] },
                    this.numberComparators[i]
                ));
            };
            return optionTags;
        }
    }, {
        key: 'getNumberOptions',
        value: function getNumberOptions() {
            var optionTags = [];
            var options = this.props.options;

            optionTags.push(_react2.default.createElement(
                'option',
                { key: '-1', value: '' },
                this.props.placeholder || 'Select ' + this.props.columnName + '...'
            ));
            for (var i = 0; i < options.length; i++) {
                optionTags.push(_react2.default.createElement(
                    'option',
                    { key: i, value: options[i] },
                    options[i]
                ));
            };
            return optionTags;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.refs.numberFilterComparator.value && this.refs.numberFilter.value) {
                this.props.filterHandler({ number: this.refs.numberFilter.value,
                    comparator: this.refs.numberFilterComparator.value }, _Const2.default.FILTER_TYPE.NUMBER);
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
            var selectClass = (0, _classnames2.default)("select-filter", "number-filter-input", "form-control", { "placeholder-selected": this.state.isPlaceholderSelected });

            return _react2.default.createElement(
                'div',
                { className: 'filter number-filter' },
                _react2.default.createElement(
                    'select',
                    { ref: 'numberFilterComparator',
                        className: 'number-filter-comparator form-control',
                        onChange: this.onChangeComparator,
                        defaultValue: this.props.defaultValue ? this.props.defaultValue.comparator : "" },
                    this.getComparatorOptions()
                ),
                this.props.options ? _react2.default.createElement(
                    'select',
                    { ref: 'numberFilter',
                        className: selectClass,
                        onChange: this.onChangeNumberSet,
                        defaultValue: this.props.defaultValue ? this.props.defaultValue.number : "" },
                    this.getNumberOptions()
                ) : _react2.default.createElement('input', { ref: 'numberFilter',
                    type: 'number',
                    className: 'number-filter-input form-control',
                    placeholder: this.props.placeholder || 'Enter ' + this.props.columnName + '...',
                    onChange: this.onChangeNumber,
                    defaultValue: this.props.defaultValue ? this.props.defaultValue.number : "" })
            );
        }
    }]);

    return NumberFilter;
}(_react2.default.Component);

;

NumberFilter.propTypes = {
    filterHandler: _react2.default.PropTypes.func.isRequired,
    options: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
    defaultValue: _react2.default.PropTypes.shape({
        number: _react2.default.PropTypes.number,
        comparator: _react2.default.PropTypes.oneOf(legalComparators)
    }),
    delay: _react2.default.PropTypes.number,
    numberComparators: function numberComparators(props, propName) {
        if (!props[propName]) {
            return;
        }
        for (var i = 0; i < props[propName].length; i++) {
            var comparatorIsValid = false;
            for (var j = 0; j < legalComparators.length; j++) {
                if (legalComparators[j] === props[propName][i]) {
                    comparatorIsValid = true;
                    break;
                }
            }
            if (!comparatorIsValid) {
                return new Error('Number comparator provided is not supported. Use only ' + legalComparators);
            }
        }
    },
    placeholder: _react2.default.PropTypes.string,
    columnName: _react2.default.PropTypes.string
};

NumberFilter.defaultProps = {
    delay: _Const2.default.FILTER_DELAY
};

exports.default = NumberFilter;