/**
 * Created by neo on 15/12/12.
 */
/**
 * Module dependencies
 */

var React = require('react');
var Filepicker = require('component-file-picker');
var File = require('component-file');
var ClassSet = require('classnames');
var noop = function () {
};

require('./react-upload.css');

var Droppie = React.createClass({

    propTypes: {
        image: React.PropTypes.string,
        defaultImage: React.PropTypes.string,
        alt: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        onError: React.PropTypes.func,
        showButton: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        filetypes: React.PropTypes.array,
        style: React.PropTypes.object,
        buttonStyle: React.PropTypes.object,
        errorStyle: React.PropTypes.object,
        maxSize: React.PropTypes.number,
        field: React.PropTypes.string,
        tips: React.PropTypes.string,
        showValidMsg: React.PropTypes.bool,
    },

    getDefaultProps: function () {
        return {
            filetypes: ['image/*'],
            onError: noop,
            style: {},
            buttonStyle: {},
            errorStyle: {},
            field: "fileUpload",
            maxSize: 5,
            showValidMsg: false,
        };
    },

    getInitialState: function () {
        return {
            onDragOver: false,
            error: false
        };
    },
    renderBtn(){
        if (this.props.showButton)
            return <div className="btn-box">
                <button style={this.props.buttonStyle} className='btn-upload' onClick={this.onClick}>
                    {this.props.showButton}
                </button>
                <span className="tips">{this.props.tips}</span>
            </div>
    },
    clearError: function () {
        var self = this;
        setTimeout(function () {
            // 动态更新state
            self.setState({error: ""});
        }, 3000);
    },
    renderError(){
        //todo 延时清空
        if (this.state.error) {

           if(!this.props.showValidMsg) {
             this.clearError();
            }

            return <div style={this.props.errorStyle} className='error'>
                {this.state.error}
            </div>
        }
    },
    renderImage(){
        if (this.props.image)
            return <img src={this.props.image} alt=""/>
        else if (this.props.defaultImage)
            return <img src={this.props.defaultImage} alt=""/>
    },
    render: function () {
        var {image, ...other} = this.props;

        var classes = ClassSet({
            'input-upload': true,
            'on-drag-over': this.state.onDragOver,
            'has-image': image
        });

        return (
            <div>
                {this.renderError()}
                <div {...other}
                    className={classes}
                    role='image'
                    aria-label={this.props.alt || 'Image dropzone'}
                    onDragEnter={this.onDragEnter}
                    onDragOver={this.onDragOver}
                    onDragLeave={this.onDragLeave}
                    onDrop={this.onDrop}
                    onClick={this.onClick}>
                    {this.renderImage()}
                </div>
                {this.renderBtn()}
            </div>
        );
    },

    onDragEnter: function (e) {
        e.preventDefault();
        this.setState({onDragOver: true});
    },

    onDragOver: function (e) {
        e.preventDefault();
    },

    onDragLeave: function (e) {
        this.setState({onDragOver: false});
    },

    remove: function (e) {
        this.props.onChange(null);
    },

    onDrop: function (e) {
        this.setState({onDragOver: false});
        e.preventDefault();
        this.getFile(e.dataTransfer.files[0]);
    },

    onClick: function (e) {
        e.preventDefault();
        Filepicker(files => this.getFile(files[0]));
    },
    onError(message) {
        this.setState({error: message});
    },
    getAllowFileType(){
        return this.props.filetypes.map(function (item) {
            return item.split('/')[1];
        })
    },
    getFile: function (file) {
        var image = new File(file);

        for (let i = 0, len = this.props.filetypes.length; i < len; i++) {
            if (!image.is(this.props.filetypes[i])) {
                let types = this.getAllowFileType();

                this.onError('只支持' + types.join(',') + "格式");
                return;
            }
        }

        if (image.size > this.props.maxSize * 1024 * 1024) {
            this.onError("图片不能超过" + this.props.maxSize + "M大小");
        } else
            this.onError("");


        image.toDataURL((err, str) => {
            if (err) {
                this.onError('略缩图加载失败.', err);
                return;
            }

            this.props.onChange(str, file);
        });
    }

});

module.exports = Droppie;
