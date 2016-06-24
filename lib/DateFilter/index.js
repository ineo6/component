'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonGroup = _antd.Button.Group;
var InputGroup = _antd.Input.Group;

var FilterType = {
    YEAR: 'MM',
    MONTH: 'dd',
    DAY: 'HH',
    ALL: 'yyyy'
};

var DateFilter = function (_Component) {
    _inherits(DateFilter, _Component);

    function DateFilter(props) {
        _classCallCheck(this, DateFilter);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateFilter).call(this, props));

        var _this$props = _this.props;
        var defaultType = _this$props.defaultType;
        var defaultValue = _this$props.defaultValue;
        var disabledAllBtn = _this$props.disabledAllBtn;

        var _this$getPreNextDisab = _this.getPreNextDisabled(defaultType, defaultValue);

        var preDisabled = _this$getPreNextDisab.preDisabled;
        var nextDisabled = _this$getPreNextDisab.nextDisabled;


        _this.state = {
            type: defaultType,
            value: new Date(defaultValue),
            preDisabled: preDisabled,
            nextDisabled: nextDisabled,
            disabledAllBtn: disabledAllBtn
        };
        return _this;
    }

    _createClass(DateFilter, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var disabledAllBtn = nextProps.disabledAllBtn;

            if (disabledAllBtn !== this.props.disabledAllBtn) {
                this.setState({ disabledAllBtn: disabledAllBtn });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var style = _props.style;
            var hasDay = _props.hasDay;
            var _state = this.state;
            var preDisabled = _state.preDisabled;
            var nextDisabled = _state.nextDisabled;
            var disabledAllBtn = _state.disabledAllBtn;


            var formatValue = this.getFormatValue();

            var _getBtnType = this.getBtnType();

            var dayBtnType = _getBtnType.dayBtnType;
            var monthBtnType = _getBtnType.monthBtnType;
            var yearBtnType = _getBtnType.yearBtnType;
            var allBtnType = _getBtnType.allBtnType;


            return _react2.default.createElement(
                'div',
                { className: 'ant-search-input-wrapper', style: style },
                _react2.default.createElement(
                    InputGroup,
                    { className: 'ant-search-input', style: { display: 'flex' } },
                    _react2.default.createElement(_antd.Input, { readOnly: 'readonly', value: formatValue,
                        style: { borderTopRightRadius: '0', borderBottomRightRadius: '0' } }),
                    _react2.default.createElement(
                        ButtonGroup,
                        { className: 'ant-input-group-wrap', style: { display: 'flex' } },
                        _react2.default.createElement(
                            _antd.Button,
                            { onClick: this.onPreClick.bind(this), disabled: disabledAllBtn || preDisabled,
                                style: { borderTopLeftRadius: '0', borderBottomLeftRadius: '0' } },
                            '<<<'
                        ),
                        hasDay ? _react2.default.createElement(
                            _antd.Button,
                            { onClick: this.onDayClick.bind(this), disabled: disabledAllBtn,
                                type: dayBtnType },
                            '日'
                        ) : null,
                        _react2.default.createElement(
                            _antd.Button,
                            { onClick: this.onMonthClick.bind(this), disabled: disabledAllBtn,
                                type: monthBtnType },
                            '月'
                        ),
                        _react2.default.createElement(
                            _antd.Button,
                            { onClick: this.onYearClick.bind(this), disabled: disabledAllBtn,
                                type: yearBtnType },
                            '年'
                        ),
                        _react2.default.createElement(
                            _antd.Button,
                            { onClick: this.onAllClick.bind(this), disabled: disabledAllBtn, type: allBtnType },
                            '所有'
                        ),
                        _react2.default.createElement(
                            _antd.Button,
                            { onClick: this.onNextClick.bind(this),
                                disabled: disabledAllBtn || nextDisabled },
                            '>>>'
                        )
                    )
                )
            );
        }
    }, {
        key: 'getBtnType',
        value: function getBtnType() {

            var result = {
                dayBtnType: '',
                monthBtnType: '',
                yearBtnType: '',
                allBtnType: ''
            };

            var type = this.state.type;
            var YEAR = FilterType.YEAR;
            var MONTH = FilterType.MONTH;
            var DAY = FilterType.DAY;
            var ALL = FilterType.ALL;


            switch (type) {
                case YEAR:
                    result.yearBtnType = 'primary';
                    break;
                case MONTH:
                    result.monthBtnType = 'primary';
                    break;
                case DAY:
                    result.dayBtnType = "primary";
                    break;
                case ALL:
                    result.allBtnType = 'primary';
                    break;
            }

            return result;
        }
    }, {
        key: 'getFormatValue',
        value: function getFormatValue() {
            var _state2 = this.state;
            var type = _state2.type;
            var value = _state2.value;
            var YEAR = FilterType.YEAR;
            var MONTH = FilterType.MONTH;
            var DAY = FilterType.DAY;
            var ALL = FilterType.ALL;


            var result = void 0;

            switch (type) {
                case YEAR:
                    result = value.getFullYear() + '年';
                    break;
                case MONTH:
                    result = value.getFullYear() + '年' + (value.getMonth() + 1) + '月';
                    break;
                case DAY:
                    result = value.getFullYear() + '年' + (value.getMonth() + 1) + '月' + value.getDate() + '日';
                    break;
                case ALL:
                default:
                    result = '历年';
                    break;
            }

            return result;
        }
    }, {
        key: 'onPreClick',
        value: function onPreClick() {
            var _state3 = this.state;
            var type = _state3.type;
            var value = _state3.value;
            var YEAR = FilterType.YEAR;
            var MONTH = FilterType.MONTH;
            var DAY = FilterType.DAY;
            var ALL = FilterType.ALL;


            switch (type) {
                case YEAR:
                    value.setFullYear(value.getFullYear() - 1);
                    break;
                case MONTH:
                    value.setFullYear(value.getFullYear(), value.getMonth() - 1);
                    break;
                case DAY:
                    value.setFullYear(value.getFullYear(), value.getMonth(), value.getDate() - 1);
                    break;
                case ALL:
                default:
                    return;
            }

            this.setState({ value: value }, this.didAfterChange);
        }
    }, {
        key: 'onDayClick',
        value: function onDayClick() {

            this.setState({ type: FilterType.DAY, value: new Date() }, this.didAfterChange);
        }
    }, {
        key: 'onMonthClick',
        value: function onMonthClick() {

            this.setState({ type: FilterType.MONTH, value: new Date() }, this.didAfterChange);
        }
    }, {
        key: 'onYearClick',
        value: function onYearClick() {

            this.setState({ type: FilterType.YEAR, value: new Date() }, this.didAfterChange);
        }
    }, {
        key: 'onAllClick',
        value: function onAllClick() {

            this.setState({ type: FilterType.ALL }, this.didAfterChange);
        }
    }, {
        key: 'onNextClick',
        value: function onNextClick() {
            var _state4 = this.state;
            var type = _state4.type;
            var value = _state4.value;
            var YEAR = FilterType.YEAR;
            var MONTH = FilterType.MONTH;
            var DAY = FilterType.DAY;
            var ALL = FilterType.ALL;
            var _props2 = this.props;
            var maxYear = _props2.maxYear;
            var maxMonth = _props2.maxMonth;
            var maxDay = _props2.maxDay;


            switch (type) {
                case YEAR:
                    if (value.getFullYear() == maxYear) {
                        return;
                    }
                    value.setFullYear(value.getFullYear() + 1);
                    break;
                case MONTH:
                    if (value.getFullYear() == maxYear && value.getMonth() == maxMonth - 1) {
                        return;
                    }
                    value.setFullYear(value.getFullYear(), value.getMonth() + 1);
                    break;
                case DAY:
                    if (value.getFullYear() == maxYear && value.getMonth() == maxMonth - 1 && value.getDate() == maxDay) {
                        return;
                    }
                    value.setFullYear(value.getFullYear(), value.getMonth(), value.getDate() + 1);
                    break;
                case ALL:
                default:
                    return;
            }

            this.setState({ value: value }, this.didAfterChange);
        }
    }, {
        key: 'didAfterChange',
        value: function didAfterChange() {
            var _state5 = this.state;
            var type = _state5.type;
            var value = _state5.value;

            var _getPreNextDisabled = this.getPreNextDisabled(type, value);

            var preDisabled = _getPreNextDisabled.preDisabled;
            var nextDisabled = _getPreNextDisabled.nextDisabled;


            this.setState({
                preDisabled: preDisabled,
                nextDisabled: nextDisabled
            }, this.fireOnChange);
        }
    }, {
        key: 'getPreNextDisabled',
        value: function getPreNextDisabled(type, value) {
            var YEAR = FilterType.YEAR;
            var MONTH = FilterType.MONTH;
            var DAY = FilterType.DAY;
            var ALL = FilterType.ALL;
            var _props3 = this.props;
            var maxYear = _props3.maxYear;
            var maxMonth = _props3.maxMonth;
            var maxDay = _props3.maxDay;


            var preDisabled = false,
                nextDisabled = false;

            switch (type) {
                case YEAR:
                    if (value.getFullYear() == maxYear) {
                        nextDisabled = true;
                    }
                    break;
                case MONTH:
                    if (value.getFullYear() == maxYear && value.getMonth() == maxMonth - 1) {
                        nextDisabled = true;
                    }
                    break;
                case DAY:
                    if (value.getFullYear() == maxYear && value.getMonth() == maxMonth - 1 && value.getDate() == maxDay) {
                        nextDisabled = true;
                    }
                    break;
                case ALL:
                    preDisabled = true;
                    nextDisabled = true;
                    break;
                default:
                    break;
            }

            return { preDisabled: preDisabled, nextDisabled: nextDisabled };
        }
    }, {
        key: 'fireOnChange',
        value: function fireOnChange() {
            var _state6 = this.state;
            var value = _state6.value;
            var type = _state6.type;


            this.props.onChange && this.props.onChange(value, type);
        }
    }, {
        key: 'getCurrentInfo',
        value: function getCurrentInfo() {
            var _state7 = this.state;
            var type = _state7.type;
            var value = _state7.value;


            return { type: type, value: value };
        }
    }]);

    return DateFilter;
}(_react.Component);

DateFilter.FilterType = FilterType;
DateFilter.defaultProps = {
    defaultType: FilterType.MONTH,
    defaultValue: new Date(),
    maxYear: new Date().getFullYear(),
    maxMonth: new Date().getMonth() + 1,
    maxDay: new Date().getDate(),
    disabledAllBtn: false,
    hasDay: false
};
exports.default = DateFilter;