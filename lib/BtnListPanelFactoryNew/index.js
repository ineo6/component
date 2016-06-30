'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FunctionButtonsNew = require('../FunctionButtonsNew/');

var _FunctionButtonsNew2 = _interopRequireDefault(_FunctionButtonsNew);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(options) {
    return _react2.default.createClass({
        displayName: options.displayName,

        componentWillMount: function componentWillMount() {
            var _this = this;

            options.btnList = options.btnList || [];
            options.btnList.map(function (val) {
                if (val.other) val.others = _this.props;
            });
        },

        render: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'panel-box' },
                _react2.default.createElement(_FunctionButtonsNew2.default, { multi: options.multi,
                    functions: options.btnList
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'panel-box-body' },
                    this.props.children
                )
            );
        }
    });
};

exports.default = { create: create };