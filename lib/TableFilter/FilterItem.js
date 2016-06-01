'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by neo on 16/4/22.
                                                                                                                                                                                                                              */


var prefix = 'table-filter-';

var FilterItem = _react2.default.createClass({
    displayName: 'FilterItem',
    render: function render() {
        var _classNames;

        var props = this.props;
        var className = props.className;
        var float = props.float;
        var children = props.children;

        var others = _objectWithoutProperties(props, ['className', 'float', 'children']);

        var classes = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, prefix + 'item', true), _defineProperty(_classNames, '' + prefix + float + '-item', float), _defineProperty(_classNames, className, className), _classNames));

        return _react2.default.createElement(
            'div',
            _extends({}, others, {
                className: classes }),
            children
        );
    }
});

exports.default = FilterItem;