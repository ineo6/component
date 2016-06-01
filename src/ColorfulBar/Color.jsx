import React, { PropTypes as T, Component } from 'react';
import { Tooltip } from 'antd';

class Color extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      const {  className, tooltipTitle, tooltipPlacement } = this.props;
      const style = this.props.style || {};
      style.height = style.height || '1em';
      style.cursor = style.cursor || 'pointer';
      const tooltipProps = {
         title:tooltipTitle,
         placement:tooltipPlacement
      }
      return (
         <Tooltip {...tooltipProps}>
            <div className = {className} style = {style}></div>
         </Tooltip>
      );
   }
}
Color.propTypes ={
   num: T.number.isRequired,
}
export default Color;
