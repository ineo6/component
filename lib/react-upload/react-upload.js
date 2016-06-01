'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Created by neo on 15/12/12.
 */
/**
 * Module dependencies
 */

var React = require('react');
var Filepicker = require('component-file-picker');
var File = require('component-file');
var ClassSet = require('classnames');
var noop = function noop() {};

require('./react-upload.css');

var Droppie = React.createClass({
    displayName: 'Droppie',


    propTypes: {
        image: React.PropTypes.string,
        defaultImage: React.PropTypes.string,
        alt: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        onError: React.PropTypes.func,
        showButton: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
        filetypes: React.PropTypes.array,
        style: React.PropTypes.object,
        buttonStyle: React.PropTypes.object,
        errorStyle: React.PropTypes.object,
        maxSize: React.PropTypes.number,
        field: React.PropTypes.string,
        tips: React.PropTypes.string,
        showValidMsg: React.PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            filetypes: ['image/*'],
            onError: noop,
            style: {},
            buttonStyle: {},
            errorStyle: {},
            field: "fileUpload",
            maxSize: 5,
            showValidMsg: false
        };
    },

    getInitialState: function getInitialState() {
        return {
            onDragOver: false,
            error: false
        };
    },
    renderBtn: function renderBtn() {
        if (this.props.showButton) return React.createElement(
            'div',
            { className: 'btn-box' },
            React.createElement(
                'button',
                { style: this.props.buttonStyle, className: 'btn-upload', onClick: this.onClick },
                this.props.showButton
            ),
            React.createElement(
                'span',
                { className: 'tips' },
                this.props.tips
            )
        );
    },

    clearError: function clearError() {
        var self = this;
        setTimeout(function () {
            // 动态更新state
            self.setState({ error: "" });
        }, 3000);
    },
    renderError: function renderError() {
        //todo 延时清空
        if (this.state.error) {

            if (!this.props.showValidMsg) {
                this.clearError();
            }

            return React.createElement(
                'div',
                { style: this.props.errorStyle, className: 'error' },
                this.state.error
            );
        }
    },
    renderImage: function renderImage() {
        if (this.props.image) return React.createElement('img', { src: this.props.image, alt: '' });else if (this.props.defaultImage) return React.createElement('img', { src: this.props.defaultImage, alt: '' });
    },

    render: function render() {
        var _props = this.props;
        var image = _props.image;

        var other = _objectWithoutProperties(_props, ['image']);

        var classes = ClassSet({
            'input-upload': true,
            'on-drag-over': this.state.onDragOver,
            'has-image': image
        });

        return React.createElement(
            'div',
            null,
            this.renderError(),
            React.createElement(
                'div',
                _extends({}, other, {
                    className: classes,
                    role: 'image',
                    'aria-label': this.props.alt || 'Image dropzone',
                    onDragEnter: this.onDragEnter,
                    onDragOver: this.onDragOver,
                    onDragLeave: this.onDragLeave,
                    onDrop: this.onDrop,
                    onClick: this.onClick }),
                this.renderImage()
            ),
            this.renderBtn()
        );
    },

    onDragEnter: function onDragEnter(e) {
        e.preventDefault();
        this.setState({ onDragOver: true });
    },

    onDragOver: function onDragOver(e) {
        e.preventDefault();
    },

    onDragLeave: function onDragLeave(e) {
        this.setState({ onDragOver: false });
    },

    remove: function remove(e) {
        this.props.onChange(null);
    },

    onDrop: function onDrop(e) {
        this.setState({ onDragOver: false });
        e.preventDefault();
        this.getFile(e.dataTransfer.files[0]);
    },

    onClick: function onClick(e) {
        var _this = this;

        e.preventDefault();
        Filepicker(function (files) {
            return _this.getFile(files[0]);
        });
    },
    onError: function onError(message) {
        this.setState({ error: message });
    },
    getAllowFileType: function getAllowFileType() {
        return this.props.filetypes.map(function (item) {
            return item.split('/')[1];
        });
    },

    getFile: function getFile(file) {
        var _this2 = this;

        var image = new File(file);

        for (var i = 0, len = this.props.filetypes.length; i < len; i++) {
            if (!image.is(this.props.filetypes[i])) {
                var types = this.getAllowFileType();

                this.onError('只支持' + types.join(',') + "格式");
                return;
            }
        }

        if (image.size > this.props.maxSize * 1024 * 1024) {
            this.onError("图片不能超过" + this.props.maxSize + "M大小");
        } else this.onError("");

        image.toDataURL(function (err, str) {
            if (err) {
                _this2.onError('略缩图加载失败.', err);
                return;
            }

            _this2.props.onChange(str, file);
        });
    }

});

module.exports = Droppie;