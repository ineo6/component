'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ImgUpload = require('./ImgUpload');

var _ImgUpload2 = _interopRequireDefault(_ImgUpload);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'MultipleImgUpload',

    getDefaultProps: function getDefaultProps() {
        return {
            text: '上传图片'
        };
    },
    getAllFile: function getAllFile() {
        return this.refs.imgUpload.getAllFile();
    },
    removeAllFiles: function removeAllFiles() {
        return this.refs.imgUpload.removeAllFiles();
    },
    render: function render() {
        return _react2.default.createElement(
            _ImgUpload2.default,
            { ref: 'imgUpload', onChange: function onChange(file) {
                    return console.log(file);
                } },
            _react2.default.createElement(
                'div',
                { className: 'upload-input-container' },
                _react2.default.createElement(_antd.Icon, { type: 'plus' }),
                _react2.default.createElement(
                    'div',
                    { className: 'ant-upload-text' },
                    this.props.text
                )
            )
        );
    }
});