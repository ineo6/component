/**
 * Created by neo on 16/4/12.
 */

import React from 'react';
import config from '../config';

function getValue(string) {
    return string ? string : "";
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

    formatAddress(address, building, floor, unit, room){
        return getValue(address) + getValue(building) + (floor ? floor + "楼" : "") + getValue(unit) + getValue(room)
    },

    splitDate(date){
        let dateArr = [];
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
    }
}

