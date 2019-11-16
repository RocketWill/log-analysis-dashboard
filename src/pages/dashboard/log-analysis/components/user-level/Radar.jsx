import { Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';

@connect(({ logAnalysis, loading }) => ({
  logAnalysis,
  loading: loading.global,
}))
class Radar extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'logAnalysis/fetchRadarData',
    });
  }

  getChartOptions = (radarData, themeColor) => (
    {
        radar: {
            indicator: [
                { name: '登录', max: 1 },
                { name: '文件', max: 1 },
                { name: '网络', max: 1 },
                { name: '注册表', max: 1 },
                { name: '进程', max: 1 },
                { name: 'Other', max: 1 }
            ],
            shape: 'circle',
            splitNumber: 5,
            name: {
                textStyle: {
                    color: '#B7B7B7'
                }
            },
            splitLine: {
                lineStyle: {
                    color: ['#8c8c8c', '#8c8c8c','#595959','#595959','#595959','#595959'], //圓圈顏色(由淺到深)
                    opacity:0.8
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#595959'//放射線顏色
                }
            }
        },
        series: [
            {
                name: '',
                type: 'radar',
                lineStyle: {
                    normal: {
                        width: 1,
                        opacity: 0.5
                    }
                },
                data: radarData,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.RadialGradient(
                            0, 1, 1.7, [{
                            offset: 0.4,
                            color: themeColor[2]
                        }, {
                            offset: 1,
                            color: themeColor[3]
                        }], false),
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.4
                    }
                }
            }
        ]
    }
  )

  getDisplayData = (radarData, currentUser) => {
    if(!radarData) return;
    if(!currentUser){
        return radarData.radarDataAll;
    }
    else {
        return [radarData.radarDataWithUser[currentUser]];
    }
  }

  render() {
    const themeColor = ['#4E6FFA', '#8762FF', '#FF5C79', '#FF7E53'];
    const {radarData} = this.props.logAnalysis;
    const {currentUser} = this.props.logAnalysis.params;
    const displayData = this.getDisplayData(radarData, currentUser);
    return (
      <Card title="Radar">
        {radarData && (
          <ReactEcharts
            option={this.getChartOptions(displayData, themeColor)}
            notMerge={true}
            style={{ height: '400px', width: '100%' }}
            lazyUpdate={true}
          />
        )}
      </Card>
    );
  }
}

export default Radar;
