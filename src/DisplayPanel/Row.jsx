import React from 'react';
import './style.css';

export default React.createClass({
   getDefaultProps: function() {
      return {
         label:'',
         data:''
      };
   },
   render() {
      const { props: { label , data } } = this;

      let klassName = 'displayPanel-label';

      if( !label ) {

         klassName = 'displayPanel-noLabel'

      }

      return (
         <div className = 'displayPanel-flex displayPanel-row '>
            <div className = {klassName} >{ label ? label + '：' : ''}</div>
            <div className = 'displayPanel-flex displayPanel-content'>{data}</div>
         </div>
      );
   }
})
