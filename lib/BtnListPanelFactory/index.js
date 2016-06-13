'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _FunctionButtons = require('../FunctionButtons/');

var _FunctionButtons2 = _interopRequireDefault(_FunctionButtons);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(options) {
    return _react2.default.createClass({
        displayName: options.displayName,

        componentWillMount: function componentWillMount() {
            var _this = this;

            options.btnList = options.btnList || [];
            options.btnList.map(function (val) {
                return val.others = _this.props;
            });
        },

        render: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'panel-box' },
                _react2.default.createElement(_FunctionButtons2.default, { multi: options.multi,
                    functions: options.btnList
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'panel-box-body' },
                    _react2.default.createElement(_reactRouter.RouteHandler, null)
                )
            );
        }
    });
};

exports.default = { create: create };