import { Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';

@connect(({ logAnalysis, loading }) => ({
  logAnalysis,
  loading: loading.global,
}))
class Parallel extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'logAnalysis/fetchParallelData',
    });
  }

  getChartOptions = ({ category, data }, themeColor) => ({
    color: [themeColor[2], themeColor[3]],
    parallelAxis: [
      {
        dim: 0,
        name: '使用者',
        type: 'category',
        data: category,
      },
      { dim: 1, name: '登录', inverse: true, nameLocation: 'start' },
      { dim: 2, name: '进程' },
      { dim: 3, name: '文件' },
      { dim: 4, name: '注册表' },
      { dim: 5, name: '网络' },
    ],
    parallel: {
      left: '5%',
      right: '10%',
      bottom: 20,
      parallelAxisDefault: {
        type: 'value',
        name: 'AQI指数',
        nameLocation: 'end',
        nameGap: 20,
        nameTextStyle: {
          color: ['#B7B7B7'],
        },
        axisLine: {
          lineStyle: {
            color: '#8c8c8c',
          },
        },
        axisTick: {
          lineStyle: {
            color: '#8c8c8c',
          },
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#8c8c8c',
          },
        },
        triggerEvent: true,
      },
    },

    series: [
      {
        name: '',
        type: 'parallel',
        lineStyle: {
          normal: {
            width: 2,
            opacity: 0.9,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: themeColor[2] },
              { offset: 1, color: themeColor[3] },
            ]),
          },
        },
        data: data,
      },
    ],
  });

  onChartClick = e => {
    const { dispatch } = this.props;
    if (e.targetType === "axisLabel" && e.parallelAxisIndex === 0) {
      const user = e.value;
      dispatch({
        type: 'logAnalysis/setOptions',
        payload: { currentUser: user },
      });
    }
  };

  getDisplayData = (parallelData, currentUser) => {
    if (!parallelData) return;
    const category = [];
    let data = parallelData;
    parallelData.map(item => category.push(item[0]));

    if (currentUser) {
      data = parallelData.filter(item => item[0] === currentUser);
    }

    return { category, data };
  };

  render() {
    const {loading} = this.props;
    const themeColor = ['#4E6FFA', '#8762FF', '#FF5C79', '#FF7E53'];
    const { parallelData } = this.props.logAnalysis;
    const { currentUser } = this.props.logAnalysis.params;
    const displayData = this.getDisplayData(parallelData, currentUser);
    let onEvents = {
      click: this.onChartClick, // 設定點擊事件：切換欲顯示用戶數據
    };
    return (
      <Card title="Parallel" loading={loading}>
        {displayData && (
          <ReactEcharts
            option={this.getChartOptions(displayData, themeColor)}
            notMerge={true}
            style={{ height: '400px', width: '100%' }}
            lazyUpdate={true}
            onEvents={onEvents}
          />
        )}
      </Card>
    );
  }
}

export default Parallel;
