import React from 'react';

import './style.css';

export default React.createClass({
   getDefaultProps: function() {
      return {
         label: '',
         data: '',
         label2: '',
         data2: ''
      };
   },
   render() {

      const { props: { label , data , label2 , data2 } } = this;
      return (
         <div className = 'displayPanel-flex displayPanel-row'>
            <div className = 'displayPanel-label'>{ label + '：' }</div>
            <div className = 'displayPanel-flex displayPanel-content2'>{ data }</div>
            <div className = 'displayPanel-label'>{ label2 + '：' }</div>
            <div className = 'displayPanel-flex displayPanel-content2'>{ data2 }</div>
         </div>
      );
   }
})
