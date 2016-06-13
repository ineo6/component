'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _echarts = require('echarts');

var _echarts2 = _interopRequireDefault(_echarts);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactChart = function (_Component) {
   _inherits(ReactChart, _Component);

   function ReactChart(props) {
      _classCallCheck(this, ReactChart);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactChart).call(this, props));
   }

   _createClass(ReactChart, [{
      key: 'onResize',
      value: function onResize() {
         this.drawChart();
      }
   }, {
      key: 'componentDidMount',
      value: function componentDidMount() {

         window.addEventListener("resize", this.onResize.bind(this), false);

         var onReady = this.props.onReady;


         this.drawChart();

         onReady && onReady(this.chart);
      }
   }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {

         if (!_lodash2.default.eq(prevProps.children, this.props.children)) {
            this.drawChart();
         }
      }
   }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
         window.removeEventListener("resize", this.onResize.bind(this), false);
         this.chart.dispose();
      }
   }, {
      key: 'getChartData',
      value: function getChartData(options) {

         options.series = [];

         _react2.default.Children.map(this.props.children, function (child) {
            options.series.push(_extends({}, child.props));
         });
      }
   }, {
      key: 'drawChart',
      value: function drawChart() {

         var node = this.refs.chart;
         var options = this.filterMap(['backgroundColor', 'animation', 'calculable', 'renderAsImage', 'timeline', 'title', 'toolbox', 'tooltip', 'legend', 'dataRange', 'dataZoom', 'roamController', 'grid', 'color', 'xAxis', 'yAxis', 'series'], this.props);
         this.getChartData(options);
         this.chart = _echarts2.default.init(node);
         this.chart.setOption(options, this.props.theme);
      }
   }, {
      key: 'filterMap',
      value: function filterMap(filterArray, props) {
         var options = {};
         filterArray.map(function (key) {
            var option = props[key];
            if (option !== undefined) {
               options[key] = option;
            }
         });
         return options;
      }
   }, {
      key: 'renderChildren',
      value: function renderChildren() {
         return _react2.default.Children.map(this.props.children, function (child) {
            return (0, _react.cloneElement)(child, {
               hasChart: true
            });
         });
      }
   }, {
      key: 'render',
      value: function render() {
         var _props = this.props;
         var className = _props.className;
         var width = _props.width;
         var height = _props.height;
         var style = _props.style;

         return _react2.default.createElement(
            'div',
            {
               ref: 'chart',
               className: className,
               style: _extends({
                  height: height,
                  width: width
               }, style) },
            this.renderChildren()
         );
      }
   }]);

   return ReactChart;
}(_react.Component);

//


ReactChart.propTypes = {
   height: _react.PropTypes.number,
   width: _react.PropTypes.number,
   backgroundColor: _react.PropTypes.string,
   animation: _react.PropTypes.bool,
   calculable: _react.PropTypes.bool,
   renderAsImage: _react.PropTypes.bool,
   style: _react.PropTypes.object,
   theme: _react.PropTypes.object,
   timeline: _react.PropTypes.object,
   title: _react.PropTypes.object,
   toolbox: _react.PropTypes.object,
   tooltip: _react.PropTypes.object,
   legend: _react.PropTypes.object,
   dataRange: _react.PropTypes.object,
   dataZoom: _react.PropTypes.object,
   roamController: _react.PropTypes.object,
   grid: _react.PropTypes.object,
   color: _react.PropTypes.array,
   children: _react.PropTypes.node,
   xAxis: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]),
   yAxis: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]),
   onReady: _react.PropTypes.func
};
ReactChart.defaultProps = {
   height: 400
};
exports.default = ReactChart;