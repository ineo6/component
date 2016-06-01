'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFa = require('react-fa');

var _reactFa2 = _interopRequireDefault(_reactFa);

var _component = require('component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cStyles = {
    content: {
        top: '20%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -20%)',
        border: 'none',
        padding: 0,
        width: '700px'
    }
}; /**
    * Created by neo on 16/5/26.
    */

var HelpTips = _react2.default.createClass({
    displayName: 'HelpTips',
    getInitialState: function getInitialState() {
        return {
            open: false
        };
    },

    toggleModal: function toggleModal() {
        this.setState({ open: !this.state.open });
    },
    render: function render() {
        var _props = this.props;
        var title = _props.title;
        var children = _props.children;
        var className = _props.className;
        var customStyles = _props.customStyles;


        if (customStyles == undefined) customStyles = cStyles;

        return _react2.default.createElement(
            'div',
            { className: className },
            _react2.default.createElement(
                'a',
                { onClick: this.toggleModal },
                '帮助',
                _react2.default.createElement(_reactFa2.default, { name: 'question' })
            ),
            _react2.default.createElement(
                _component.PanelModal,
                {
                    isOpen: this.state.open,
                    closeModal: this.toggleModal,
                    title: title || "帮助",
                    customStyles: customStyles },
                children
            )
        );
    }
});

exports.default = HelpTips;