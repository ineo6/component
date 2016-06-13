'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFa = require('react-fa');

var _reactFa2 = _interopRequireDefault(_reactFa);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

require('./style.css');

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TabPane = _antd.Tabs.TabPane; /**
                                   * Created by neo on 15/10/30.
                                   */


var customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        border: 'none',
        outline: 'none',
        padding: '0px',
        minWidth: '700px',
        transform: 'translate(-50%,-50%)'
    }
};

var PanelModal = _react2.default.createClass({
    displayName: 'PanelModal',
    whichStyle: function whichStyle() {
        if (this.props.customStyles) return this.props.customStyles;else return customStyles;
    },

    getDefaultProps: function getDefaultProps() {
        return {
            tabs: []
        };
    },

    onTabChangeHandler: function onTabChangeHandler(key) {

        this.props.onTabChange && this.props.onTabChange(key);
    },
    renderTabs: function renderTabs(tabs) {
        if (!tabs || !_.isArray(tabs) || tabs.length == 0) {
            return null;
        }

        var tabEles = [];

        tabs.forEach(function (val, index) {
            return tabEles.push(_react2.default.createElement(
                TabPane,
                { tab: val.title, key: 'tab' + index,
                    disabled: val.disabled ? true : false },
                val.content || ''
            ));
        });

        var result = _react2.default.createElement(
            _antd.Tabs,
            { onChange: this.onTabChangeHandler, type: 'card' },
            tabEles
        );

        return result;
    },
    renderChildren: function renderChildren(isNeed) {

        var result = '';

        if (isNeed) {
            result = this.props.children;
        }

        return result;
    },
    render: function render() {
        var tabs = this.props.tabs;

        return _react2.default.createElement(
            _reactModal2.default,
            {
                isOpen: this.props.isOpen,
                onRequestClose: this.props.closeModal,
                style: this.whichStyle() },
            _react2.default.createElement(
                'div',
                { className: 'tab-modal' },
                _react2.default.createElement(
                    'div',
                    { className: 'tab-cm-modal-content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'card-container' },
                        _react2.default.createElement(
                            'a',
                            { onClick: this.props.closeModal, className: 'tab-modal-close' },
                            _react2.default.createElement(_reactFa2.default, { name: 'times' })
                        ),
                        this.renderTabs(tabs)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'tab-cm-modal-body', id: this.props.id },
                        this.renderChildren(!tabs || !_.isArray(tabs) || tabs.length == 0)
                    )
                )
            )
        );
    }
});

exports.default = PanelModal;