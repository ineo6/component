import React, { Component, cloneElement, PropTypes as T } from 'react';

import echarts from 'echarts';

import _ from 'lodash';

export default
 class ReactChart extends Component {
    static propTypes = {
         height: T.number,
         width: T.number,
         backgroundColor: T.string,
         animation: T.bool,
         calculable: T.bool,
         renderAsImage: T.bool,
         style: T.object,
         theme: T.object,
         timeline: T.object,
         title: T.object,
         toolbox: T.object,
         tooltip: T.object,
         legend: T.object,
         dataRange: T.object,
         dataZoom: T.object,
         roamController: T.object,
         grid: T.object,
         color: T.array,
         children: T.node,
         xAxis: T.oneOfType([
           T.object,
           T.array,
         ]),
         yAxis: T.oneOfType([
           T.object,
           T.array,
         ]),
         onReady: T.func,
    }

    static defaultProps = {
       height: 400,
    }

    constructor(props) {
      super(props);
      this.onResize = this.onResize.bind(this);

   }

   onResize(){
      this.drawChart()
   }

   componentDidMount() {

      window.addEventListener("resize", this.onResize, false)

      const { onReady } = this.props

      this.drawChart()

      onReady &&　onReady(this.chart)

   }

   componentDidUpdate(prevProps) {

      if( !_.eq(prevProps.children, this.props.children) ) {
         this.drawChart();
      }

   }

   componentWillUnmount() {
      window.removeEventListener("resize", this.onResize, false);
      this.chart.dispose();
   }

   getChartData(options) {

      options.series = [];

      React.Children.map(this.props.children, (child) => {
         options.series.push({...child.props});
      })
   }

   drawChart() {

    if(!this.refs || !this.refs.chart) {
      return;
    }

    const node = this.refs.chart;
    const options = this.filterMap([
       'backgroundColor',
       'animation',
       'calculable',
       'renderAsImage',
       'timeline',
       'title',
       'toolbox',
       'tooltip',
       'legend',
       'dataRange',
       'dataZoom',
       'roamController',
       'grid',
       'color',
       'xAxis',
       'yAxis',
       'series',
    ], this.props);
    this.getChartData(options);
    this.chart = echarts.init(node);
    this.chart.setOption(options, this.props.theme);

   }

   filterMap(filterArray, props) {
      const options = {};
      filterArray.map((key) => {
         const option = props[key];
         if (option !== undefined) {
            options[key] = option;
         }
      });
      return options;
   }

   renderChildren() {
     return React.Children.map(this.props.children, (child) => {
       return cloneElement(child, {
         hasChart: true
       });
     });
   }

   render() {
    const { className, width, height, style } = this.props;
    return (
      <div
        ref="chart"
        className = { className }
        style={{
          height,
          width,
          ...style,
        }}>
        {this.renderChildren()}
      </div>
    );
  }


}






































//
