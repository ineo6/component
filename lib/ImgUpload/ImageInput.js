'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _component = require('component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var now = +new Date();
var index = 0;
function imageid() {
  return 'imageid-' + now + '-' + ++index;
}

exports.default = _react2.default.createClass({
  displayName: 'ImageInput',


  propTypes: {
    onFileLoaded: _react.PropTypes.func
  },

  onChange: function onChange(e) {
    var _this = this;

    var files = e.target.files;
    var reader = new FileReader();

    reader.onload = function () {

      var type = files[0].type.split('/')[0];

      if (type && type == "image") {

        _this.onFileLoaded(files[0], reader.result);
      } else {
        _component.Message.error('请选择图片文件！');
      }
    };

    reader.readAsDataURL(files[0]);
  },
  onFileLoaded: function onFileLoaded(file, src) {

    var fileObj = {
      file: file,
      src: src,
      key: imageid(),
      mimeType: file.type
    };

    this.props.onFileLoaded && this.props.onFileLoaded(fileObj);
  },
  onClick: function onClick() {
    var el = this.refs.file;
    if (!el) {
      return;
    }
    el.click();
    el.value = '';
  },
  onKeyDown: function onKeyDown(e) {
    if (e.key === 'Enter') {
      this.onClick();
    }
  },
  render: function render() {
    var hidden = { display: 'none' };
    var props = this.props;
    return _react2.default.createElement(
      'span',
      {
        className: 'input-klass',
        onClick: this.onClick,
        onKeyDown: this.onKeyDown,
        onDrop: this.onFileDrop,
        onDragOver: this.onFileDrop,
        role: 'button',
        tabIndex: '0'
      },
      _react2.default.createElement('input', { type: 'file',
        ref: 'file',
        style: hidden,
        accept: props.accept,
        multiple: this.props.multiple,
        onChange: this.onChange }),
      props.children
    );
  }
});