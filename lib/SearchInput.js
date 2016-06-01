
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputGroup = _antd.Input.Group;

var SearchInput = _react2.default.createClass({
    displayName: 'SearchInput',
    getInitialState: function getInitialState() {
        return {
            value: '',
            focus: false
        };
    },
    handleInputChange: function handleInputChange(e) {
        this.setState({
            value: e.target.value
        });
    },
    handleFocusBlur: function handleFocusBlur(e) {
        this.setState({
            focus: e.target === document.activeElement
        });
    },
    handleSearch: function handleSearch() {
        if (this.props.onSearch) {
            this.props.onSearch(this.state.value);
        }
    },
    render: function render() {
        var btnCls = (0, _classnames2.default)({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim()
        });
        var searchCls = (0, _classnames2.default)({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus
        });
        return _react2.default.createElement(
            InputGroup,
            { className: searchCls, style: this.props.style },
            _react2.default.createElement(_antd.Input, _extends({}, this.props, { value: this.state.value, onChange: this.handleInputChange,
                onFocus: this.handleFocusBlur, onBlur: this.handleFocusBlur })),
            _react2.default.createElement(
                'div',
                { className: 'ant-input-group-wrap' },
                _react2.default.createElement(
                    _antd.Button,
                    { className: btnCls, size: this.props.size, onClick: this.handleSearch },
                    _react2.default.createElement(_antd.Icon, { type: 'search' })
                )
            )
        );
    }
});

exports.default = SearchInput;