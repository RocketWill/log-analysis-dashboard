import { Col, Dropdown, Icon, Menu, Row } from 'antd';
import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { getTimeDistance } from './utils/utils';
import styles from './style.less';
import Filters from './components/Filters';
import FlowSankey from './components/system-level/Flow-Sankey';
import Scatterplot from './components/system-level/Scatterplot';
import Calendar from './components/user-level/Calendar';
import ReportableEvents from './components/user-level/ReportableEvents';
import Radar from './components/user-level/Radar';
import Behavior2vec from './components/user-level/Behavior2vec';
import Parallel from './components/user-level/Parallel';


@connect(({ logAnalysis, loading }) => ({
  logAnalysis,
  loading: loading.effects['logAnalysis/fetch'],
}))
class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  reqRef = 0;

  timeoutId = 0;

  componentDidMount() {
    
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'logAnalysis/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }


  render() {
    const { logAnalysis, loading } = this.props;

    return (
      <GridContent>
        <React.Fragment>
          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 12,
            }}
          >
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <Filters />
              </Suspense>
            </Col>
          </Row>

          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24,
            }}
          >
            <Col span={14}>
              <Suspense fallback={null}>
                <FlowSankey />
              </Suspense>
            </Col>
            <Col span={10}>
              <Suspense fallback={null}>
                <Scatterplot />
              </Suspense>
            </Col>
          </Row>

          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24,
            }}
          >
            <Col span={10}>
              <Suspense fallback={null}>
                <Calendar />
              </Suspense>
            </Col>
            <Col span={6}>
              <Suspense fallback={null}>
                <ReportableEvents />
              </Suspense>
            </Col>
            <Col span={8}>
              <Suspense fallback={null}>
                <Radar />
              </Suspense>
            </Col>
          </Row>
          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24,
            }}
          >
            <Col span={24}>
              <Suspense fallback={null}>
                <Behavior2vec />
              </Suspense>
            </Col>
          </Row>
          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24,
            }}
          >
            <Col span={24}>
              <Suspense fallback={null}>
                <Parallel />
              </Suspense>
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Analysis;
