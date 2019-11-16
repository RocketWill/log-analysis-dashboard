import { Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';


@connect(({ logAnalysis, loading }) => ({
  logAnalysis,
  loading: loading.global,
}))
class Scatterplot extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'logAnalysis/fetchScatterplotData',
    });
  }

  getChartOptions = ({report1, report2, report3}, themeColor) => (
    {
      color: themeColor,
      legend: {
        y: "top",
        data: ["app crash", "service error", "defender"],
        textStyle: {
          color: "#b7b7b7",
          fontSize: 16
        }
      },
      tooltip: {
        show: true,
        formatter: function(param) {
          let eventList = param.seriesName+" 異常事件：\n";
          for(let evt=0; evt<param.value[2].length; evt+=1){
            eventList += param.value[2][evt] + '\n'
          }
          return eventList;
        },
        extraCssText:'pading:30px; white-space:pre-wrap'
      },
      grid: {
        x: 30,
        x2: 40,
        y: "18%",
        y2: "18%"
      },
      xAxis: {
        type: "time",
        name: "时间",
        nameTextStyle: {
          color: "#fff",
          fontSize: 14
        },

        splitLine: {
          ineStyle: {
            color: ["#B7B7B7"]
          },
          show: false
        },
        nameTextStyle: {
          color: ["#B7B7B7"]
        },
        axisLine: {
          lineStyle: {
            color: "#d9d9d9"
          }
        }
      },
      yAxis: {
        type: "value",
        name: "count",
        nameLocation: "end",
        nameGap: 20,
        splitLine: {
          lineStyle: {
            // 使用深浅的间隔色
            color: ["#8c8c8c"],
            opacity: 0.5
          }
        },
        nameTextStyle: {
          color: ["#d9d9d9"],
          fontSize: 14
        },
        axisLine: {
          lineStyle: {
            color: "#d9d9d9"
          }
        }
      },
      dataZoom: [
        {
          type: "slider",
          textStyle: { color: "#d9d9d9" },
          backgroundColor: "#595959",
          borderColor: "rgba(255,255,255,0.2)",
          fillerColor: "rgba(255,255,255,0.2)",
          start: 0
        }
      ],
      series: [
        {
          name: "app crash",
          type: "scatter",
          itemStyle: {
            normal: {
              opacity: 0.8,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          data: report1
        },
        {
          name: "service error",
          type: "scatter",
          itemStyle: {
            normal: {
              opacity: 0.8,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          data: report2
        },
        {
          name: "defender",
          type: "scatter",
          itemStyle: {
            normal: {
              opacity: 0.8,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          data: report3
        }
      ]
    }
  );

  render() {
    const {loading} = this.props;
    const themeColor = ['#4E6FFA', '#8762FF', '#FF5C79', '#FF7E53'];
    const {scatterplotData} = this.props.logAnalysis;
    return (
      <Card title="Scatterplot" loading={loading}>
        {scatterplotData && (
          <ReactEcharts
            option={this.getChartOptions(scatterplotData, themeColor)}
            notMerge={true}
            style={{height: '600px', width: '100%'}}
            lazyUpdate={true}
          />
        )}
      </Card>
    );
  }
}

export default Scatterplot;
