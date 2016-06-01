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

require('./PanelModal.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by neo on 15/10/30.
 */


var customStyles = {
    content: {
        top: '20%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -20%)',
        border: 'none',
        padding: 0,
        width: '500px'
    }
};

var PanelModal = _react2.default.createClass({
    displayName: 'PanelModal',
    getInitialState: function getInitialState() {
        return {
            isOpen: false
        };
    },
    whichStyle: function whichStyle() {
        if (this.props.customStyles) return this.props.customStyles;else return customStyles;
    },
    setModal: function setModal(flag) {
        this.setState({ isOpen: flag == true });
    },
    closeModal: function closeModal() {
        if (this.props.isOpen === undefined) this.setModal(false);else this.props.closeModal();
    },
    render: function render() {
        var _props = this.props;
        var isOpen = _props.isOpen;
        var title = _props.title;
        var id = _props.id;
        var children = _props.children;


        if (isOpen === undefined) isOpen = this.state.isOpen;

        return _react2.default.createElement(
            _reactModal2.default,
            {
                isOpen: isOpen,
                onRequestClose: this.closeModal,
                style: this.whichStyle() },
            _react2.default.createElement(
                'div',
                { className: 'cm-modal-dialog' },
                _react2.default.createElement(
                    'div',
                    { className: 'cm-modal-content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'cm-modal-header' },
                        _react2.default.createElement(
                            'a',
                            { onClick: this.closeModal, className: 'close' },
                            _react2.default.createElement(_reactFa2.default, { name: 'times' })
                        ),
                        _react2.default.createElement(
                            'h4',
                            { className: 'cm-modal-title' },
                            title ? title : ""
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'cm-modal-body', id: id },
                        children
                    )
                )
            )
        );
    }
});

exports.default = PanelModal;