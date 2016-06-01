import React, { Children } from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

function getDefaultActiveKey(props) {
  let activeKey;
  React.Children.forEach(props.children, (child) => {
    if (!activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });
  return activeKey;
}

const RadioTab = React.createClass({

   getAllRadio(labels){

      if( ! labels || ! _.isArray(labels) || labels.length == 0 ) {
         return;
      }

      const groupName = `radio-${ Math.floor( Math.random() * 10000000 ) }`;

      const result = [];

      // result.push(<div style = {{display:'flex'}}><div style = {{paddingTop:'2px'}}><input type="radio" defaultChecked name={groupName} value="item0" /></div><div>{labels[0]}</div></div>);
      result.push(this.createRadioTab({groupName,inputVal:'item0',labelTxt:labels[0],defaultChecked:'defaultChecked',ref:'tab0'}));

      for( var i = 1,len = labels.length ; i < len ; i ++ ) {

         result.push(this.createRadioTab({groupName,inputVal:`item${i}`,labelTxt:labels[i],ref:`tab${i}`}));

      }



      return result;

    },
    getInitialState() {
       const props = this.props;
       let activeKey;
       if ('activeKey' in props) {
         activeKey = props.activeKey;
       } else if ('defaultActiveKey' in props) {
         activeKey = props.defaultActiveKey;
       } else {
         activeKey = getDefaultActiveKey(props);
       }
       return {
         activeKey,
       };
    },
    createRadioTab(args){

      const { groupName, inputVal, labelTxt, ...other } = args

      return (
         <div style = {{display:'flex'}}>
            <div style = {{paddingTop:'2px'}}>
               <input type="radio" {...other} name={groupName} value={inputVal} />
            </div>
            <div style = {{marginLeft:'20px'}}>{labelTxt}</div>
         </div>
      )

    },

   getNewChildren(children){
      const newChildren = [];
      const groupName = `radio-${ Math.floor( Math.random() * 10000000 ) }`;

      let i = 0;

      const self = this;

      Children.forEach(children,function(child) {

         if(!_.isString(child.props.tab)){

            return children;

         } else {

            const childProps = { ...child.props };

            let defaultChecked = false;

            if( i == 0 ) {
               defaultChecked = true;
            }

            childProps.tab = self.createRadioTab({
               groupName,
               inputVal: child.key,
               labelTxt: child.props.tab,
               ref: child.key,
               defaultChecked
            });

            React.cloneElement(child, childProps)

            newChildren.push(React.cloneElement(child, childProps));

            i ++ ;

         }

      });

      return newChildren;
   },
   onTabClick(key){

     this.refs[key].checked = {true};

     this.setState({activeKey: key});

     this.props.onTabClick && this.props.onTabClick(key);

   },
   getValue(){

      return this.state.activeKey;

   },
   render () {

      const { children , onTabClick , ...others }  =this.props;

      const newChildren = this.getNewChildren(children);
      return (
         <Tabs ref = 'tabs' onTabClick = { this.onTabClick } { ...others }>
            {newChildren}
         </Tabs>
      )
   }
});

RadioTab.TabPane = Tabs.TabPane;

export default RadioTab;
