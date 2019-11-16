import { DatePicker } from 'antd';
import React, { Component, Suspense } from 'react';
import { connect } from 'dva';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

@connect(({ logAnalysis, loading }) => ({
  logAnalysis,
  loading: loading.global,
}))
class Filters extends Component {
  onDateRangeChange = (date, dateString) => {
    const dateRange = {};
    const { dispatch } = this.props;
    
    dateRange['startTime'] = dateString[0];
    dateRange['endTime'] = dateString[0];

    dispatch({
      type: 'logAnalysis/setOptions',
      payload: dateRange
    });
  };

  render() {
    return <RangePicker onChange={this.onDateRangeChange} />;
  }
}

export default Filters;
