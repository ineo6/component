'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ReactChart = require('./ReactChart');

var _ReactChart2 = _interopRequireDefault(_ReactChart);

var _Bar = require('./Bar');

var _Bar2 = _interopRequireDefault(_Bar);

var _Cloud = require('./Cloud');

var _Cloud2 = _interopRequireDefault(_Cloud);

var _Line = require('./Line');

var _Line2 = _interopRequireDefault(_Line);

var _Pie = require('./Pie');

var _Pie2 = _interopRequireDefault(_Pie);

var _Series = require('./Series');

var _Series2 = _interopRequireDefault(_Series);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ReactChart2.default.Bar = _Bar2.default;
_ReactChart2.default.Cloud = _Cloud2.default;
_ReactChart2.default.Line = _Line2.default;
_ReactChart2.default.Pie = _Pie2.default;
_ReactChart2.default.Series = _Series2.default;

exports.default = _ReactChart2.default;