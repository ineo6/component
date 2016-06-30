'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Lightbox = require('./Lightbox');

var _Lightbox2 = _interopRequireDefault(_Lightbox);

var _PaperWork = require('./PaperWork');

var _PaperWork2 = _interopRequireDefault(_PaperWork);

var _Gallery = require('./Gallery');

var _Gallery2 = _interopRequireDefault(_Gallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_PaperWork2.default.Lightbox = _Lightbox2.default;
_PaperWork2.default.Gallery = _Gallery2.default;

exports.default = _PaperWork2.default;