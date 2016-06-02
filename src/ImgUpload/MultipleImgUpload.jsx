import React from 'react';
import ImgUpload from './ImgUpload';
import { Icon } from 'antd';


export default React.createClass({
   getDefaultProps: function() {
      return {
         text:'上传图片'
      };
   },
   render() {
      return (
         <ImgUpload ref='imgUpload' onChange={(file)=>console.log(file)} >
            <div className = 'upload-input-container'>
              <Icon type="plus" />
              <div className="ant-upload-text">{this.props.text}</div>
            </div>
         </ImgUpload>
      );
   }
})
