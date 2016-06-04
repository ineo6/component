import React from 'react';
import Modal from 'react-modal';
import Icon from 'react-fa';
import './cropper.css';
import Cropper from 'react-cropper';
import {Button} from 'antd';


export default React.createClass({

    //life cycle
    getInitialState: function () {
        return {
            modalIsOpen: false
        };
    },

    componentWillReceiveProps(nextProps) {

        if (!_.eq(nextProps.fileObj, this.props.fileObj)) {
            this.setState({modalIsOpen: true});
        }

    },

    render() {

        const cropperProps = this.getCropperProps();
        const modalProps = this.getModalProps();

        return (
            <Modal { ...modalProps }>
                <div style={{overflow:'hidden'}} className="modal-content">
                    <div className="modal-header" style={{ padding: '10px' }}>
                        <a onClick={ this.cancelHandler } className="close">
                            <Icon name="times"/>
                        </a>
                        <h4 className="modal-title">修剪图片</h4>
                    </div>
                    <div className="modal-body" style={{ padding:'0px'}}>
                        <Cropper ref='cropper' { ...cropperProps } />
                    </div>
                    <div className="modal-footer" style={{ padding: '10px' }}>
                        <Button type="ghost" style={{ marginRight: '10px' }} onClick={this.cancelHandler}>取消</Button>
                        <Button type="primary" onClick={this.confirmHandler}>确定</Button>
                    </div>
                </div>
            </Modal>
        )
    },

    // event

    cancelHandler(){
        this.setState({modalIsOpen: false});
    },

    confirmHandler(){

        const fileObj = {
            src: '',
            file: null,
            key: this.props.fileObj.key,
            mimeType: this.props.fileObj.mimeType,
            status: 'done'
        };

        const canvas = this.refs.cropper.getCroppedCanvas();

        if (typeof canvas !== 'undefined') {

            fileObj.src = canvas.toDataURL('image/jpeg', this.props.quality);

            fileObj.file = this.btof(fileObj.src, fileObj);

        }

        this.props.onImageCrop && this.props.onImageCrop(fileObj);

        this.setState({modalIsOpen: false});
    },
    getCropperProps (){
        const {fileObj, aspectRatio} = this.props;
        return {
            style: {height: 400, width: '100%'},
            aspectRatio,
            guides: false,
            src: fileObj ? fileObj.src : '',
            ref: "cropper"
        }
    },

    getModalProps (){

        return {
            closeTimeoutMS: 150,
            isOpen: this.state.modalIsOpen,
            style: this.getModalStyle()
        }

    },
    getModalStyle () {
        return {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                border: 'none',
                padding: 0,
                width: '480px'
            }
        }
    },
    btof(data, fileObj) {
        const dataArr = data.split(',');
        const byteString = atob(dataArr[1]);
        const options = {
            type: 'image/jpeg',
            endings: 'native'
        }
        var u8Arr = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            u8Arr[i] = byteString.charCodeAt(i);
        }
        return new File([u8Arr], `${fileObj.key}.jpg`, options);
    },

})
