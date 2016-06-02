import ImageCropper from './ImageCropper';
import ImageInput from './ImageInput';
import UploadList from './uploadList';
import classNames from 'classnames';
import {Message} from 'component';
import React from 'react';


function noop() {
}

function T() {
  return true;
}
function getFileItem(file, fileList) {
  let target = fileList.filter((item) => {
    return item.key === file.key;
  })[0];
  return target;
}


export default
class Upload extends React.Component {

  static defaultProps = {
    type: 'select',
    multiple: false,
    onChange: noop,
    showUploadList: true,
    listType: 'pictrue',
    className: '',
    aspectRatio: 4 / 3,
    cropQuality: 0.9
  }

  constructor(props) {
    super(props);
    this.state = {
      fileList: this.props.fileList || this.props.defaultFileList || [],
      croppingFileObj:null
    };
  }

  onFileLoaded(fileObj) {
     this.setState({croppingFileObj: fileObj});

  }

  cropImage(fileObj){
      let targetItem = fileObj;
      let nextFileList = this.state.fileList.concat();
      if(this.props.showUploadList === false) {
         //不显示图片列表的情况下，清空列表
         nextFileList = [];

      }
      nextFileList.push(targetItem);
      this.onChange({
        file: targetItem,
        fileList: nextFileList
      });

  }

  onChange = (info) => {

    this.setState({
      fileList: info.fileList
    });
    this.props.onChange && this.props.onChange(info.file);

  }


  removeFile(file) {
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    let index = fileList.indexOf(targetItem);
    if (index !== -1) {
      fileList.splice(index, 1);
      return fileList;
    }
    return null;
  }

  handleRemove(file) {
    let fileList = this.removeFile(file);
    if (fileList) {
      this.onChange({
        file,
        fileList,
      });
    }
  }

  handleManualRemove = (file) => {
    file.status = 'removed';
    this.handleRemove(file);
  }

  componentWillReceiveProps(nextProps) {
    if ('fileList' in nextProps) {
      this.setState({
        fileList: nextProps.fileList || [],
      });
    }
  }

  getUploadList(){
     let uploadList;
     if (this.props.showUploadList) {
      uploadList = (
         <UploadList
            listType= { this.props.listType }
            items= {this.state.fileList}
            onRemove= {this.handleManualRemove}
            aspectRatio= {this.props.aspectRatio}
             />
      );
     }
     return uploadList;
  }

  getAspectRatio(){

     const { aspectRatio } = this.props;


     let aspectRatioNum = 1;

     if(aspectRatio && !_.isNaN(aspectRatio)) {

      aspectRatioNum = this.props.aspectRatio;

     }

     const thumbnailWidth = 96 * aspectRatio;

     return {
        ratio: aspectRatioNum,
        width: thumbnailWidth,
     }

  }

  render() {
      let type = this.props.type || 'select';
      let inputProps = {
         ...this.props,
         onFileLoaded: this.onFileLoaded.bind(this)
      };

      const aspectRatio = this.getAspectRatio();

      const uploadList = this.getUploadList();

      const cropperProps = {
         fileObj: this.state.croppingFileObj,
         onImageCrop: this.cropImage.bind(this),
         aspectRatio: aspectRatio.ratio,
         quality: this.props.cropQuality
      }

      return (
        <div style = {{position:'relative'}}>
           <span style = {{ display: 'inline-block' }}>
             {uploadList}
             <ImageInput {...inputProps}>
               {this.props.children}
             </ImageInput>
             <ImageCropper {...cropperProps}/>
           </span>
        </div>
      );
  }

  // useful api
  getAllFile() {

     const { fileList } = this.state;

     const arr = fileList.map(val=>val.file)

     return arr;
  }

}
