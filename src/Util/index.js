/**
 * Created by neo on 16/4/12.
 */

import React from 'react';
import moment from 'moment';
import config from '../config';

function getValue(string) {
    return string ? string : "";
}

function addUnit(value, units) {
    let str = "";
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

export default {

    getDefaultCity() {
        let cityJson = config.defaultCity;

        if (localStorage.managerDefaultCity) {
            cityJson = JSON.parse(localStorage.managerDefaultCity);
        }

        return cityJson;
    },

    setDefaultCity(city) {
        let cityJson = config.defaultCity;

        if (localStorage.managerDefaultCity && city == false) {
            cityJson = JSON.parse(localStorage.managerDefaultCity);
        }
        else if (city) {
            cityJson = city;
            localStorage.managerDefaultCity = JSON.stringify(cityJson);
        }

        return cityJson;
    },

    getBuilding(value){
        return addUnit(value, ["栋", "幢", "座", "楼"]);
    },

    getUnitNo(value){
        return addUnit(value, ["单元"]);
    },

    formatAddress(address, building, floor, unit, room){
        return getValue(address) + this.getBuilding(building) + (floor ? floor + "楼" : "") + this.getUnitNo(unit) + getValue(room)
    },

    splitDate(date){
        let dateArr = [];

        if (Number(date)) {
            //字符串
            date = moment(date, "YYYYMMDDHH:mm:ss").format("YYYY-MM-DD HH:mm:ss");

        }

        if (date) {
            dateArr = date.split(" ");

            return (
                <div>
                    {dateArr[0]}<br/>{dateArr[1]}
                </div>
            )
        }
        else
            return date;
    },

    serializeWithFile(data, fileName, fileObj){
        var params = new FormData();

        if (fileObj)
            fileObj.map(function (item) {
                params.append(fileName, item);
            });
        else
            params.append(fileName, "");

        for (var key in data) {
            if (typeof data[key] == 'object') {
                params.append(key, JSON.stringify(data[key]));
            }
            else
                params.append(key, data[key]);
        }

        return params;
    }

}

