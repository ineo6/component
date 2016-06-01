/**
 * async validator 正整数
 */

import rules from '../rule/';

const positiveInteger = function positiveInteger(rule, value, callback, source, options) {
    const errors = [];
    
    if (!value) {
        return callback();
    } else {
        rules.positiveInteger(rule, value, source, errors, options);
    }

    callback(errors);
}

module.exports = positiveInteger;