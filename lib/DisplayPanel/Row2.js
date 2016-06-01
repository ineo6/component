'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
   displayName: 'Row2',

   getDefaultProps: function getDefaultProps() {
      return {
         label: '',
         data: '',
         label2: '',
         data2: ''
      };
   },
   render: function render() {
      var _props = this.props;
      var label = _props.label;
      var data = _props.data;
      var label2 = _props.label2;
      var data2 = _props.data2;

      return _react2.default.createElement(
         'div',
         { className: 'displayPanel-flex displayPanel-row' },
         _react2.default.createElement(
            'div',
            { className: 'displayPanel-label' },
            label + '：'
         ),
         _react2.default.createElement(
            'div',
            { className: 'displayPanel-flex displayPanel-content2' },
            data
         ),
         _react2.default.createElement(
            'div',
            { className: 'displayPanel-label' },
            label2 + '：'
         ),
         _react2.default.createElement(
            'div',
            { className: 'displayPanel-flex displayPanel-content2' },
            data2
         )
      );
   }
});