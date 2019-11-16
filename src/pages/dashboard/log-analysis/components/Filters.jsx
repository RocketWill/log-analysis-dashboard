import { DatePicker } from 'antd';
import React, { Component, Suspense } from 'react';
import { connect } from 'dva';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


@connect(({ logAnalysis, loading }) => ({
    logAnalysis,
  loading: loading.global,
}))
class Filters extends Component {

    onChange = (e) => {
        console.log(e);
    }
  

  render() {

    return (
        <RangePicker onChange={this.onChange} />
    );
  }
}

export default Filters;
