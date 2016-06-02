'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./style.css');

var _ImgUpload = require('./ImgUpload');

var _ImgUpload2 = _interopRequireDefault(_ImgUpload);

var _MultipleImgUpload = require('./MultipleImgUpload');

var _MultipleImgUpload2 = _interopRequireDefault(_MultipleImgUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ImgUpload2.default.MultiImgUpload = _MultipleImgUpload2.default;

exports.default = _ImgUpload2.default;