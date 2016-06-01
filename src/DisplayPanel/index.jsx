
import React from 'react';

import './style.css';

import Row from './Row';

import Row2 from './Row2';

import DisabledCheckbox from './DisabledCheckbox';

const KEY_PREFIX = 'keyFromDisplayPanel-';

let key = 0;

const COM = React.createClass({
   getDefaultProps() {
      return {
         title:{
            content: '',
            klassName: '',
         },
         rows:[]
      };
   },

   renderRow(rows) {
      if( !rows || !_.isArray(rows) || rows.length == 0 ) {
         return;
      }
      const eles = [];
      let keyVal = 1;
      rows.map( val => {
         if( val.hasOwnProperty('label2') ) {
            eles.push(<Row2 key = { keyVal++ } { ...val } />);
         } else {
            eles.push(<Row key = { keyVal++ } { ...val } />);
         }
      });
      return eles;
   },

   getTitleClass (title) {

      if(title) {
         return 'displayPanel-title ' + title.klassName;

      } else {
         return 'displayNone';
      }

   },

   render() {
      const { props: { title , rows } } = this;

      const klassName = this.getTitleClass(title);
      return (
         <div className = 'displayPanel-container'>
            <h4 className = {klassName}> { title.content } </h4>
            { this.renderRow(rows) }
         </div>
      );
   },


})



const API = {
   /*
    * common useful apis
    */
   getPaddingSpan(txt){

      return (
         <span key = { KEY_PREFIX + (key++) } style = {{paddingRight:'20px'}}>{txt}</span>
      )

   },
   getPropFromArrayItem( prop, arr) {

      const result = [];

      if( !arr || !_.isArray(arr) || arr.length == 0 )
        return result;

      arr.map(val => {
        result.push(this.getPaddingSpan(val[prop]))

      })

      return result;
   },
   getDisabledCheckbox(args){

     const { txt, ...other } = args;

     return (
         <label key = { KEY_PREFIX + (key++) } style = {{ display: 'flex',paddingRight:'20px' }}>
            <DisabledCheckbox {...other}  />
            <span  style = {{paddingLeft:'10px' }}>{txt}</span>
         </label>
     )
   },
}

COM.DisabledCheckbox = DisabledCheckbox;
COM.API = API;

export default COM;
