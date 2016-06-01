'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _antd = require('antd');

var _component = require('component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadList = function (_React$Component) {
  _inherits(UploadList, _React$Component);

  function UploadList() {
    _classCallCheck(this, UploadList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UploadList).apply(this, arguments));
  }

  _createClass(UploadList, [{
    key: 'handleImageRemove',
    value: function handleImageRemove(img) {
      var arr = [];
      if (this.props.items) {
        arr = this.props.items.filter(function (file) {
          return file.key == img.id;
        });
      }

      this.props.onRemove && this.props.onRemove(arr[0]);
    }
  }, {
    key: 'renderGallery',
    value: function renderGallery() {
      var images = [];

      if (this.props.items) {
        images = this.props.items.map(function (file) {
          return {
            id: file.key,
            src: file.src
          };
        });
      }

      return images;
    }
  }, {
    key: 'render',
    value: function render() {

      var aspectRatio = 1;

      if (this.props.aspectRatio && !_.isNaN(this.props.aspectRatio)) {

        aspectRatio = this.props.aspectRatio;
      }

      var thumbnailWidth = 96 * aspectRatio;

      var thumbnailStyle = {
        height: 80,
        width: thumbnailWidth - 16
      };

      return _react2.default.createElement(
        'span',
        { style: { display: 'inline-block', marginRight: '10px' } },
        _react2.default.createElement(_component.Gallery, { onImageRemove: this.handleImageRemove.bind(this), images: this.renderGallery(), thumbnailStyle: thumbnailStyle })
      );
    }
  }]);

  return UploadList;
}(_react2.default.Component);

UploadList.defaultProps = {
  listType: 'picture', // or text
  items: [],
  progressAttr: {
    strokeWidth: 3,
    showInfo: false
  }

};
exports.default = UploadList;