'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Lightbox = require('./Lightbox.js');

var _Lightbox2 = _interopRequireDefault(_Lightbox);

require('./styles/style.css');

var _reactFa = require('react-fa');

var _reactFa2 = _interopRequireDefault(_reactFa);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Gallery = _react2.default.createClass({
    displayName: 'Gallery',
    propTypes: {
        images: _react2.default.PropTypes.array,
        heading: _react2.default.PropTypes.string,
        subheading: _react2.default.PropTypes.string,
        sepia: _react2.default.PropTypes.bool,
        thumbnailStyle: _react2.default.PropTypes.object,
        preview: _react2.default.PropTypes.bool
    },
    getInitialState: function getInitialState() {
        return {
            lightboxIsOpen: false,
            currentImage: 0,
            preview: false
        };
    },
    openLightbox: function openLightbox(index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
    },
    closeLightbox: function closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    },
    gotoPrevious: function gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    },
    gotoNext: function gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    },
    handleDelete: function handleDelete(obj) {
        this.props.onImageRemove(obj);
    },
    renderGallery: function renderGallery() {
        var _this = this;

        if (!this.props.images) return;

        var _props = this.props;
        var thumbnailStyle = _props.thumbnailStyle;
        var preview = _props.preview;


        styles.thumbnail.width = thumbnailStyle.width || styles.thumbnail.width;
        styles.thumbnail.height = thumbnailStyle.height;

        var cls = (0, _classnames2.default)({
            "com-image-list-item": true,
            'preview': preview ? true : false
        });

        var gallery = this.props.images.map(function (obj, i) {
            return _react2.default.createElement(
                'li',
                { key: i, className: cls },
                _react2.default.createElement(
                    'a',
                    { href: obj.src, onClick: function onClick(event) {
                            return _this.openLightbox(i, event);
                        },
                        style: Object.assign({}, styles.thumbnail, _this.props.thumbnailStyle) },
                    _react2.default.createElement('img', { src: obj.src })
                ),
                _this.props.onImageRemove ? _react2.default.createElement(
                    'div',
                    { className: 'com-image-del' },
                    _react2.default.createElement(
                        'span',
                        { onClick: _this.handleDelete.bind(_this, obj) },
                        _react2.default.createElement(_reactFa2.default, {
                            name: 'times' })
                    )
                ) : null
            );
        });

        return _react2.default.createElement(
            'div',
            { style: styles.gallery },
            _react2.default.createElement(
                'ul',
                { className: 'com-image-list-group' },
                gallery
            )
        );
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            { className: 'section', style: { marginBottom: "15px" } },
            this.props.heading && _react2.default.createElement(
                'h2',
                null,
                this.props.heading
            ),
            this.props.subheading && _react2.default.createElement(
                'p',
                null,
                this.props.subheading
            ),
            this.renderGallery(),
            _react2.default.createElement(_Lightbox2.default, {
                currentImage: this.state.currentImage,
                images: this.props.images,
                isOpen: this.state.lightboxIsOpen,
                onClickPrev: this.gotoPrevious,
                onClickNext: this.gotoNext,
                onClose: this.closeLightbox,
                styles: this.props.styles,
                width: 1200
            })
        );
    }
}); /**
     * Created by neo on 15/12/15.
     */


var THUMBNAIL_SIZE = 120;

var styles = {
    gallery: {
        marginLeft: -5,
        marginRight: -5,
        overflow: 'hidden'
    },
    thumbnail: {
        backgroundSize: 'cover',
        float: 'left',
        height: 'auto',
        overflow: 'hidden',
        width: THUMBNAIL_SIZE
    },
    thumbnailImage: {
        display: 'block',
        height: 'auto',
        left: '50%',
        position: 'relative',

        WebkitTransform: 'translateX(-50%)',
        MozTransform: 'translateX(-50%)',
        msTransform: 'translateX(-50%)',
        transform: 'translateX(-50%)'
    }
};

module.exports = Gallery;