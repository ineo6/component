"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPositiveInteger = isPositiveInteger;
/**
 * Created by neo on 16/5/13.
 */

function isPositiveInteger(value) {
  var n = ~ ~Number(value);
  return String(n) == value && n > 0;
}