/**
 * Created by neo on 15/10/30.
 */
import React from 'react';
import Icon from 'react-fa';
import Modal from 'react-modal';
import './style.css';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right:'auto',
        bottom:'auto',
        border: 'none',
        outline: 'none',
        padding: '0px',
        minWidth:'700px',
        transform:'translate(-50%,-50%)',
    }
};

let PanelModal = React.createClass({
    whichStyle(){
        if (this.props.customStyles)
            return this.props.customStyles;
        else
            return customStyles
    },
    getDefaultProps: function() {
       return {
          tabs: []
       };
    },

    onTabChangeHandler(key) {

      this.props.onTabChange && this.props.onTabChange(key);


    },


    renderTabs(tabs){
      if(!tabs || !_.isArray(tabs) || tabs.length == 0) {
         return null;
      }

      const tabEles = [];

      tabs.forEach((val,index) => tabEles.push(<TabPane tab={val.title} key={ 'tab' + index }>{val.content || ''}</TabPane>));

      const result = (
         <Tabs onChange={this.onTabChangeHandler} type="card">
          {tabEles}
         </Tabs>
      );


      return result;
    },
    renderChildren(isNeed){

      let result = '';

      if(isNeed) {
         result = this.props.children;
      }

      return result;

    },
    render(){

      const { tabs } = this.props;
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.closeModal}
                style={this.whichStyle()}>
                <div className="tab-modal">
                    <div className="tab-cm-modal-content">
                        <div className="card-container">
                           <a onClick={this.props.closeModal} className="tab-modal-close">
                              <Icon name="times"/>
                           </a>
                           {  this.renderTabs(tabs) }
                        </div>
                        <div className="tab-cm-modal-body" id={this.props.id}>
                            {this.renderChildren(!tabs || !_.isArray(tabs) || tabs.length == 0)}
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
})

export default PanelModal;
