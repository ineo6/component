import React, { Component, Children } from 'react';

import Color from './Color';

import './style.css';

class ColorfulBar extends Component{
   constructor(props){
      super(props);
   }
   renderChildren(children){
      let sumNum = 0;
      Children.map(children,child => {
         sumNum += child.props.num || 0
      });
      const newChildren = [];
      Children.map(children,(child,index) => {
         const width = ( child.props.num || 0 ) * 100 / sumNum;
         const style = {};
         style.width = width + '%';
         const key = Math.random();
         const newChild = (
            <div key ={key} style={style}>
               {child}
            </div>
         );
         newChildren.push(newChild);
      })
      return newChildren;
   }
   render() {
      const { children } = this.props;
      return (
         <div className = 'colorBar-container'>
            &nbsp;
            <div className = 'colorBar-vertical-center'>
            { this.renderChildren(children) }
            </div>
         </div>
      );
   }

}
ColorfulBar.Color = Color;

export default ColorfulBar;
