/**
 * Created by neo on 16/5/26.
 */

import React from 'react';
import Icon from 'react-fa';

import {PanelModal} from 'component';

const cStyles = {
    content: {
        top: '20%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -20%)',
        border: 'none',
        padding: 0,
        width: '700px'
    }
};

let HelpTips = React.createClass({
    getInitialState(){
        return {
            open: false
        }
    },
    toggleModal: function () {
        this.setState({open: !this.state.open});
    },
    render(){
        let {title, children, className, customStyles}=this.props;

        if (customStyles == undefined)
            customStyles = cStyles;

        return (
            <div className={className}>
                <a onClick={this.toggleModal}>帮助<Icon name="question"/></a>
                <PanelModal
                    isOpen={this.state.open}
                    closeModal={this.toggleModal}
                    title={title||"帮助"}
                    customStyles={customStyles}>
                    {children}
                </PanelModal>
            </div>
        )
    }
});

export default HelpTips;