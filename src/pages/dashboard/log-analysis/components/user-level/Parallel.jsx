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
      type: 'logAnalysis/fetchRadarData',
    });
  }

  render() {
    const themeColor = ['#4E6FFA', '#8762FF', '#FF5C79', '#FF7E53'];
    return (
      <Card title="Parallel">
        <h1>Hello</h1>
      </Card>
    );
  }
}

export default Parallel;
