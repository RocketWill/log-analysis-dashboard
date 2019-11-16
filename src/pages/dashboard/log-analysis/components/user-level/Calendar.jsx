import { Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';

@connect(({ logAnalysis, loading }) => ({
  logAnalysis,
  loading: loading.global,
}))
class Calendar extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'logAnalysis/fetchCalendarData',
    });
  }

  onChartClick = e => {
    // example data: ["2017-11-12T04:00:00.000Z", "user3", 1]
    const user = e.data[1];
    const { dispatch } = this.props;

    dispatch({
      type: 'logAnalysis/setOptions',
      payload: {currentUser: user},
    });
  };

  getChartOptions = (calendarData, themeColor) => ({
    grid: {
      x: 40, //默认是80px
      y: 20, //默认是60px
      // x2: 20, //默认80px
      // y2: 30 //默认60px
    },
    xAxis: {
      type: 'category',
      splitArea: {
        show: true,
      },
      nameTextStyle: {
        color: ['#ffffff'],
      },
      axisLine: {
        lineStyle: {
          color: '#d9d9d9',
        },
      },
      itemStyle: {
        normal: {
          color: '#d9d9d9',
          borderWidth: 1,
          borderColor: '#111',
        },
        //backgroundColor:"rgba(12,34,56,0.9)"
      },
    },
    yAxis: {
      type: 'category',
      splitArea: {
        show: true,
        areaStyle: {
          color: ['#262626', '#595959'],
        },
      },
      nameTextStyle: {
        color: ['#ffffff'],
      },
      axisLine: {
        lineStyle: {
          color: '#d9d9d9',
        },
      },
    },
    dataZoom: [
      {
        type: 'slider',
        textStyle: { color: '#d9d9d9' },
        backgroundColor: '#595959',
        borderColor: 'rgba(255,255,255,0.2)',
        fillerColor: 'rgba(255,255,255,0.2)',
        start: 0,
      },
    ],

    series: [
      //根據事件數量設置不同點點大小
      {
        name: '登录事件',
        type: 'scatter',
        // coordinateSystem: 'calendar',
        data: calendarData,
        symbolSize: function(val) {
          return 20 / val[2];
        },
        itemStyle: {
          normal: {
            color: themeColor[2], //普通點點顏色
          },
        },
      },
      {
        name: '稀少事件',
        color: '#B7B7B7',
        type: 'effectScatter',
        // coordinateSystem: 'calendar',
        data: calendarData.filter(e => e[2] <= 2),
        symbolSize: function(val) {
          return 20 / val[2];
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
        },
        hoverAnimation: true,
        itemStyle: {
          normal: {
            color: themeColor[3],
            shadowBlur: 10,
            shadowColor: '#453893',
          },
        },
        zlevel: 1,
      },
    ],
  });

  render() {
    const { calendarData } = this.props.logAnalysis;
    const themeColor = ['#4E6FFA', '#8762FF', '#FF5C79', '#FF7E53'];
    let onEvents = {
      click: this.onChartClick, // 設定點擊事件：切換欲顯示用戶數據
    };
    return (
      <Card title="Calendar">
        {calendarData && (
          <ReactEcharts
            option={this.getChartOptions(calendarData, themeColor)}
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

export default Calendar;
