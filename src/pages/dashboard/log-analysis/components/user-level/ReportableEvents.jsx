import { Card, Typography } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
const { Paragraph } = Typography;

@connect(({ logAnalysis, loading }) => ({
  logAnalysis,
  loading: loading.global,
}))
class ReportableEvents extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'logAnalysis/fetchReportableEventsData',
    });
  }

  listEvents = (reportableEventsData) => (
    <div>
      {reportableEventsData && reportableEventsData.map((events, idx) => {
        if(events[1] === 1) {
          return <Paragraph key={idx} type="danger">{events[0]}</Paragraph>
        }
        else {
          return <Paragraph key={idx} type="secondary">{events[0]}</Paragraph>
        }
      })}
    </div>
  )

  render() {
    const {loading} = this.props;
    const {reportableEventsData} = this.props.logAnalysis;
    return (
      <Card title="Reportable Events" style={{height: '507px'}} loading={loading}>
        {this.listEvents(reportableEventsData)}
      </Card>
    );
  }
}

export default ReportableEvents;
