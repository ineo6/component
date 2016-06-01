
import React, {PropTypes} from 'react';

import {Message} from 'component';


const now = +(new Date());
let index = 0;
function imageid(){
   return 'imageid-' + now + '-' + (++index);
}

export default React.createClass({

  propTypes: {
    onFileLoaded: PropTypes.func,
  },

  onChange(e) {

    const files = e.target.files;
    const reader = new FileReader();

    reader.onload = () => {

      let type = files[0].type.split('/')[0];

      if(type && type == "image") {

         this.onFileLoaded(files[0], reader.result);

      } else {
         Message.error('请选择图片文件！')
      }


    };

    reader.readAsDataURL(files[0]);
  },

  onFileLoaded(file, src) {

     const fileObj = {
        file,
        src,
        key:imageid(),
        mimeType: file.type,
      };


     this.props.onFileLoaded && this.props.onFileLoaded(fileObj);

  },

  onClick() {
    const el = this.refs.file;
    if (!el) {
      return;
    }
    el.click();
    el.value = '';
  },

  onKeyDown(e) {
    if (e.key === 'Enter') {
      this.onClick();
    }
  },

  render() {
    const hidden = {display: 'none'};
    const props = this.props;
    return (
      <span
        className = 'input-klass'
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        onDrop={this.onFileDrop}
        onDragOver={this.onFileDrop}
        role="button"
        tabIndex="0"
        >
        <input type="file"
               ref="file"
               style={hidden}
               accept={props.accept}
               multiple={this.props.multiple}
               onChange={this.onChange}/>
        {props.children}
      </span>
    );
  }

});
