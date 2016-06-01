'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by neo on 16/4/22.
                                                                                                                                                                                                                              */


var TableFilter = _react2.default.createClass({
    displayName: 'TableFilter',
    render: function render() {
        var _props = this.props;
        var className = _props.className;

        var others = _objectWithoutProperties(_props, ['className']);

        var classes = (0, _classnames2.default)(_defineProperty({
            'table-filter': true,
            'clearfix': true
        }, className, className));

        return _react2.default.createElement('div', _extends({}, others, { className: classes }));
    }
});

exports.default = TableFilter;