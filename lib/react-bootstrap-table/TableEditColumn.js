'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Editor = require('./Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableEditColumn = function (_React$Component) {
    _inherits(TableEditColumn, _React$Component);

    function TableEditColumn(props) {
        _classCallCheck(this, TableEditColumn);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TableEditColumn).call(this, props));

        _this.timeouteClear = 0;
        _this.state = {
            shakeEditor: false
        };
        return _this;
    }

    _createClass(TableEditColumn, [{
        key: 'handleKeyPress',
        value: function handleKeyPress(e) {
            if (e.keyCode == 13) {
                //Pressed ENTER
                var value = e.currentTarget.type == 'checkbox' ? this._getCheckBoxValue(e) : e.currentTarget.value;

                if (!this.validator(value)) {
                    return;
                }
                this.props.completeEdit(value, this.props.rowIndex, this.props.colIndex);
            } else if (e.keyCode == 27) {
                this.props.completeEdit(null, this.props.rowIndex, this.props.colIndex);
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            if (this.props.blurToSave) {
                var value = e.currentTarget.type == 'checkbox' ? this._getCheckBoxValue(e) : e.currentTarget.value;
                if (!this.validator(value)) {
                    return;
                }
                this.props.completeEdit(value, this.props.rowIndex, this.props.colIndex);
            }
        }
    }, {
        key: 'validator',
        value: function validator(value) {
            var ts = this;
            if (ts.props.editable.validator) {
                var valid = ts.props.editable.validator(value);
                if (valid !== true) {
                    ts.refs.notifier.notice('error', valid, "Pressed ESC can cancel");
                    var input = ts.refs.inputRef;
                    //animate input
                    ts.clearTimeout();
                    ts.setState({ shakeEditor: true });
                    ts.timeouteClear = setTimeout(function () {
                        ts.setState({ shakeEditor: false });
                    }, 300);
                    input.focus();
                    return false;
                }
            }
            return true;
        }
    }, {
        key: 'clearTimeout',
        value: function (_clearTimeout) {
            function clearTimeout() {
                return _clearTimeout.apply(this, arguments);
            }

            clearTimeout.toString = function () {
                return _clearTimeout.toString();
            };

            return clearTimeout;
        }(function () {
            if (this.timeouteClear != 0) {
                clearTimeout(this.timeouteClear);
                this.timeouteClear = 0;
            }
        })
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var input = this.refs.inputRef;
            // input.value = this.props.children||'';
            input.focus();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.clearTimeout();
        }
    }, {
        key: 'render',
        value: function render() {
            var editable = this.props.editable,
                format = this.props.format,
                attr = {
                ref: "inputRef",
                onKeyDown: this.handleKeyPress.bind(this),
                onBlur: this.handleBlur.bind(this)
            };
            //put placeholder if exist
            editable.placeholder && (attr.placeholder = editable.placeholder);

            var editorClass = (0, _classnames2.default)({ 'animated': this.state.shakeEditor, 'shake': this.state.shakeEditor });
            return _react2.default.createElement(
                'td',
                { ref: 'td', style: { position: 'relative' } },
                (0, _Editor2.default)(editable, attr, format, editorClass, this.props.children || '')
            );
        }
    }, {
        key: '_getCheckBoxValue',
        value: function _getCheckBoxValue(e) {
            var value = '';
            var values = e.currentTarget.value.split(':');
            value = e.currentTarget.checked ? values[0] : values[1];
            return value;
        }
    }]);

    return TableEditColumn;
}(_react2.default.Component);

TableEditColumn.propTypes = {
    completeEdit: _react2.default.PropTypes.func,
    rowIndex: _react2.default.PropTypes.number,
    colIndex: _react2.default.PropTypes.number,
    blurToSave: _react2.default.PropTypes.bool
};

exports.default = TableEditColumn;