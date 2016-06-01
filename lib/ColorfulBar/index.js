'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Color = require('./Color');

var _Color2 = _interopRequireDefault(_Color);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorfulBar = function (_Component) {
   _inherits(ColorfulBar, _Component);

   function ColorfulBar(props) {
      _classCallCheck(this, ColorfulBar);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ColorfulBar).call(this, props));
   }

   _createClass(ColorfulBar, [{
      key: 'renderChildren',
      value: function renderChildren(children) {
         var sumNum = 0;
         _react.Children.map(children, function (child) {
            sumNum += child.props.num || 0;
         });
         var newChildren = [];
         _react.Children.map(children, function (child, index) {
            var width = (child.props.num || 0) * 100 / sumNum;
            var style = {};
            style.width = width + '%';
            var key = Math.random();
            var newChild = _react2.default.createElement(
               'div',
               { key: key, style: style },
               child
            );
            newChildren.push(newChild);
         });
         return newChildren;
      }
   }, {
      key: 'render',
      value: function render() {
         var children = this.props.children;

         return _react2.default.createElement(
            'div',
            { className: 'colorBar-container' },
            ' ',
            _react2.default.createElement(
               'div',
               { className: 'colorBar-vertical-center' },
               this.renderChildren(children)
            )
         );
      }
   }]);

   return ColorfulBar;
}(_react.Component);

ColorfulBar.Color = _Color2.default;

exports.default = ColorfulBar;