'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TabPane = _antd.Tabs.TabPane;

function getDefaultActiveKey(props) {
      var activeKey = void 0;
      _react2.default.Children.forEach(props.children, function (child) {
            if (!activeKey && !child.props.disabled) {
                  activeKey = child.key;
            }
      });
      return activeKey;
}

var RadioTab = _react2.default.createClass({
      displayName: 'RadioTab',
      getAllRadio: function getAllRadio(labels) {

            if (!labels || !_.isArray(labels) || labels.length == 0) {
                  return;
            }

            var groupName = 'radio-' + Math.floor(Math.random() * 10000000);

            var result = [];

            // result.push(<div style = {{display:'flex'}}><div style = {{paddingTop:'2px'}}><input type="radio" defaultChecked name={groupName} value="item0" /></div><div>{labels[0]}</div></div>);
            result.push(this.createRadioTab({ groupName: groupName, inputVal: 'item0', labelTxt: labels[0], defaultChecked: 'defaultChecked', ref: 'tab0' }));

            for (var i = 1, len = labels.length; i < len; i++) {

                  result.push(this.createRadioTab({ groupName: groupName, inputVal: 'item' + i, labelTxt: labels[i], ref: 'tab' + i }));
            }

            return result;
      },
      getInitialState: function getInitialState() {
            var props = this.props;
            var activeKey = void 0;
            if ('activeKey' in props) {
                  activeKey = props.activeKey;
            } else if ('defaultActiveKey' in props) {
                  activeKey = props.defaultActiveKey;
            } else {
                  activeKey = getDefaultActiveKey(props);
            }
            return {
                  activeKey: activeKey
            };
      },
      createRadioTab: function createRadioTab(args) {
            var groupName = args.groupName;
            var inputVal = args.inputVal;
            var labelTxt = args.labelTxt;

            var other = _objectWithoutProperties(args, ['groupName', 'inputVal', 'labelTxt']);

            return _react2.default.createElement(
                  'div',
                  { style: { display: 'flex' } },
                  _react2.default.createElement(
                        'div',
                        { style: { paddingTop: '2px' } },
                        _react2.default.createElement('input', _extends({ type: 'radio' }, other, { name: groupName, value: inputVal }))
                  ),
                  _react2.default.createElement(
                        'div',
                        { style: { marginLeft: '20px' } },
                        labelTxt
                  )
            );
      },
      getNewChildren: function getNewChildren(children) {
            var newChildren = [];
            var groupName = 'radio-' + Math.floor(Math.random() * 10000000);

            var i = 0;

            var self = this;

            _react.Children.forEach(children, function (child) {

                  if (!_.isString(child.props.tab)) {

                        return children;
                  } else {

                        var childProps = _extends({}, child.props);

                        var defaultChecked = false;

                        if (i == 0) {
                              defaultChecked = true;
                        }

                        childProps.tab = self.createRadioTab({
                              groupName: groupName,
                              inputVal: child.key,
                              labelTxt: child.props.tab,
                              ref: child.key,
                              defaultChecked: defaultChecked
                        });

                        _react2.default.cloneElement(child, childProps);

                        newChildren.push(_react2.default.cloneElement(child, childProps));

                        i++;
                  }
            });

            return newChildren;
      },
      onTabClick: function onTabClick(key) {

            this.refs[key].checked = { true: true };

            this.setState({ activeKey: key });

            this.props.onTabClick && this.props.onTabClick(key);
      },
      getValue: function getValue() {

            return this.state.activeKey;
      },
      render: function render() {
            var _props = this.props;
            var children = _props.children;
            var onTabClick = _props.onTabClick;

            var others = _objectWithoutProperties(_props, ['children', 'onTabClick']);

            var newChildren = this.getNewChildren(children);
            return _react2.default.createElement(
                  _antd.Tabs,
                  _extends({ ref: 'tabs', onTabClick: this.onTabClick }, others),
                  newChildren
            );
      }
});

RadioTab.TabPane = _antd.Tabs.TabPane;

exports.default = RadioTab;