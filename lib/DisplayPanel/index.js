'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _Row3 = require('./Row2');

var _Row4 = _interopRequireDefault(_Row3);

var _DisabledCheckbox = require('./DisabledCheckbox');

var _DisabledCheckbox2 = _interopRequireDefault(_DisabledCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var KEY_PREFIX = 'keyFromDisplayPanel-';

var key = 0;

var COM = _react2.default.createClass({
   displayName: 'COM',
   getDefaultProps: function getDefaultProps() {
      return {
         title: {
            content: '',
            klassName: ''
         },
         rows: []
      };
   },
   renderRow: function renderRow(rows) {
      if (!rows || !_.isArray(rows) || rows.length == 0) {
         return;
      }
      var eles = [];
      var keyVal = 1;
      rows.map(function (val) {
         if (val.hasOwnProperty('label2')) {
            eles.push(_react2.default.createElement(_Row4.default, _extends({ key: keyVal++ }, val)));
         } else {
            eles.push(_react2.default.createElement(_Row2.default, _extends({ key: keyVal++ }, val)));
         }
      });
      return eles;
   },
   getTitleClass: function getTitleClass(title) {

      if (title) {
         return 'displayPanel-title ' + title.klassName;
      } else {
         return 'displayNone';
      }
   },
   render: function render() {
      var _props = this.props;
      var title = _props.title;
      var rows = _props.rows;


      var klassName = this.getTitleClass(title);
      return _react2.default.createElement(
         'div',
         { className: 'displayPanel-container' },
         _react2.default.createElement(
            'h4',
            { className: klassName },
            ' ',
            title.content,
            ' '
         ),
         this.renderRow(rows)
      );
   }
});

var API = {
   /*
    * common useful apis
    */

   getPaddingSpan: function getPaddingSpan(txt) {

      return _react2.default.createElement(
         'span',
         { key: KEY_PREFIX + key++, style: { paddingRight: '20px' } },
         txt
      );
   },
   getPropFromArrayItem: function getPropFromArrayItem(prop, arr) {
      var _this = this;

      var result = [];

      if (!arr || !_.isArray(arr) || arr.length == 0) return result;

      arr.map(function (val) {
         result.push(_this.getPaddingSpan(val[prop]));
      });

      return result;
   },
   getDisabledCheckbox: function getDisabledCheckbox(args) {
      var txt = args.txt;

      var other = _objectWithoutProperties(args, ['txt']);

      return _react2.default.createElement(
         'label',
         { key: KEY_PREFIX + key++, style: { display: 'flex', paddingRight: '20px' } },
         _react2.default.createElement(_DisabledCheckbox2.default, other),
         _react2.default.createElement(
            'span',
            { style: { paddingLeft: '10px' } },
            txt
         )
      );
   }
};

COM.DisabledCheckbox = _DisabledCheckbox2.default;
COM.API = API;

exports.default = COM;