/**
 * Created by ruiy on 10/22/15.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _antd = require('antd');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;

var FunctionButtons = _react2.default.createClass({
    displayName: 'FunctionButtons',

    propTypes: {
        multi: _react2.default.PropTypes.bool,
        functions: _react2.default.PropTypes.array
    },
    getDefaultProps: function getDefaultProps() {
        return {
            multi: false
        };
    },
    mixins: [_reactRouter.Navigation, _reactRouter.State],
    getInitialState: function getInitialState() {
        var defaultMenu = "";

        if (this.props.multi && this.props.functions.length > 0) {
            defaultMenu = this.props.functions[0].code;
        }

        return {
            menu: defaultMenu
        };
    },
    getCurrentRouteBelong: function getCurrentRouteBelong() {
        var routes = this.getRoutes(),
            currentMenuName = [];

        //当前路径
        if (routes && routes.length > 0) currentMenuName = routes[routes.length - 1].name.split('-');

        return currentMenuName ? currentMenuName[1] : "";
    },
    renderMultiItem: function renderMultiItem() {
        var _this = this;

        var currentMenu = [];

        this.props.functions.forEach(function (item) {

            //不从state,根据url地址判断
            if (item.code == _this.getCurrentRouteBelong()) {
                currentMenu = item.children;
                return false;
            }
        });

        return currentMenu;
    },
    getMenuList: function getMenuList() {
        var buttons = this.props.functions;
        if (this.props.multi) {
            buttons = this.renderMultiItem();
        }

        buttons = buttons.map(function (btn, index) {
            return _react2.default.createElement(
                _reactRouter.Link,
                _extends({ key: btn.name,
                    className: 'link-button',
                    to: btn.func, params: {} }, btn.others),
                btn.name
            );
        });

        return buttons;
    },
    handleMenuChange: function handleMenuChange(value, option) {
        this.setState({ menu: value });
        this.transitionTo(option.extra.func);
    },
    render: function render() {

        var moduleSelect = null;

        if (this.props.multi) {
            moduleSelect = _react2.default.createElement(ModuleSelect, { menu: this.getCurrentRouteBelong(),
                menuList: this.props.functions,
                onChange: this.handleMenuChange });
        }

        return _react2.default.createElement(
            'div',
            { className: 'func-btns' },
            moduleSelect,
            this.getMenuList()
        );
    }
});

var ModuleSelect = _react2.default.createClass({
    displayName: 'ModuleSelect',
    renderMenuDict: function renderMenuDict() {
        var firstLink = null;
        return this.props.menuList.map(function (item) {
            firstLink = item.children && item.children[0];
            return _react2.default.createElement(
                Option,
                { key: item.code, value: item.code,
                    extra: firstLink },
                item.name
            );
        });
    },
    handleTypeChange: function handleTypeChange(value, option) {
        this.props.onChange(value, option);
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            { className: 'module-select' },
            _react2.default.createElement(
                _antd.Select,
                {
                    value: this.props.menu,
                    style: { width: "100%", marginBottom: "0.5rem", textAlign: "left" },
                    size: 'large',
                    onChange: this.handleTypeChange },
                this.renderMenuDict()
            )
        );
    }
});

exports.default = FunctionButtons;