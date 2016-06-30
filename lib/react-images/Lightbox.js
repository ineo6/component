'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Fade = require('./Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _reactFa = require('react-fa');

var _reactFa2 = _interopRequireDefault(_reactFa);

var _default = require('./styles/default');

var _default2 = _interopRequireDefault(_default);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes;

var BODY = document.body;

function blacklist(src) {
	var copy = {},
	    filter = arguments[1];

	if (typeof filter === 'string') {
		filter = {};
		for (var i = 1; i < arguments.length; i++) {
			filter[arguments[i]] = true;
		}
	}

	for (var key in src) {
		// blacklist?
		if (filter[key]) continue;

		copy[key] = src[key];
	}

	return copy;
}

var Lightbox = _react2.default.createClass({
	displayName: 'Lightbox',
	propTypes: {
		backdropClosesModal: PropTypes.bool,
		currentImage: PropTypes.number,
		enableKeyboardInput: PropTypes.bool,
		height: PropTypes.number,
		images: PropTypes.arrayOf(PropTypes.shape({
			src: PropTypes.string.isRequired,
			srcset: PropTypes.array
		})).isRequired,
		isOpen: PropTypes.bool,
		onClickNext: PropTypes.func.isRequired,
		onClickPrev: PropTypes.func.isRequired,
		onClose: PropTypes.func.isRequired,
		showCloseButton: PropTypes.bool,
		styles: PropTypes.object,
		width: PropTypes.number,
		hasRotate: PropTypes.bool
	},
	statics: {
		extendStyles: function extendStyles(styles) {
			var extStyles = Object.assign({}, _default2.default);
			for (var key in extStyles) {
				if (key in styles) {
					extStyles[key] = Object.assign({}, _default2.default[key], styles[key]);
				}
			}
			return extStyles;
		}
	},
	getDefaultProps: function getDefaultProps() {
		return {
			backdropClosesModal: true,
			enableKeyboardInput: true,
			currentImage: 0,
			height: 600,
			styles: _default2.default,
			width: 900,
			hasRotate: false
		};
	},

	getInitialState: function getInitialState() {
		return {
			currentImage: 0,
			currentDeg: 0
		};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.setState({
			currentImage: nextProps.currentImage,
			currentDeg: 0
		});

		if (nextProps.isOpen && nextProps.enableKeyboardInput) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		} else {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}

		if (nextProps.isOpen) {
			BODY.style.overflow = 'hidden';
		} else {
			BODY.style.overflow = null;
		}
	},
	gotoPrev: function gotoPrev(event) {
		if (this.props.currentImage === 0) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.props.onClickPrev();
	},
	gotoNext: function gotoNext(event) {
		if (this.props.currentImage === this.props.images.length - 1) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.props.onClickNext();
	},
	rotateLeft: function rotateLeft(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		var deg = this.state.currentDeg || 0;
		deg -= 90;
		this.setState({
			currentDeg: deg
		});
	},
	rotateRight: function rotateRight(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		var deg = this.state.currentDeg || 0;
		deg += 90;
		this.setState({
			currentDeg: deg
		});
	},
	handleKeyboardInput: function handleKeyboardInput(event) {
		if (event.keyCode === 37) {
			this.gotoPrev();
		} else if (event.keyCode === 39) {
			this.gotoNext();
		} else if (event.keyCode === 27) {
			this.props.onClose();
		} else {
			return false;
		}
	},
	close: function close() {
		this.props.backdropClosesModal && this.props.onClose && this.props.onClose();
	},
	renderArrowPrev: function renderArrowPrev() {
		if (this.props.currentImage === 0) return;

		return _react2.default.createElement(
			_Fade2.default,
			{ key: 'arrowPrev' },
			_react2.default.createElement(
				'button',
				{ type: 'button', style: Object.assign({}, this.props.styles.arrow, this.props.styles.arrowPrev), onClick: this.gotoPrev, onTouchEnd: this.gotoPrev },
				_react2.default.createElement(_Icon2.default, { type: 'arrowLeft' })
			)
		);
	},
	renderArrowNext: function renderArrowNext() {
		if (this.props.currentImage === this.props.images.length - 1) return;

		return _react2.default.createElement(
			_Fade2.default,
			{ key: 'arrowNext' },
			_react2.default.createElement(
				'button',
				{ type: 'button', style: Object.assign({}, this.props.styles.arrow, this.props.styles.arrowNext), onClick: this.gotoNext, onTouchEnd: this.gotoNext },
				_react2.default.createElement(_Icon2.default, { type: 'arrowRight' })
			)
		);
	},
	renderRotate: function renderRotate() {

		if (!this.props.hasRotate) return;

		return _react2.default.createElement(
			_Fade2.default,
			{ key: 'rotate' },
			_react2.default.createElement(
				'div',
				{ style: Object.assign({}, this.props.styles.rotate) },
				_react2.default.createElement(
					'button',
					{ style: Object.assign({}, this.props.styles.rotateLeft), key: 'left', type: 'button', onClick: this.rotateLeft, onTouchEnd: this.rotateLeft },
					_react2.default.createElement(_reactFa2.default, { size: '2x', name: 'undo' })
				),
				_react2.default.createElement(
					'button',
					{ style: Object.assign({}, this.props.styles.rotateRight), key: 'right', type: 'button', onClick: this.rotateRight, onTouchEnd: this.rotateRight },
					_react2.default.createElement(_reactFa2.default, { size: '2x', name: 'repeat' })
				)
			)
		);
	},
	renderBackdrop: function renderBackdrop() {
		if (!this.props.isOpen) return;

		return _react2.default.createElement(
			_Fade2.default,
			{ key: 'backdrop' },
			_react2.default.createElement('div', { key: 'backdrop', style: this.props.styles.backdrop, onTouchEnd: this.close, onClick: this.close })
		);
	},
	renderCloseButton: function renderCloseButton() {
		if (!this.props.showCloseButton) return;

		return _react2.default.createElement(
			_Fade2.default,
			{ key: 'closeButton' },
			_react2.default.createElement(
				'button',
				{ style: this.props.styles.close, onClick: this.props.onClose },
				'Close'
			)
		);
	},
	renderDialog: function renderDialog() {
		if (!this.props.isOpen) return;

		return _react2.default.createElement(
			_Fade2.default,
			{ key: 'dialog', onTouchEnd: this.close, onClick: this.close, style: Object.assign({}, this.props.styles.dialog, { height: this.props.height, width: this.props.width }) },
			this.renderImages(),
			_react2.default.createElement(
				_reactAddonsTransitionGroup2.default,
				{ transitionName: 'div', component: 'div' },
				this.renderArrowPrev()
			),
			_react2.default.createElement(
				_reactAddonsTransitionGroup2.default,
				{ transitionName: 'div', component: 'div' },
				this.renderArrowNext()
			),
			_react2.default.createElement(
				_reactAddonsTransitionGroup2.default,
				{ transitionName: 'div', component: 'div' },
				this.renderRotate()
			),
			_react2.default.createElement(
				_reactAddonsTransitionGroup2.default,
				{ transitionName: 'div', component: 'div' },
				this.renderCloseButton()
			)
		);
	},
	renderImages: function renderImages() {
		var _props = this.props;
		var images = _props.images;
		var currentImage = _props.currentImage;

		if (!images || !images.length) return;

		var width = '100%',
		    transform = 'rotate(' + this.state.currentDeg + 'deg)',
		    maxWidth = this.props.styles.image.maxWidth;

		if (this.state.currentDeg % 90 === 0 && this.state.currentDeg % 180 !== 0) {
			width = this.props.height;
			maxWidth = '100%';
		}

		var imgStyle = Object.assign({}, this.props.styles.image, { maxWidth: maxWidth });

		if (images[currentImage].srcset) {
			var img = _react2.default.createElement('img', { src: images[currentImage].src, srcSet: images[currentImage].srcset.join(), sizes: parseInt(imgStyle.maxWidth) + 'vw', style: imgStyle, onTouchEnd: function onTouchEnd(e) {
					return e.stopPropagation();
				}, onClick: function onClick(e) {
					return e.stopPropagation();
				} });
		} else {
			var img = _react2.default.createElement('img', { src: images[currentImage].src, style: imgStyle, onTouchEnd: function onTouchEnd(e) {
					return e.stopPropagation();
				}, onClick: function onClick(e) {
					return e.stopPropagation();
				} });
		}

		var constainerStyle = Object.assign({}, this.props.styles.transform, { width: width, transform: transform });
		return _react2.default.createElement(
			_reactAddonsTransitionGroup2.default,
			{ transitionName: 'div', component: 'div', style: constainerStyle },
			_react2.default.createElement(
				_Fade2.default,
				{ key: 'image' + currentImage },
				img
			)
		);
	},
	render: function render() {
		var props = blacklist(this.props, 'backdropClosesModal', 'currentImage', 'enableKeyboardInput', 'height', 'images', 'isOpen', 'onClickNext', 'onClickPrev', 'onClose', 'showCloseButton', 'styles', 'width');

		return _react2.default.createElement(
			_Portal2.default,
			props,
			_react2.default.createElement(
				_reactAddonsTransitionGroup2.default,
				{ transitionName: 'div', component: 'div' },
				this.renderDialog()
			),
			_react2.default.createElement(
				_reactAddonsTransitionGroup2.default,
				{ transitionName: 'div', component: 'div' },
				this.renderBackdrop()
			)
		);
	}
});

module.exports = Lightbox;