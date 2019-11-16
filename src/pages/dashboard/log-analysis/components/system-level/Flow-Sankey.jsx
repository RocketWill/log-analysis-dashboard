import { Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';

@connect(({ logAnalysis, loading }) => ({
  logAnalysis,
  loading: loading.global,
}))
class FlowSankey extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'logAnalysis/fetchSankeyData',
    });
  }

  getChartOptions = ({ totalDataNumber, totalNodeNumber, flowData }, themeColor) => ({
    color: themeColor,
    // title: {
    //   text: 'Sankey Diagram',
    //   textStyle: {
    //     fontWeight: 'bold', //标题颜色
    //     color: '#B7B7B7',
    //   },
    // },
    tooltip: {
      trigger: 'item',
      enterable: true,
      triggerOn: 'mousemove',
      formatter: function(params, ticket, callback) {
        if (params['dataType'] == 'edge') {
          return (
            params['data']['source'] +
            ' 到 ' +
            params['data']['target'] +
            ' | 总量: ' +
            params['data']['value'] +
            ' | 占比: ' +
            Math.round(
              ((parseInt(params['data']['value']) / parseInt(totalDataNumber)) * 100) / 2,
            ).toString() +
            '%'
          );
        } else {
          if (totalNodeNumber[params['data']['name']] != null) {
            return (
              params['data']['name'] +
              '总数: ' +
              totalNodeNumber[params['data']['name']] +
              ' | 占比: ' +
              Math.round(((totalNodeNumber[params['data']['name']] / totalDataNumber) * 100) / 2) +
              '%'
            );
          } else {
            return '还没做好ＸＤ';
          }
        }
      },
    },

    series: [
      {
        type: 'sankey',
        data: flowData['nodes'],
        links: flowData['links'],
        right: '10%',
        focusNodeAdjacency: true,
        layoutIterations: 50,
        nodeWidth: 30, //图中每个矩形节点的宽度。
        // nodeGap: 10, //图中每一列任意两个矩形节点之间的间隔。
        // silent:true, //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
        animationEasing: 'sinusoidalOut',
        itemStyle: {
          normal: {
            borderWidth: 0,
            borderColor: '#aaa',
          },
        },
        lineStyle: {
          normal: {
            curveness: 0.5,
            color: 'source',
            opacity: 0.5,
          },
        },
        label: {
          color: '#ffffff',
          fontWeight: 200,
          padding: 13,
        },
      },
    ],
  });

  render() {
    const {sankeyData} = this.props.logAnalysis;
    const themeColor = ['#4E6FFA', '#8762FF', '#FF5C79', '#FF7E53'];
    return (
      <Card title="Flow Sankey">
        {sankeyData['flowData'] && (
          <ReactEcharts
            option={this.getChartOptions(sankeyData, themeColor)}
            notMerge={true}
            style={{height: '600px', width: '100%'}}
            lazyUpdate={true}
          />
        )}
      </Card>
    );
  }
}

export default FlowSankey;
  