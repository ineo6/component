/**
 * Created by ruiy on 10/22/15.
 */

'use strict';

import React from 'react';
import {Link} from 'react-router';
import {Select} from 'antd';
const Option = Select.Option;

import './style.css';


let FunctionButtonsNew = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    propTypes: {
        multi: React.PropTypes.bool,
        functions: React.PropTypes.array
    },
    getDefaultProps: function () {
        return {
            multi: false
        };
    },
    getInitialState(){
        let defaultMenu = "";

        if (this.props.multi && this.props.functions.length > 0) {
            defaultMenu = this.props.functions[0].code;
        }

        return {
            menu: defaultMenu
        }
    },
    getCurrentRouteBelong(){
        let routes = this.getRoutes(),
            currentMenuName = []

        //当前路径
        if (routes && routes.length > 0)
            currentMenuName = routes[routes.length - 1].name.split('-');

        return currentMenuName ? currentMenuName[1] : ""
    },
    renderMultiItem(){
        let currentMenu = [];


        this.props.functions.forEach(item=> {

            //不从state,根据url地址判断
            if (item.code == this.getCurrentRouteBelong()) {
                currentMenu = item.children;
                return false;
            }
        });

        return currentMenu;
    },
    getOthers(btn){
        let path = "", params, query;

        if (btn.others) {
            params = btn.others.params;
            query = btn.others.query;
        }

        if (params) {
            for (let key in params) {
                if (params.hasOwnProperty(key)) {
                    if (params[key]) {
                        path = btn.path.replace(key, params[key]);
                    }
                }
            }
        }
        else
            path = btn.path;

        return {path, query};
    },
    getMenuList(){
        let buttons = this.props.functions;
        if (this.props.multi) {
            buttons = this.renderMultiItem();
        }

        buttons = buttons.map(function (btn, index) {
            let {path, query}=this.getOthers(btn);

            return <Link
                activeClassName="active"
                key={btn.name}
                className="link-button"
                to={{pathname:path,query:query}}>{btn.name}</Link>;
        }.bind(this));

        return buttons;
    },
    handleMenuChange(value, option){
        this.setState({menu: value});
        this.context.router.push(option.extra.path);
    },
    render() {

        let moduleSelect = null;

        if (this.props.multi) {
            moduleSelect = <ModuleSelect menu={this.getCurrentRouteBelong()}
                                         menuList={this.props.functions}
                                         onChange={this.handleMenuChange}/>
        }

        return (
            <div className="func-btns">
                {moduleSelect}
                {this.getMenuList()}
            </div>
        );
    }
});

let ModuleSelect = React.createClass({
    renderMenuDict(){
        let firstLink = null;
        return this.props.menuList.map(item=> {
            firstLink = item.children && item.children[0];
            return <Option key={item.code} value={item.code}
                           extra={firstLink}>{item.name}</Option>
        })
    },
    handleTypeChange(value, option){
        this.props.onChange(value, option);
    },
    render(){
        return (
            <div className="module-select">
                <Select
                    value={this.props.menu}
                    style={{width:"100%",marginBottom:"0.5rem",textAlign:"left"}}
                    size="large"
                    onChange={this.handleTypeChange}>
                    {this.renderMenuDict()}
                </Select>
            </div>
        )
    }
});

export default FunctionButtonsNew;
