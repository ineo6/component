'use strict';

var _util = require('../util');

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var positiveInteger = function positiveInteger(rule, value, source, errors, options) {
    if ((0, _util.isPositiveInteger)(value) == false) {
        errors.push(_messages2.default.positiveInteger);
    }
};

module.exports = positiveInteger;