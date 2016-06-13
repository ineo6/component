'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChartBase2 = require('./ChartBase');

var _ChartBase3 = _interopRequireDefault(_ChartBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wordCloud = function (_ChartBase) {
  _inherits(wordCloud, _ChartBase);

  function wordCloud() {
    _classCallCheck(this, wordCloud);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(wordCloud).apply(this, arguments));
  }

  return wordCloud;
}(_ChartBase3.default);

wordCloud.defaultProps = {
  type: 'wordCloud'
};
exports.default = wordCloud;