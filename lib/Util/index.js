'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                   * Created by neo on 16/4/12.
                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getValue(string) {
    return string ? string : "";
}

function addUnit(value, units) {
    var str = "";
    if (value && units) {
        for (var i = 0, len = units.length; i < len; i++) {
            if (value.indexOf(units[i]) >= 0) {
                str = value;
                break;
            }
        }

        if (str == "") {
            str = value + units[0];
        }
    }

    return str;
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
    getBuilding: function getBuilding(value) {
        return addUnit(value, ["栋", "幢", "座", "楼"]);
    },
    getUnitNo: function getUnitNo(value) {
        return addUnit(value, ["单元"]);
    },
    formatAddress: function formatAddress(address, building, floor, unit, room, split) {
        if (split && split == true) return getValue(address) + "<br/>" + this.getBuilding(building) + (floor ? floor + "楼" : "") + this.getUnitNo(unit) + getValue(room);else return getValue(address) + this.getBuilding(building) + (floor ? floor + "楼" : "") + this.getUnitNo(unit) + getValue(room);
    },
    splitDate: function splitDate(date) {
        var dateArr = [];

        if (Number(date)) {
            //字符串
            date = (0, _moment2.default)(date, "YYYYMMDDHH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        }

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
    },
    serializeWithFile: function serializeWithFile(data, fileName, fileObj) {
        var params = new FormData();

        if (fileObj) fileObj.map(function (item) {
            params.append(fileName, item);
        });else params.append(fileName, "");

        for (var key in data) {
            if (_typeof(data[key]) == 'object') {
                params.append(key, JSON.stringify(data[key]));
            } else params.append(key, data[key]);
        }

        return params;
    },
    push: function push(path, query) {
        var url = path;
        if (query) url = {
            pathname: path,
            query: query
        };

        _reactRouter.hashHistory.push(url);
    },
    convertDateFormat: function convertDateFormat(date, fmtA, fmtB, empty) {
        var result = "";
        if (date) {
            if (fmtA && fmtB) {
                result = (0, _moment2.default)(date, fmtA).format(fmtB);
                return result == "Invalid date" ? empty || "" : result;
            } else {
                result = (0, _moment2.default)(date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss");
                return result == "Invalid date" ? empty || "" : result;
            }
        } else {
            return empty || "";
        }
    }
};