import { Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';


@connect(({ logAnalysis, loading }) => ({
  logAnalysis,
  loading: loading.global,
}))
class ErrorLogs extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'logAnalysis/fetchScatterplotData',
    });
  }

  

  render() {
    const {scatterplotData} = this.props.logAnalysis;
    return (
      <Card title="Scatterplot">
        <h1>Hello</h1>
      </Card>
    );
  }
}

export default ErrorLogs;
