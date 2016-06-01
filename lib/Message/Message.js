'use strict';

require('./Message.css');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Created by neo on 16/1/4.
                                                                                                                                                                                                                   */


var React = require('react');
var Notification = require('rc-notification');
var classnames = require('classnames');
var defaultDuration = 1.5;
var messageInstance = void 0;
var key = 1;
var prefixCls = 'mask-message';
var transitionName = 'move-up';
var className = void 0;

function getMessageInstance() {
    messageInstance = messageInstance || Notification.newInstance({
        prefixCls: prefixCls,
        className: className,
        transitionName: transitionName,
        style: {
            left: "50%"
        } // 覆盖原来的样式
    });
    return messageInstance;
}

function notice(content) {
    var duration = arguments.length <= 1 || arguments[1] === undefined ? defaultDuration : arguments[1];

    var _classnames;

    var type = arguments[2];
    var onClose = arguments[3];

    var iconClass = {
        'info': 'kuma-icon fa fa-info-circle fa-2x kuma-icon-information',
        'success': 'kuma-icon fa fa-check-circle fa-2x kuma-icon-success',
        'error': 'kuma-icon fa fa-times-circle fa-2x kuma-icon-error',
        'loading': 'kuma-icon fa fa-spinner fa-2x kuma-message-loading'
    }[type];

    var instance = getMessageInstance();
    instance.notice({
        key: key,
        duration: duration,
        style: { right: '50%' },
        content: React.createElement(
            'div',
            { className: classnames((_classnames = {}, _defineProperty(_classnames, prefixCls + '-container ' + prefixCls + '-container-' + type, true), _defineProperty(_classnames, 'fn-clear', true), _classnames)) },
            React.createElement(
                'div',
                { className: prefixCls + '-icon' },
                React.createElement('i', { className: iconClass })
            ),
            React.createElement(
                'p',
                { className: prefixCls + '-content' },
                content
            )
        ),
        onClose: onClose
    });
    return function () {
        var target = key++;
        return function () {
            instance.removeNotice(target);
        };
    }();
}

module.exports = {
    info: function info(content, duration, onClose) {
        return notice(content, duration, 'info', onClose);
    },
    success: function success(content, duration, onClose) {
        return notice(content, duration, 'success', onClose);
    },
    error: function error(content, duration, onClose) {
        return notice(content, duration, 'error', onClose);
    },
    loading: function loading(content, duration, onClose) {
        return notice(content, duration, 'loading', onClose);
    },
    config: function config(options) {
        prefixCls = options.prefixCls || prefixCls;
        transitionName = options.transitionName || transitionName;
        className = options.className || className;
    }
};