'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
   displayName: 'Row',

   getDefaultProps: function getDefaultProps() {
      return {
         label: '',
         data: ''
      };
   },
   render: function render() {
      var _props = this.props;
      var label = _props.label;
      var data = _props.data;


      var klassName = 'displayPanel-label';

      if (!label) {

         klassName = 'displayPanel-noLabel';
      }

      return _react2.default.createElement(
         'div',
         { className: 'displayPanel-flex displayPanel-row ' },
         _react2.default.createElement(
            'div',
            { className: klassName },
            label ? label + '：' : ''
         ),
         _react2.default.createElement(
            'div',
            { className: 'displayPanel-flex displayPanel-content' },
            data
         )
      );
   }
});