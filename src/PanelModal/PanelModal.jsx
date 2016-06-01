/**
 * Created by neo on 15/10/30.
 */
import React from 'react';
import Icon from 'react-fa';
import Modal from 'react-modal';
import './PanelModal.css';

const customStyles = {
    content: {
        top: '20%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -20%)',
        border: 'none',
        padding: 0,
        width: '500px'
    }
};

let PanelModal = React.createClass({
    getInitialState(){
        return {
            isOpen: false
        }
    },
    whichStyle(){
        if (this.props.customStyles)
            return this.props.customStyles;
        else
            return customStyles
    },
    setModal(flag){
        this.setState({isOpen: flag == true})
    },
    closeModal(){
        if (this.props.isOpen === undefined)
            this.setModal(false);
        else
            this.props.closeModal();
    },
    render(){
        let {isOpen, title, id, children}=this.props;

        if (isOpen === undefined)
            isOpen = this.state.isOpen

        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={this.closeModal}
                style={this.whichStyle()}>
                <div className="cm-modal-dialog">
                    <div className="cm-modal-content">
                        <div className="cm-modal-header">
                            <a onClick={this.closeModal} className="close">
                                <Icon name="times"/>
                            </a>
                            <h4 className="cm-modal-title">{title ? title : ""}</h4>
                        </div>
                        <div className="cm-modal-body" id={id}>
                            {children}
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
})

export default PanelModal;