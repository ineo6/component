'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactFa = require('react-fa');

var _reactFa2 = _interopRequireDefault(_reactFa);

require('./cropper.css');

var _reactCropper = require('react-cropper');

var _reactCropper2 = _interopRequireDefault(_reactCropper);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'ImageCropper',


    //life cycle
    getInitialState: function getInitialState() {
        return {
            modalIsOpen: false
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {

        if (!_.eq(nextProps.fileObj, this.props.fileObj)) {
            this.setState({ modalIsOpen: true });
        }
    },
    render: function render() {

        var cropperProps = this.getCropperProps();
        var modalProps = this.getModalProps();

        return _react2.default.createElement(
            _reactModal2.default,
            modalProps,
            _react2.default.createElement(
                'div',
                { style: { overflow: 'hidden' }, className: 'modal-content' },
                _react2.default.createElement(
                    'div',
                    { className: 'modal-header', style: { padding: '10px' } },
                    _react2.default.createElement(
                        'a',
                        { onClick: this.cancelHandler, className: 'close' },
                        _react2.default.createElement(_reactFa2.default, { name: 'times' })
                    ),
                    _react2.default.createElement(
                        'h4',
                        { className: 'modal-title' },
                        '修剪图片'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'modal-body', style: { padding: '0px' } },
                    _react2.default.createElement(_reactCropper2.default, _extends({ ref: 'cropper' }, cropperProps))
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'modal-footer', style: { padding: '10px' } },
                    _react2.default.createElement(
                        _antd.Button,
                        { type: 'ghost', style: { marginRight: '10px' }, onClick: this.cancelHandler },
                        '取消'
                    ),
                    _react2.default.createElement(
                        _antd.Button,
                        { type: 'primary', onClick: this.confirmHandler },
                        '确定'
                    )
                )
            )
        );
    },


    // event

    cancelHandler: function cancelHandler() {
        this.setState({ modalIsOpen: false });
    },
    confirmHandler: function confirmHandler() {

        var fileObj = {
            src: '',
            file: null,
            key: this.props.fileObj.key,
            mimeType: this.props.fileObj.mimeType,
            status: 'done'
        };

        var canvas = this.refs.cropper.getCroppedCanvas();

        if (typeof canvas !== 'undefined') {

            fileObj.src = canvas.toDataURL('image/jpeg', this.props.quality);

            fileObj.file = this.btof(fileObj.src, fileObj);
        }

        this.props.onImageCrop && this.props.onImageCrop(fileObj);

        this.setState({ modalIsOpen: false });
    },
    getCropperProps: function getCropperProps() {
        var _props = this.props;
        var fileObj = _props.fileObj;
        var aspectRatio = _props.aspectRatio;

        return {
            style: { height: 400, width: '100%' },
            aspectRatio: aspectRatio,
            guides: false,
            src: fileObj ? fileObj.src : '',
            ref: "cropper"
        };
    },
    getModalProps: function getModalProps() {

        return {
            closeTimeoutMS: 150,
            isOpen: this.state.modalIsOpen,
            style: this.getModalStyle()
        };
    },
    getModalStyle: function getModalStyle() {
        return {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                border: 'none',
                padding: 0,
                width: '480px'
            }
        };
    },
    btof: function btof(data, fileObj) {
        var dataArr = data.split(',');
        var byteString = atob(dataArr[1]);
        var options = {
            type: 'image/jpeg',
            endings: 'native'
        };
        var u8Arr = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            u8Arr[i] = byteString.charCodeAt(i);
        }
        return new File([u8Arr], fileObj.key + '.jpg', options);
    }
});