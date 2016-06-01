/**
 * Created by neo on 16/1/4.
 */
import './Message.css';

let React = require('react');
let Notification = require('rc-notification');
let classnames = require('classnames');
let defaultDuration = 1.5;
let messageInstance;
let key = 1;
let prefixCls = 'mask-message';
let transitionName = 'move-up';
let className;

function getMessageInstance() {
    messageInstance = messageInstance || Notification.newInstance({
            prefixCls: prefixCls,
            className: className,
            transitionName: transitionName,
            style: {
                left:"50%"
            }  // 覆盖原来的样式
        });
    return messageInstance;
}

function notice(content, duration = defaultDuration, type, onClose) {
    let iconClass = ({
        'info': 'kuma-icon fa fa-info-circle fa-2x kuma-icon-information',
        'success': 'kuma-icon fa fa-check-circle fa-2x kuma-icon-success',
        'error': 'kuma-icon fa fa-times-circle fa-2x kuma-icon-error',
        'loading': 'kuma-icon fa fa-spinner fa-2x kuma-message-loading'
    })[type];

    let instance = getMessageInstance();
    instance.notice({
        key: key,
        duration: duration,
        style: {right: '50%'},
        content: <div className={classnames({
                [`${prefixCls}-container ${prefixCls}-container-${type}`]: true,
                'fn-clear': true
            })}>
            <div className={prefixCls + '-icon'}><i className={iconClass}></i></div>

            <p className={prefixCls + '-content'}>{content}</p>
        </div>,
        onClose: onClose
    });
    return (function () {
        let target = key++;
        return function () {
            instance.removeNotice(target);
        };
    })();
}

module.exports = {
    info(content, duration, onClose) {
        return notice(content, duration, 'info', onClose);
    },
    success(content, duration, onClose) {
        return notice(content, duration, 'success', onClose);
    },
    error(content, duration, onClose) {
        return notice(content, duration, 'error', onClose);
    },
    loading(content, duration, onClose) {
        return notice(content, duration, 'loading', onClose);
    },
    config(options) {
        prefixCls = options.prefixCls || prefixCls;
        transitionName = options.transitionName || transitionName;
        className = options.className || className;
    }
};