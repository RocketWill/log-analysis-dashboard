import { Card } from 'antd';
import React, { Component, Suspense } from 'react';
import { connect } from 'dva';

@connect(({ logAnalysis, loading }) => ({
  logAnalysis,
  loading: loading.global,
}))
class Scatterplot extends Component {
  render() {
    return (
      <Card title="Default size card" extra={<a href="#">More</a>}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    );
  }
}

export default Scatterplot;
