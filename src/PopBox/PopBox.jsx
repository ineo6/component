/**
 * Created by neo on 16/4/22.
 */
import React from 'react';
import {Popover, Button} from 'antd';

const noop = function () {
};

let PopBox = React.createClass({
    getDefaultProps: function () {
        return {
            onChange: noop
        };
    },
    getInitialState() {
        return {
            visible: false
        };
    },
    hide() {
        this.setState({
            visible: false
        });
        const self = this;
        process.nextTick(this.handleVisibleChange.bind(self,false));
    },
    handleVisibleChange(visible) {
        this.setState({visible});
        this.props.onChange(visible);
    },
    render() {
        const {children, visible, ...other}=this.props;

        return (
            <Popover {...other}
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}>
                {children}
            </Popover>
        );
    }
});

export default PopBox;
