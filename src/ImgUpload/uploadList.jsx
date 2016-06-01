import React from 'react';
import Animate from 'rc-animate';
import classNames from 'classnames';
import Modal from 'react-modal';
import { Icon } from 'antd';
import { Gallery } from 'component';


export default class UploadList extends React.Component {
  static defaultProps = {
    listType: 'picture',  // or text
    items: [],
    progressAttr: {
      strokeWidth: 3,
      showInfo: false
   },

  };

  handleImageRemove(img){
      let arr = [];
      if(this.props.items) {
         arr = this.props.items.filter(file => file.key == img.id)
      }

      this.props.onRemove && this.props.onRemove(arr[0]);
  }

  renderGallery() {
      let images = [];

      if (this.props.items) {
          images = this.props.items.map(function (file) {
             return {
                  id: file.key,
                  src: file.src
             }
          });
      }

      return images;
   }



  render() {

    let aspectRatio = 1;

    if(this.props.aspectRatio && !_.isNaN(this.props.aspectRatio)) {

      aspectRatio = this.props.aspectRatio;

    }

    const thumbnailWidth = 96 * aspectRatio;

    const thumbnailStyle = {
      height: 80,
      width: thumbnailWidth - 16
   }

    return (
      <span style={{ display: 'inline-block', marginRight:'10px' }}>
        <Gallery onImageRemove={this.handleImageRemove.bind(this)} images={this.renderGallery()} thumbnailStyle={thumbnailStyle}  />
      </span>
    );
  }
}
