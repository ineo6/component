'use strict';

import React from 'react';

import {RouteHandler} from 'react-router';

import FunctionButtons from '../FunctionButtons/';

import './index.css';

const create = (options) => React.createClass({
    displayName: options.displayName,
    render: function () {
        return (
            <div className="panel-box">
                <FunctionButtons multi={options.multi}
                                 functions={ options.btnList }/>
                <div className="panel-box-body">
                    <RouteHandler/>
                </div>
            </div>
        )
    }
});

export default {create}
