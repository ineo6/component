'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Lightbox = require('./Lightbox.js');

var _Lightbox2 = _interopRequireDefault(_Lightbox);

require('./styles/style.css');

require('./styles/paper-work.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by neo on 15/12/15.
 */


var PaperWork = _react2.default.createClass({
    displayName: 'PaperWork',
    propTypes: {
        images: _react2.default.PropTypes.array,
        heading: _react2.default.PropTypes.string,
        subheading: _react2.default.PropTypes.string,
        sepia: _react2.default.PropTypes.bool,
        hasRotate: _react2.default.PropTypes.bool
    },
    getInitialState: function getInitialState() {
        return {
            lightboxIsOpen: false,
            currentImage: 0
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
    renderGallery: function renderGallery() {
        var _this = this;

        if (!this.props.images) return;
        var gallery = this.props.images.map(function (obj, i) {
            var imgElement = obj.element || _react2.default.createElement('img', { src: obj.src, style: obj.style || {} });
            return _react2.default.createElement(
                'li',
                { key: i, className: 'image-list-item' },
                _react2.default.createElement(
                    'a',
                    { href: obj.src, onClick: function onClick(event) {
                            return _this.openLightbox(i, event);
                        },
                        style: Object.assign({}, styles.thumbnail) },
                    imgElement
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    obj.title
                )
            );
        });

        return _react2.default.createElement(
            'div',
            { style: styles.gallery },
            _react2.default.createElement(
                'ul',
                { className: 'image-list-group' },
                gallery
            )
        );
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            { className: 'section paper-work' },
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
                hasRotate: this.props.hasRotate || false,
                width: 1200
            })
        );
    }
});

var THUMBNAIL_SIZE = 168;

var styles = {
    gallery: {
        marginLeft: -5,
        marginRight: -5,
        overflow: 'hidden'
    },
    thumbnail: {
        backgroundSize: 'cover',
        borderRadius: 3,
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

module.exports = PaperWork;