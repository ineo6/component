以下是简单的示例

多文件的上传, 带有文件列表的
```` css
.upload-input-container{
  border: 1px dashed #d9d9d9;
  width: 96px;
  height: 96px;
  padding: 24px 0;
  border-radius: 6px;
  background-color: #fbfbfb;
  text-align: center;
  cursor: pointer;
  -webkit-transition: border-color .3s ease;
  transition: border-color .3s ease;
  display: inline-block;
  vertical-align: top;
  margin: 0 8px 8px 0px;
}

.upload-input-container:hover{
  border-color: #2db7f5;
}
.upload-input-container-a i {
    font-size: 28px;
    color: #999;
}

.upload-input-container .ant-upload-text {
    margin-top: 8px;
    font-size: 12px;
    color: #666;
}
.upload-input-container:focus{
  border:none;
  outline-color: #fff !important;
}

.upload-input-container>span {
    display: block;
    width: 100%;
    outline: none;
}
````
```` jsx
import { ImgUpload }  from 'component';

<ImgUpload ref='imgUpload' onChange={(file)=>console.log(file)} >
   <div className = 'upload-input-container'>
     <Icon type="plus" />
     <div className="ant-upload-text">上传照片</div>
   </div>
</ImgUpload>


const images = this.refs.imgUpload.getAllFile();
var param = new FormData();
if (images && images.length > 0)
       images.map(function (image) {
           param.append("images", image);
       });
   else
       param.append("images", "");

````

可以用为头像修改，不显示列表

```` jsx
<ImgUpload showUploadList ={false} onChange={this.onChange.bind(this)} >
  <Button>头像</Button>
</ImgUpload>

<img ref = 'showImg' src = { this.state.imgSrc } />


onChange(fileObj){

  // img 标签的src
  // fileObj.src;

  // img 文件
  // fileObj.file;

  this.setState({currentFile:fileObj.file,imgSrc:fileObj.src})

}

````
