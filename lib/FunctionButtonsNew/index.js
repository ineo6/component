/**
 * Created by ruiy on 10/22/15.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _antd = require('antd');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;

var FunctionButtonsNew = _react2.default.createClass({
    displayName: 'FunctionButtonsNew',

    contextTypes: {
        router: _react2.default.PropTypes.object.isRequired
    },
    propTypes: {
        multi: _react2.default.PropTypes.bool,
        functions: _react2.default.PropTypes.array
    },
    getDefaultProps: function getDefaultProps() {
        return {
            multi: false
        };
    },
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
    getOthers: function getOthers(btn) {
        var path = "",
            params = void 0,
            query = void 0;

        if (btn.others) {
            params = btn.others.params;
            query = btn.others.query;
        }

        if (params) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    if (params[key]) {
                        path = btn.path.replace(key, params[key]);
                    }
                }
            }
        } else path = btn.path;

        return { path: path, query: query };
    },
    getMenuList: function getMenuList() {
        var buttons = this.props.functions;
        if (this.props.multi) {
            buttons = this.renderMultiItem();
        }

        buttons = buttons.map(function (btn, index) {
            var _getOthers = this.getOthers(btn);

            var path = _getOthers.path;
            var query = _getOthers.query;


            return _react2.default.createElement(
                _reactRouter.Link,
                {
                    activeClassName: 'active',
                    key: btn.name,
                    className: 'link-button',
                    to: { pathname: path, query: query } },
                btn.name
            );
        }.bind(this));

        return buttons;
    },
    handleMenuChange: function handleMenuChange(value, option) {
        this.setState({ menu: value });
        this.context.router.push(option.extra.path);
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

exports.default = FunctionButtonsNew;