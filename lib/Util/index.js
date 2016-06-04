'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by neo on 16/4/12.
 */

function getValue(string) {
    return string ? string : "";
}

exports.default = {
    getDefaultCity: function getDefaultCity() {
        var cityJson = _config2.default.defaultCity;

        if (localStorage.managerDefaultCity) {
            cityJson = JSON.parse(localStorage.managerDefaultCity);
        }

        return cityJson;
    },
    setDefaultCity: function setDefaultCity(city) {
        var cityJson = _config2.default.defaultCity;

        if (localStorage.managerDefaultCity && city == false) {
            cityJson = JSON.parse(localStorage.managerDefaultCity);
        } else if (city) {
            cityJson = city;
            localStorage.managerDefaultCity = JSON.stringify(cityJson);
        }

        return cityJson;
    },
    formatAddress: function formatAddress(address, building, floor, unit, room) {
        return getValue(address) + getValue(building) + (floor ? floor + "楼" : "") + getValue(unit) + getValue(room);
    },
    splitDate: function splitDate(date) {
        var dateArr = [];
        if (date) {
            dateArr = date.split(" ");

            return _react2.default.createElement(
                'div',
                null,
                dateArr[0],
                _react2.default.createElement('br', null),
                dateArr[1]
            );
        } else return date;
    }
};