import { Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';

// 此張圖表會需要用到 echarts-gl，需要額外安裝
import 'echarts-gl/dist/echarts-gl';

@connect(({ logAnalysis, loading }) => ({
  logAnalysis,
  loading: loading.global,
}))
class Behavior2vec extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'logAnalysis/fetchBehavior2vecData',
    });
  }

  getChartOptions = ({processes, words}, themeColor) => {
    let option = {
      color: themeColor,
      tooltip: {
        formatter: d => {
          return Object.keys(words)[d.dataIndex];
        },
      },
      legend: {
        data: ['文件'],
        textStyle: {
          fontWeight: 'bold', //标题颜色
          color: '#B7B7B7',
        },
      },
      xAxis3D: {
        type: 'value',
        show: false,
        splitLine: {
          lineStyle: {
            // 使用深浅的间隔色
            color: ['rgba(0,0,0,0)'],
          },
        },
        nameTextStyle: {
          color: ['rgba(0,0,0,0)'],
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(0,0,0,0)',
          },
        },
      },
      yAxis3D: {
        type: 'value',
        show: false,
        splitLine: {
          lineStyle: {
            // 使用深浅的间隔色
            color: ['rgba(0,0,0,0)'],
          },
        },
        nameTextStyle: {
          color: ['rgba(0,0,0,0)'],
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(0,0,0,0)',
          },
        },
      },
      zAxis3D: {
        type: 'value',
        show: false,
        splitLine: {
          lineStyle: {
            // 使用深浅的间隔色
            color: ['rgba(0,0,0,0)'],
          },
        },
        nameTextStyle: {
          color: ['rgba(0,0,0,0)'],
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(0,0,0,0)',
          },
        },
      },
      grid3D: {
        axisLine: {
          lineStyle: {
            color: '#8c8c8c',
          },
        },
        axisPointer: {
          lineStyle: {
            color: '#8c8c8c',
          },
        },
        viewControl: {
          autoRotate: true,
          //projection: 'orthographic'
        },
      },
      series: [
        {
          name: '文件',
          textStyle: {
            fontWeight: 'bold', //标题颜色
            color: '#B7B7B7',
          },
          type: 'scatter3D',
          data: Object.values(words),
          lineStyle: {
            width: 4,
          },
          symbolSize: 5,
          itemStyle: {
            borderWidth: 0,
            borderColor: '#ffffff',
            color: themeColor[3],
            opacity: 0.8,
          },
          emphasis: {
            itemStyle: {
              color: themeColor[1],
            },
          },
        },
      ],
    };

    let line;
    // deal process data
    processes.filter((e, i) => i < 5).forEach(process => {
        line = {
            type: 'line3D',
            data: process['events'].filter(e => words[e]).map(e => words[e]),
            lineStyle: {
                width: 4
            }
        };
        option.series.push(line);
    })

    return option;
  };

  render() {
    const {loading} = this.props;
    const themeColor = ['#4E6FFA', '#8762FF', '#FF5C79', '#FF7E53'];
    const {behavior2vecData} = this.props.logAnalysis;
    return (
      <Card title="Behavior2vec" loading={loading}>
        {behavior2vecData && behavior2vecData['words'] && (
          <ReactEcharts
            option={this.getChartOptions(behavior2vecData, themeColor)}
            notMerge={true}
            style={{ height: '400px', width: '100%' }}
            lazyUpdate={true}
          />
        )}
      </Card>
    );
  }
}

export default Behavior2vec;
