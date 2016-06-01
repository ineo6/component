import React from 'react';

import { Checkbox } from 'antd';

import './disabledCheckbox.css';

const DisabledCheckbox =  React.createClass({
   render() {
      const { props: { disabled, ...other } } = this
      return (
            <div className = 'disabledCheckbox-container'>
               <Checkbox disabled = {true} { ...other } />
            </div>
      );
   }
});

export default DisabledCheckbox;
