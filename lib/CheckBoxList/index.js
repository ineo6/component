'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COM = function (_Component) {
    _inherits(COM, _Component);

    function COM(props) {
        _classCallCheck(this, COM);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(COM).call(this, props));

        _this.state = {
            data: _this.props.defaultData
        };

        return _this;
    }

    _createClass(COM, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {

            if (!_.eq(nextProps.defaultData, this.props.defaultData)) {

                this.setState({ data: nextProps.defaultData });
            }
        }
    }, {
        key: 'onCheckboxChange',
        value: function onCheckboxChange(index) {
            var data = this.state.data;


            data[index].checked = !data[index].checked;

            this.setState({ data: data });

            var selectedItems = this.getCheckedValues();

            this.props.onChange && this.props.onChange(selectedItems);
        }
    }, {
        key: 'getCheckedValues',
        value: function getCheckedValues() {
            var items = [];
            this.state.data.forEach(function (item) {
                if (item.checked) items[items.length] = item.value;
            });

            return items;
        }
    }, {
        key: 'checkAllToggle',
        value: function checkAllToggle() {
            var checkedItems = this.getCheckedValues();

            var data = this.state.data;


            if (checkedItems.length < data.length) {

                data.map(function (item) {
                    return item.checked = true;
                });
            } else {
                data.map(function (item) {
                    return item.checked = false;
                });
            }
            this.setState({ data: data });
        }
    }, {
        key: 'checkReverseToggle',
        value: function checkReverseToggle() {
            var data = this.state.data;


            data.map(function (item) {
                return item.checked = !item.checked;
            });

            this.setState({ data: data });
        }
    }, {
        key: 'onSelectedAllChange',
        value: function onSelectedAllChange() {
            this.checkAllToggle();

            var selectedItems = this.getCheckedValues();

            this.props.onChange && this.props.onChange(selectedItems);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var data = this.state.data;
            var _props = this.props;
            var disabled = _props.disabled;
            var className = _props.className;
            var skipSelectAll = _props.skipSelectAll;

            disabled = disabled || false;
            className = className || 'checkbox-list';

            var selectedAll = false;

            var allSeleted = this.getCheckedValues() || [];

            if (allSeleted.length == data.length) {
                selectedAll = true;
            }

            var options = data.map(function (item, index) {
                return _react2.default.createElement(
                    'div',
                    { key: 'chk-' + index, className: className },
                    _react2.default.createElement(
                        'label',
                        null,
                        _react2.default.createElement('input', {
                            disabled: disabled,
                            type: 'checkbox', value: item.value,
                            onChange: _this2.onCheckboxChange.bind(_this2, index),
                            checked: item.checked }),
                        _react2.default.createElement(
                            'span',
                            { disabled: disabled },
                            item.label
                        )
                    )
                );
            });

            if (!skipSelectAll && options && options.length) {
                options.push(_react2.default.createElement(
                    'div',
                    { key: 'chk-all', className: className },
                    _react2.default.createElement(
                        'label',
                        null,
                        _react2.default.createElement('input', {
                            disabled: false,
                            type: 'checkbox',
                            onChange: this.onSelectedAllChange.bind(this),
                            checked: selectedAll }),
                        _react2.default.createElement(
                            'span',
                            { disabled: false },
                            '全选'
                        )
                    )
                ));
            }

            return _react2.default.createElement(
                'div',
                { className: 'checkbox-list-group' },
                options
            );
        }
    }]);

    return COM;
}(_react.Component);

COM.propTypes = {
    defaultData: _react2.default.PropTypes.array,
    onChange: _react2.default.PropTypes.func,
    disabled: _react2.default.PropTypes.bool,
    className: _react2.default.PropTypes.string,
    skipSelectAll: _react2.default.PropTypes.bool
};

exports.default = COM;