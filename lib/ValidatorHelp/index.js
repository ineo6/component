'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _validator = require('./validator/');

var _validator2 = _interopRequireDefault(_validator);

var _regex = require('./regex');

var _regex2 = _interopRequireDefault(_regex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by neo on 16/5/13.
 * ant-design form 验证助手
 */

function getValidationMethod(type) {
    return _validator2.default[type] || false;
}

var ValidatorHelp = {};

ValidatorHelp.get = function () {
    var type = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];


    return getValidationMethod(type);
};

ValidatorHelp.regex = _regex2.default;

exports.default = ValidatorHelp;