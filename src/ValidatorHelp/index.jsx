/**
 * Created by neo on 16/5/13.
 * ant-design form 验证助手
 */

import validators from './validator/';
import regex from './regex';

function getValidationMethod(type) {
    return validators[type] || false;
}

let ValidatorHelp = {};

ValidatorHelp.get = (type = "") => {

    return getValidationMethod(type);
};

ValidatorHelp.regex = regex;

export default  ValidatorHelp;
